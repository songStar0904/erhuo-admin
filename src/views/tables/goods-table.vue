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
				        	<Button type="primary" icon="ios-loop-strong" :loading="loading" @click="getGoods" class="fr">刷  新</Button>
				        </Col>
				    </Row>
                    <Row style="margin: 40px 0;">
                        <Table :loading="loading" :columns="goodsColumns" :data="data" ref="tableExcel"></Table>
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
        <no-passmodal :data="nowData" :noPassModal="noPassModal" @closeModal="closeModal" @okNoPass="okNoPass"></no-passmodal>
    </div>
</template>

<script>
import util from '@/libs/util';
import {goodsColumns} from './data/columns_data.js';
import goodsExpand from './components/goods-expand.vue';
import noPassmodal from './components/noPassModal.vue';
const switchButton = function (vm, h, data, index) {
    return h('div', [
        h('i-switch', {
            props: {
                value: data[index].goods_status,
                'true-value': 1,
                'false-value': 0
            },
            on: {
                'on-change': (value) => {
                    vm.passGoods(data[index].goods_id, value, index);
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
    components: {
        noPassmodal
    },
    data () {
        return {
        	title: '商品列表',
            notice_title: ['未审核', '商品审核未通过通知', '商品审核通过通知', '商品已下架通知'],
        	loading: false,
            data: [],
            nowData: {},
            index: null, // 当前第index个
            noPassModal: false,
            goodsColumns: goodsColumns,
            initTable: [],
            total: 0,
            searchData: '',
            tableName: '',
            page: 1,
            num: 5
        };
    },
    methods: {
        init () {
        	this.getColumns();
            this.getGoods();
        },
        getColumns () {
        	this.goodsColumns.forEach(item => {
        		if (item.handle) {
        			item.render = (h, param) => {
                        let children = [];
                        item.handle.forEach(item => {
                            if (item === 'switch') {
                                children.push(switchButton(this, h, this.data, param.index));
                            } else if (item === 'expand') {
                                children.push(expand(this, h, goodsExpand, this.data[param.index]));
                            } else if (item === 'radio') {
                                children.push(radio(this, h, this.data, param.index))
                            }
                        });
                        return h('div', children);
                    };
        		}
        	});
        },
        getGoods () {
            this.loading = true;
        	this.$fetch.goods.get({
        		page: this.page,
        		num: this.num,
        		search: this.searchData
        	})
        	.then(res => {
        		if (res.code === 200) {
        			this.data = res.data;
        			this.total = res.total;
        			this.loading = false;
        		} else {
        			this.data = [];
        			this.$Message.error(res.msg);
        		}
        	})
        },
        passGoods (gid, status, index) {
            this.nowData = this.data[index];
            this.index = index;
            if (status === 1) {
                // 未通过
                this.noPassModal = true;
            } else if (status === 2) {
                // 通过
                this.okPass();
            } else if (status === 3) {
                // 下架
                this.okNoSell();
            }
        },
        okNoPass (msg) {
            this.sendNotice(msg, 1);
        },
        okPass () {
            let data = this.nowData;
            let msg = `亲爱的${data.user.name}, 您于${util.formatDate(data.goods_time)}发布的商品(${data.goods_name})已通过审核, 快去看一下吧~。<br>审核人:${this.admin_name}`;
            this.sendNotice(msg, 2);
        },
        okNoSell () {
            let data = this.nowData;
            let msg = `亲爱的${data.user.name}, 您于${util.formatDate(data.goods_time)}发布的商品(${data.goods_name})已下架。感谢您的发布。<br>审核人:${this.admin_name}`;
            this.sendNotice(msg, 3);
        },
        sendNotice (msg, status) {
            this.$fetch.notice.send({
                notice_lid: this.nowData.user.id,
                notice_title: this.notice_title[status],
                notice_content: msg
            }).then(res => {
                if (res.code === 200) {
                    this.changeStatus(this.nowData.goods_id, status, this.index);
                } else {
                    this.$Message.error(res.msg);
                }
            })
        },
        changeStatus (gid, status, index) {
        	this.$fetch.goods.pass_goods({
                goods_id: gid,
                goods_status: status
            }).then(res => {
                if (res.code === 200) {
                    this.data[index].goods_status = res.data;
                    this.$Message.info(res.msg)
                } else {
                    this.$Message.error(res.msg);
                }
            })
        },
        closeModal (val) {
            this.noPassModal = val;
        },
        changePage (page) {
        	this.page = page;
        },
        changePageNum (num) {
        	this.num = num;
        },
        handleSearch () {
            this.initTable = this.data;
            this.getgoods();
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
    		this.getGoods();
    	},
    	num () {
    		this.getGoods();
    	}
    },
    computed: {
        admin_name () {
            return this.$store.state.user.info.user_name;
        }
    }
};
</script>
