import util from '@/libs/util';

export const userColumns = [
    {
        title: '序号',
        type: 'index',
        key: 'user_id',
        align: 'center',
        sortable: true
    },
    {
        title: '昵称',
        align: 'center',
        key: 'user_name',
        editable: true,
        sortable: true,
        render: (h, params) => {
            return h('div', [
                h('Avatar', {
                    props: {
                        src: params.row.user_icon,
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    }
                }),
                h('span', {
                }, params.row.user_name)
            ]);
        }
    },
    {
        title: '性别',
        align: 'center',
        filters: [
            {
                label: '男',
                value: 1
            },
            {
                label: '女',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.user_sex === 'male';
            } else if (value === 2) {
                return row.user_sex === 'female';
            }
        },
        render: (h, params) => {
            return h('div', params.row.user_sex === 'male' ? '男' : '女' );
        }
    },
    {
        title: '学校',
        align: 'center',
        render: (h, params) => {
            return h('div', util.formatSchool(params.row.user_sid));
        }
    },
    {
        title: '手机',
        align: 'center',
        key: 'user_phone',
        editable: true,
        sortable: true
    },
    {
        title: '邮箱',
        align: 'center',
        key: 'user_email',
        width: 180,
        editable: true,
        sortable: true
    },
    {
        title: '注册时间',
        align: 'center',
        width: 160,
        sortable: true,
        render: (h, params) => {
            return h('div', [
                h('Icon', {
                    props: {
                        type: 'clock'
                    }
                }),
                h('span', util.formatDate(params.row.user_rtime))
            ])
        }
    },
    {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.show(params.index)
                        }
                    }
                }, 'View'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                }, 'Delete')
            ]);
        }
    }
];

export const goodsColumns = [
    {
        title: '序号',
        type: 'index',
        key: 'goods_id',
        width: 80,
        align: 'center',
        sortable: true
    },
    {
        title: '二货名',
        align: 'center',
        key: 'goods_name',
        editable: true,
        sortable: true
    },
    {
        title: '发布人',
        key: 'user',
        width: 150,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Avatar', {
                    props: {
                        src: params.row.user.icon,
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    }
                }),
                h('span', {
                }, params.row.user.name)
            ]);
        }
    },
    {
        title: '二货分类',
        align: 'center',
        key: 'goods_name',
        editable: true,
        sortable: true,
        render: (h, params) => {
            return h('div', params.row.gclassify.name);
        }
    },
    {
        title: '交易方式',
        align: 'center',
        filters: [
            {
                label: '送货上门/自提',
                value: 0
            },
            {
                label: '送货上门',
                value: 1
            },
            {
                label: '自提',
                value: 2
            }
        ],
        filterMultiple: false,
        filterMethod (value, row) {
            if (value === 1) {
                return row.goods_type === 1;
            } else if (value === 2) {
                return row.goods_type === 2;
            } else if (value === 0) {
                return row.goods_type === 0;
            }
        },
        render: (h, params) => {
            return h('div', util.formatGoodsType(params.row.goods_type) );
        }
    },
    {
        title: '审核',
        key: 'goods_status',
        align: 'center',
        handle: ['switch']
    },
    {
        title: '创建时间',
        align: 'center',
        sortable: true,
        width: 160,
        render: (h, params) => {
            return h('div', [
                h('Icon', {
                    props: {
                        type: 'clock'
                    }
                }),
                h('span', util.formatDate(params.row.goods_time))
            ])
        }
    },
    {
        title: '浏览次数',
        align: 'center',
        key: 'goods_view',
        editable: true,
        sortable: true
    },
    {
        title: '操作',
        key: 'action',
        width: 140,
        align: 'center',
        render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '5px'
                    },
                    on: {
                        click: () => {
                            this.show(params.index)
                        }
                    }
                }, 'View'),
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.remove(params.index)
                        }
                    }
                }, 'Delete')
            ]);
        }
    },
    {
        type: 'expand',
        width: 50,
        handle: ['expand']
    }
];

export const gclassifyColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        key: 'gclassify_id',
        align: 'center'
    },
    {
        title: '分类名称',
        align: 'center',
        key: 'gclassify_name',
        editable: true
    },
    {
        title: '操作',
        align: 'center',
        width: 200,
        key: 'handle',
        handle: ['edit', 'delete']
    }
];
const tableData = {
    userColumns: userColumns,
    gclassifyColumns: gclassifyColumns
};

export default tableData;