<template>
	<Modal
            v-model="modal"
            title="Title"
            :loading="loading"
            @on-ok="asyncOK"
            @on-cancel="cancel">
            <Form>
                <FormItem label="未通过原因">
                    <Input v-model="reason" placeholder="未通过原因"></Input>
                </FormItem>
            </Form>
            <div v-html="noPassMsg"></div>
        </Modal>
</template>
<script>
import util from '@/libs/util';
	export default {
		props: ['data', 'noPassModal'],
		data () {
			return {
				loading: false,
				reason: '',
				noPassMsg: '',
				modal: this.noPassModal
			}
		},
		methods: {
			asyncOK () {
				this.$emit('okNoPass', this.noPassMsg);
			},
			cancel () {
				this.$emit('closeModal', this.modal);
			}
		},
		watch: {
			noPassModal (val) {
				this.modal = this.noPassModal;
			},
			reason () {
				this.noPassMsg = `亲爱的${this.data.user.name}, 您于${util.formatDate(this.data.goods_time)}发布的商品(${this.data.goods_name})未能通过审核,请修改后等待我们的下一次审核。<br>原因：${this.reason}<br>审核人:${this.admin_name}`;
			},
			data: {
				handler(val, oldVal){
	                this.noPassMsg = `亲爱的${val.user.name}, 您于${util.formatDate(val.goods_time)}发布的商品(${val.goods_name})未能通过审核,请修改后等待我们的下一次审核。<br>原因：${this.reason}<br>审核人: ${this.admin_name}`;
	            },
	            deep:true
            }
		},
		computed: {
	        admin_name () {
	            return this.$store.state.user.info.user_name;
	        }
	    }
	}
</script>