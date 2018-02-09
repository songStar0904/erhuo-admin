<style lang="less">
    @import './message.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType(0)" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="fmsg_status === 0" type="checkmark"></Icon></transition><span class="mes-type-btn-text">未读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType(2)" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="fmsg_status === 2" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hasreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType(3)" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="fmsg_status === 3" type="checkmark"></Icon></transition><span class="mes-type-btn-text">回收站</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="recyclebinCount"></Badge></Button>
            </div>
        </div>
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"></Table>
                </div>
            </transition>
            <transition name="back-message-list">
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.fmsg_content }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.fmsg_time }}</p>
                    <div class="message-content-body">
                        <p class="message-content">{{ mes.fmsg_content }}</p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import util from '@/libs/util';
export default {
    name: 'message_index',
    data () {
        const markAsreadBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        let data = {fmsg_id: params.row.fmsg_id, fmsg_status: 2};
                        this.edit_fmsg(data, () => {
                            this.hasreadMesList.unshift(this.currentMesList.splice(params.index, 1)[0]);
                            this.$store.commit('setMessageCount', this.unreadMesList.length);
                        }); 
                    }
                }
            }, '标为已读');
        };
        const deleteMesBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small',
                    type: 'error'
                },
                on: {
                    click: () => {
                        let data = {fmsg_id: params.row.fmsg_id, fmsg_status: 3};
                        this.edit_fmsg(data, () => {
                            this.recyclebinList.unshift(this.hasreadMesList.splice(params.index, 1)[0]);
                        });
                    }
                }
            }, '删除');
        };
        const restoreBtn = (h, params) => {
            return h('Button', {
                props: {
                    size: 'small'
                },
                on: {
                    click: () => {
                        let data = {fmsg_id: params.row.fmsg_id, fmsg_status: 2};
                        this.edit_fmsg(data, () => {
                            this.hasreadMesList.unshift(this.recyclebinList.splice(params.index, 1)[0]);
                        });
                    }
                }
            }, '还原');
        };
        return {
            currentMesList: [],
            unreadMesList: [],
            hasreadMesList: [],
            recyclebinList: [],
            fmsg_status: 0,
            showMesTitleList: true,
            unreadCount: 0,
            hasreadCount: 0,
            recyclebinCount: 0,
            noDataText: '暂无未读消息',
            mes: {
                fmsg_content: '',
                fmsg_time: '',
                fmsg_content: ''
            },
            mesTitleColumns: [
                // {
                //     type: 'selection',
                //     width: 50,
                //     align: 'center'
                // },
                {
                    title: ' ',
                    key: 'title',
                    align: 'left',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.showMesTitleList = false;
                                    this.mes.fmsg_content = params.row.fmsg_content;
                                    this.mes.fmsg_time = util.formatDate(params.row.fmsg_time);
                                    this.getContent(params.index);
                                }
                            }
                        }, params.row.fmsg_content);
                    }
                },
                {
                    title: ' ',
                    key: 'time',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        return h('span', [
                            h('Icon', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                },
                                style: {
                                    margin: '0 5px'
                                }
                            }),
                            h('span', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                }
                            }, util.formatDate(params.row.fmsg_time))
                        ]);
                    }
                },
                {
                    title: ' ',
                    key: 'asread',
                    align: 'center',
                    width: 100,
                    render: (h, params) => {
                        if (this.fmsg_status === 0) {
                            return h('div', [
                                markAsreadBtn(h, params)
                            ]);
                        } else if (this.fmsg_status === 2) {
                            return h('div', [
                                deleteMesBtn(h, params)
                            ]);
                        } else {
                            return h('div', [
                                restoreBtn(h, params)
                            ]);
                        }
                    }
                }
            ]
        };
    },
    methods: {
        backMesTitleList () {
            this.showMesTitleList = true;
        },
        setCurrentMesType (type) {
            if (this.fmsg_status !== type) {
                this.showMesTitleList = true;
            }
            this.fmsg_status = type;
            if (type === 0) {
                this.noDataText = '暂无未读消息';
                this.currentMesList = this.unreadMesList;
            } else if (type === 2) {
                this.noDataText = '暂无已读消息';
                this.currentMesList = this.hasreadMesList;
            } else {
                this.noDataText = '回收站无消息';
                this.currentMesList = this.recyclebinList;
            }
        },
        getContent () {},
        get_fmsg () {
            this.$fetch.main.get_fmsg()
            .then(res => {
                if (res.code === 200) {
                    Array.from(res.data).forEach((item, index) => {
                        if (item.fmsg_status === 0) {
                            this.unreadMesList.push(item);
                        } else if (item.fmsg_status === 2) {
                            this.hasreadMesList.push(item);
                        } else if (item.fmsg_status === 3) {
                            this.recyclebinList.push(item);
                        }
                    })
                this.currentMesList = this.unreadMesList;
                this.unreadCount = this.unreadMesList.length;
                this.hasreadCount = this.hasreadMesList.length;
                this.recyclebinCount = this.recyclebinList.length;
                } else {
                    this.$Message.error(res.msg);
                }
            })
        },
        edit_fmsg (data, callback) {
            console.log(data);
            this.$fetch.main.edit_fmsg(data)
            .then(res => {
                if (res.code === 200) {
                    callback();
                } else {
                    this.$Message.error(res.msg);
                }
            })
        }
    },
    mounted () {
        this.get_fmsg();
    },
    watch: {
        unreadMesList (arr) {
            this.unreadCount = arr.length;
        },
        hasreadMesList (arr) {
            this.hasreadCount = arr.length;
        },
        recyclebinList (arr) {
            this.recyclebinCount = arr.length;
        }
    }
};
</script>

