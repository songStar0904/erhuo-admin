import util from '@/libs/util';

export const userColumns = [
    {
        title: '序号',
        type: 'index',
        key: 'user_id',
        width: 80,
        align: 'center',
        sortable: true
    },
    {
        title: '昵称',
        align: 'center',
        key: 'user_name',
        editable: true,
        sortable: true
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