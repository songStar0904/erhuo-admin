import util from '@/libs/util';

export const userColumns = [
    {
        title: '序号',
        type: 'index',
        key: 'user_id',
        width: 80,
        align: 'center'
    },
    {
        title: '昵称',
        align: 'center',
        key: 'user_name',
        editable: true
    },
    {
        title: '性别',
        align: 'center',
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
        editable: true
    },
    {
        title: '邮箱',
        align: 'center',
        key: 'user_email',
        width: 180,
        editable: true
    },
    {
        title: '注册时间',
        align: 'center',
        editable: true,
        render: (h, params) => {
            return h('div', [
                h('Icon', {
                    props: {
                        type: 'person'
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

const tableData = {
    userColumns: userColumns
};

export default tableData;