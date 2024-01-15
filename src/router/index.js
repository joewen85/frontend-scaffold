import {createRouter, createWebHashHistory} from 'vue-router'

// const user = () => import('../vues/User.vue')
const Login = () => import('../views/Login.vue')

const listRoutes = {

}
const routes = [
    listRoutes,
    {
        path: '/login',
        component: Login,
        name: 'login'
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router