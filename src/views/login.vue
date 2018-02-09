<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="user_name">
                            <Input v-model="form.user_name" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="user_psd">
                            <Input type="password" v-model="form.user_psd" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">用户名是手机号码或者邮箱</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import md5 from 'js-md5';
export default {
    data () {
        return {
            form: {
                user_name: '15574406229',
                user_psd: ''
            },
            data: {},
            rules: {
                user_name: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                user_psd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.data = Object.assign({}, this.form);
                    this.data.user_psd = md5(this.data.user_psd);
                    this.$fetch.user.login(this.data)
                    .then(res => {
                        if (res.code === 200) {
                            let access = res.data.user_access;
                            if (access > 0) {
                                Cookies.set('user', res.data.user_name);
                                // Cookies.set('user_psd', this.data.user_psd);
                                this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                this.$store.commit('setUser', res.data);
                                Cookies.set('access', access);
                                this.$router.push({
                                    name: 'home_index'
                                });
                            } else {
                                this.$Message.warning('抱歉，您的权限不够!');
                            }
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                }
            });
        }
    }
};
</script>

<style>

</style>
