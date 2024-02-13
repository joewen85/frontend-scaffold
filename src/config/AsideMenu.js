export const AsideMenu = [
    {
        title: '用户管理',
        index: '/users',
        icon: "iconfont icon-yonghuguanli",
        items: [
            {
                title: '用户列表',
                index: '/users/list',
            },
        ]
    },
    {
        title: '产品管理',
        index: '/products',
        icon: "iconfont icon-ziyuan",
        subMenus: [
            {
                title: '衣服',
                index: '/products/clothes',
                icon: "iconfont icon-zhuti_yifu",
                items: [
                    {
                        title: '衣服添加',
                        index: '/products/clothes/add',
                    },
                    {
                        title: '衣服列表',
                        index: '/products/clothes/lists',
                    }
                ]
            },
            {
                title: '数码产品',
                index: '/products/digitial',
                icon: 'iconfont icon-shumachanpin',
                items: [
                    {
                        title: '数码产品添加',
                        index: '/products/digitial/add',
                    },
                    {
                        title: '数码产品列表',
                        index: '/products/digitial/lists',
                    }
                ]
            }
        ]
    },
    {
        title: '订单管理',
        index: '/order',
        icon: "iconfont icon-dingdanguanli",
        subMenus: [
            {
                title: '衣服订单管理',
                index: '/order/clothes',
                icon: '',
                items: [
                    {
                        title: '添加',
                        index: '/order/clothes/add',
                    },
                    {
                        title: '列表',
                        index: '/order/clothes/lists',
                    }
                ]
            },
            {
                title: '数码订单管理',
                index: '/order/digitial',
                icon: '',
                items: [
                    {
                        title: '添加',
                        index: '/order/digitial/add',
                    },
                    {
                        title: '列表',
                        index: '/order/digitial/lists',
                    }
                ]
            }
        ]
    }
]