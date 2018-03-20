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
				        	<Input v-model="searchData" placeholder="请输入昵称或手机或邮箱搜搜..." style="width: 200px" />
	                        <span @click="handleSearch" style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
	                        <Button @click="handleCancel" type="ghost" >取消</Button>
				        </Col>
				        <Col span="12">
				        	<Button type="primary" icon="ios-loop-strong" :loading="loading" @click="getUser" class="fr">刷  新</Button>
				        </Col>
				    </Row>
                    <Row style="margin: 40px 0;">
                        <Table :loading="loading" :columns="userColumns" :data="data" ref="tableExcel"></Table>
                    </Row>
                    <Row span="24">
				        <Col span="12">
					        <Input v-model="tableName" placeholder="请输入文件名" style="width: 200px" />
					        <span class="margin-left-10 margin-top-20">
                                <a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a>
                                <Button type="primary" icon="ios-download-outline" @click="exportExcel">导出表格</Button>
                            </span>
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
import table2excel from '@/libs/table2excel.js';
import {userColumns} from './data/columns_data.js';
export default {
    data () {
        return {
        	title: '用户列表',
        	loading: false,
            data: [],
            userColumns: userColumns,
            initTable: [],
            total: 0,
            searchData: '',
            tableName: '',
            page: 1,
            num: 2
        };
    },
    methods: {
        init () {
            this.getUser();
        },
        getUser () {
            this.loading = true;
        	this.$fetch.user.get({
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
        changePage (page) {
        	this.page = page;
        },
        changePageNum (num) {
        	this.num = num;
        },
        handleSearch () {
            this.initTable = this.data;
            this.getUser();
        },
        handleCancel () {
            this.data = this.initTable;
        },
        exportExcel () {
        	if (this.tableName) {
        		console.log(this.$refs.tableExcel)
        		table2excel.transform(this.$refs.tableExcel, 'hrefToExportTable', this.tableName);
        	} else {
        		this.$Message.warning('文件名不能为空');
        	}
        }
    },
    mounted () {
        this.init();
    },
    watch: {
    	page () {
    		this.getUser();
    	},
    	num () {
    		this.getUser();
    	}
    }
};
</script>
