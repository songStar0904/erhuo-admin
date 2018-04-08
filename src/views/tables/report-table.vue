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
				        	<Input v-model="searchData" placeholder="请输入二货名称搜搜..." style="width: 200px" />
	                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
	                        <Button @click="handleCancel" type="ghost" >取消</Button>
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
					        <Page :total="total" @on-change="changePage" :show-total="true" :page-size="num" @on-page-size-change="changePageNum" :page-size-opts="[1, 2, 20, 50]" size="small" show-elevator show-sizer class-name="fr"></Page>
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
const switchButton = function (vm, h, data, index) {
    return h('div', [
        h('i-switch', {
            props: {
                value: data[index].goods_spread,
                'true-value': 1,
                'false-value': 0
            },
            on: {
                'on-change': (value) => {
                    vm.spreadGoods(data[index].goods_id, value, index);
                }
            }
        }),
    ]);
}
const expand = function (vm, h, expandRow, data) {
    return h(expandRow, {
        props: {
            row: data
        }
    })
}
const radio = function (vm, h, data, index) {
    return h('radio-group', {
                props: {
                        value: data[index].goods_status,
                        size: 'small'
                    },
                    on: {
                        'on-change': (value) => {
                            vm.passGoods(data[index].goods_id, value, index);
                        }
                    }
            }, [
                h('radio', {
                    props: {
                        label: 1
                    }
                }, '不通过'),
                h('radio', {
                    props: {
                        label: 2
                    }
                }, '通过'),
                h('radio', {
                    props: {
                        label: 3
                    }
                }, '下架'),
            ]);
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
            searchData: '',
            tableName: '',
            page: 1,
            num: 5,
            type: 0
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
                            if (item === 'switch') {
                                children.push(switchButton(this, h, this.data, param.index));
                            } else if (item === 'expand') {
                                children.push(expand(this, h, reportExpand, this.data[param.index]));
                            } else if (item === 'radio') {
                                children.push(radio(this, h, this.data, param.index))
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
        	})
        	.then(res => {
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
    	}
    }
};
</script>
