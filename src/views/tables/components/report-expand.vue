<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
    img{
        width: 60px;
        height: 60px;
        margin-right: 10px;
    }
</style>
<template>
	<div>
	    <div v-if="row.report_type === 1">
	    	<Row class="expand-row">
	           <Col span="8">
	                <span class="expand-key">二货名称:</span>
	                <span class="expand-value">{{item.goods_name}}</span>
	            </Col>
	            <Col span="8">
	                <span class="expand-key">二货分类: </span>
	                <span class="expand-value">{{ item.gclassify.name }}</span>
	            </Col>
	            <Col span="8">
	                <span class="expand-key">发布人: </span>
	                <span class="expand-value">
	                	<Avatar :src="item.user.icon" /> {{ item.user.name }} 
	                </span>
	            </Col>
	        </Row>
	        <Row class="expand-row">
	            <Col span="8">
	                <p class="expand-key">二货图片:</p>
	                <span class="expand-value">
	                    <img :src="item.url" alt="" v-for="item in item.goods_icon">
	                </span>
	            </Col>
	            <Col span="8">
	                <p class="expand-key">详情: </p>
	                <span class="expand-value">{{ item.goods_summary }}</span>
	            </Col>
	            <Col span="8">
	                <p class="expand-key">交易地址: </p>
	                <span class="expand-value">{{ item.goods_address }}</span>
	            </Col>
	        </Row>
	        <Row>
	            <Col span="8">
	                <span class="expand-key">原价: </span>
	                <span class="expand-value">￥{{ item.goods_oprice }}</span>
	            </Col>
	            <Col span="8">
	                <span class="expand-key">现价: </span>
	                <span class="expand-value">￥{{ item.goods_nprice }}</span>
	            </Col>
	        </Row>
	        </Row>
	    </div>
	    <div v-else-if="row.report_type === 2">
	    	<Row class="expand-row">
	    		<Col span="8">
	                <span class="expand-key">发布人: </span>
	                <span class="expand-value">
	                	<Avatar :src="item.suser.icon" /> {{ item.suser.name }} 
	                </span>
	            </Col>
	            <Col span="8">
	                <span class="expand-key">评论内容:</span>
	                <span class="expand-value">{{item.lmsg_content}}</span>
	            </Col>
	        </Row>
	    </div>
	    <div v-else-if="row.report_type === 3">
	    	<Row class="expand-row">
	    		<Col span="8">
	                <span class="expand-key">发布人: </span>
	                <span class="expand-value">
	                	<Avatar :src="item.user.icon" /> {{ item.user.name }} 
	                </span>
	            </Col>
	            <Col span="8">
	                <span class="expand-key">评论内容:</span>
	                <span class="expand-value">{{item.dynamic_content}}</span>
	            </Col>
	        </Row>
	    </div>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        },
        computed: {
        	item () {
        		return this.row.item;
        	}
        }
    };
</script>