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
    </div>
</template>

<script>
import {goodsColumns} from './data/columns_data.js';
import goodsExpand from './components/goods-expand.vue';
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
export default {
    data () {
        return {
        	title: '商品列表',
        	loading: false,
            data: [],
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
    }
};
</script>
