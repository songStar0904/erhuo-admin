<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="android-people"></Icon>
                        {{title}}
                    </p>
                    <Row>
				        <Col span="12">
				        	<RadioGroup v-model="type" type="button">
						        <Radio :label="0">全部</Radio>
						        <Radio :label="1">二货</Radio>
						        <Radio :label="2">评论</Radio>
						        <Radio :label="3">动态</Radio>
						    </RadioGroup>
				        </Col>
				        <Col span="12">
				        	<Button type="primary" icon="ios-loop-strong" :loading="loading" @click="getReport" class="fr">刷  新</Button>
				        </Col>
				    </Row>
                    <Row style="margin: 40px 0;">
                        <Table :loading="loading" :columns="reportColumns" :data="data" ref="tableExcel"></Table>
                    </Row>
                    <Row span="24">
				        <Col span="12">
                        logo
					    </Col>
				        <Col span="12">
					        <Page :total="total" @on-change="changePage" :show-total="true" :page-size="num" @on-page-size-change="changePageNum" size="small" show-elevator show-sizer class-name="fr"></Page>
					    </Col>
				    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import util from '@/libs/util';
import {reportColumns} from './data/columns_data.js';
import reportExpand from './components/report-expand.vue';
const ignoreButton = function (vm, h, data, index) {
    return h('i-button', {
            props: {
                type: 'primary',
                size: 'small'
            },
            style: {
            	marginRight: '5px'
            },
            on: {
                click: () => {
                    vm.delReport(data[index].report_id, index);
                }
            }
        }, '忽 略');
}
const delButton = function (vm, h, data, index) {
    return h('i-button', {
            props: {
                type: 'error',
                size: 'small'
            },
            on: {
                click: () => {
                    vm.openModal(data[index].report_gid, data[index].report_type);
                }
            }
        }, '删 除');
}
const expand = function (vm, h, expandRow, data) {
    return h(expandRow, {
        props: {
            row: data
        }
    })
}
export default {
    data () {
        return {
        	title: '举报列表',
        	loading: false,
            data: [],
            nowData: {},
            index: null, // 当前第index个
            noPassModal: false,
            reportColumns: reportColumns,
            initTable: [],
            total: 0,
            type: 0,
            tableName: '',
            page: 1,
            num: 10
        };
    },
    methods: {
        init () {
        	this.getColumns();
            this.getReport();
        },
        getColumns () {
        	this.reportColumns.forEach(item => {
        		if (item.handle) {
        			item.render = (h, param) => {
                        let children = [];
                        item.handle.forEach(item => {
                            if (item === 'ignore') {
                                children.push(ignoreButton(this, h, this.data, param.index));
                            } else if (item === 'expand') {
                                children.push(expand(this, h, reportExpand, this.data[param.index]));
                            } else if (item === 'del') {
                                children.push(delButton(this, h, this.data, param.index))
                            }
                        });
                        return h('div', children);
                    };
        		}
        	});
        },
        getReport () {
            this.loading = true;
        	this.$fetch.report.get({
        		page: this.page,
        		num: this.num,
        		type: this.type
        	}).then(res => {
        		this.loading = false;
        		if (res.code === 200) {
        			this.data = res.data;
        			this.total = res.total;
        		} else {
        			this.data = [];
        			this.$Message.error(res.msg);
        		}
        	})
        },
        delReport (rid, index) {
        	this.loading = true;
        	this.$fetch.report.del({
        		report_id: rid
        	}).then(res => {
        		this.loading = false;
        		if (res.code === 200) {
        			this.getReport();
        			this.$Message.success(res.msg);
        		} else {
        			this.$Message.error(res.msg);
        		}
        	})
        },
        openModal (gid, type) {
        	this.$Modal.confirm({
                title: '注意',
                content: '您确定删除这个被举报的内容吗？',
                cancelText: '我手滑了',
                onOk: () => {
                    this.delItem(gid, type);
                },
            });
        },
        delItem (gid, type) {
        	this.loading = true;
        	this.$fetch.report.delItem({
        		gid,
        		type
        	}).then(res => {
        		this.loading = false;
        		if (res.code === 200) {
        			this.getReport();
        			this.$Message.success(res.msg);
        		} else {
        			this.$Message.error(res.msg);
        		}
        	})
        },
        changePage (page) {
        	this.page = page;
        },
        changePageNum (num) {
        	this.num = num;
        },
        handleSearch () {
            this.initTable = this.data;
            this.getReport();
        },
        handleCancel () {
            this.data = this.initTable;
        }
    },
    created () {
        this.init();
    },
    watch: {
    	page () {
    		this.getReport();
    	},
    	num () {
    		this.getReport();
    	},
    	type () {
    		this.getReport();
    	}
    }
};
</script>
