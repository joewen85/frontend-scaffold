const userRoutes = {
    path: '/users',
    redirect: '/users/list',
    component: () => import('../layout/Layout.vue'),
    children: [
        {
            path: 'list',
            component: () => import('../views/users/List.vue'),
            name: 'userList'
        }
    ]
}

export default userRoutes