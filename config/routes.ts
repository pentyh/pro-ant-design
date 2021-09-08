export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                path: '/user',
                routes: [
                    {
                        name: 'login',
                        path: '/user/login',
                        component: './user/Login',
                    },
                ],
            },
            {
                component: './404',
            },
        ],
    },
    {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
    },
    {
        path: '/admin',
        name: 'admin',
        icon: 'crown',
        access: 'canAdmin',
        component: './Admin',
        routes: [
            {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
            },
            {
                component: './404',
            },
        ],
    },
    {
        name: 'list.table-list',
        icon: 'table',
        path: '/list',
        component: './TableList',
    },
    {
        path: '/meeting',
        name: 'meeting',
        icon: 'table',
        routes: [
            {
                path: '/meeting',
                redirect: '/meeting/list',
            },
            {
                path: '/meeting/list',
                name: 'list',
                component: './meeting/List',
            },
            {
                path: '/meeting/new',
                name: 'new',
                // component: './meeting/List',
            },
            {
                path: '/meeting/:uid',
                name: 'detail',
                hideInMenu: true,
                component: './meeting/Detail',
            },
            {
                component: './404',
            },
        ],
    },
    {
        path: '/',
        redirect: '/welcome',
    },
    {
        component: './404',
    },
];
