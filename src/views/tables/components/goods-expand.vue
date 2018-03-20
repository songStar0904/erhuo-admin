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
        <Row class="expand-row">
            <Col span="8">
                <p class="expand-key">二货图片:</p>
                <span class="expand-value">
                    <img :src="item.url" alt="" v-for="item in row.goods_icon">
                </span>
            </Col>
            <Col span="8">
                <p class="expand-key">交易地址: </p>
                <span class="expand-value">{{ row.goods_address }}</span>
            </Col>
            <Col span="8">
                <p class="expand-key">详情: </p>
                <span class="expand-value">{{ row.goods_summary }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">原价: </span>
                <span class="expand-value">￥{{ row.goods_oprice }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">现价: </span>
                <span class="expand-value">￥{{ row.goods_nprice }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>