<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div>
        <Row class="margin-top-10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="ios-keypad"></Icon>
                         商品分类
                    </p>
                    <p slot="extra">
                        <Button type="info" icon="android-add-circle" @click="addClassifyModel = true">添加分类</Button>
                    </p>
                    <Row :gutter="10">
                        <Col span="24">
                                <can-edit-table 
                                    refs="table" 
                                    v-model="data" 
                                    @on-cell-change="handleCellChange" 
                                    @on-change="handleChange"  
                                    :editIncell="true" 
                                    :columns-list="gclassifyColumns"
                                ></can-edit-table>
                        </Col>
                        <Modal :width="900" v-model="showCurrentTableData">
                            <can-edit-table refs="table5" v-model="data" :columns-list="showCurrentColumns"></can-edit-table>
                        </Modal>
                    </Row>
                </Card>
            </Col>
        </Row>
        <Modal v-model="addClassifyModel" title="添加分类" width="360">
            <Input v-model="name" placeholder="请输入分类名称"></Input>
            <div slot="footer">
                <Button type="info" size="large" long :loading="modal_loading" @click="addClassify">添加</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import {gclassifyColumns} from './data/columns_data.js';
export default {
    name: 'editable-table',
    components: {
        canEditTable
    },
    data () {
        return {
            tableData: [],
            editInlineColumns: [],
            editInlineData: [],
            editIncellColumns: [],
            editIncellData: [],
            gclassifyColumns: gclassifyColumns,
            data: [],
            showCurrentColumns: [],
            showCurrentTableData: false,
            addClassifyModel: false,
            modal_loading: false,
            name: ''
        };
    },
    methods: {
        getData () {
            this.$fetch.classify.get({
            	type: 'gclassify'
            }).then(res => {
            	if (res.code === 200) {
            		this.data = res.data;
            	} else {
            		this.$Message.error(res.msg);
            	}
            })
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        handleCellChange (val, index, key) {
        	this.$Message.success('修改了第 ' + (index + 1) + ' 行列名为 ' + key + ' 的数据');
        },
        handleChange (val, index) {
        	this.$Message.success('修改了第' + (index + 1) + '行数据');
        },
        addClassify () {
            this.modal_loading = true;
            this.$fetch.classify.add({
                type: 'gclassify',
                name: this.name
            }).then(res => {
                this.modal_loading = false;
                this.addClassifyModel = false;
                if (res.code === 200) {
                    this.name = '';
                    this.getData();
                } else {
                    this.$Message.error(res.msg);
                }
            })
        }
    },
    created () {
        this.getData();
    }
};
</script>
