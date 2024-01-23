import {createRouter, createWebHashHistory} from 'vue-router'
import { CONFIG } from '../config/index.js'

// const user = () => import('../vues/User.vue')
const Login = () => import('../views/Login.vue')
const Index = () => import('../views/Index.vue')
const Home = () => import('../layout/index.vue')

const listRoutes = {

}
const routes = [
    listRoutes,
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/',
        component: Index,
        name: 'index'
    },
    {
        path: '/home',
        component: Home,
        name: 'home'
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach(
    (to, from, next) => {    
        const toLogin = to.path.indexOf('/login')   // 0 不是login为-1
        const tokenState = window.localStorage.getItem(CONFIG.TOKEN_NAME)
        if (toLogin === 0 && tokenState) {
            next('/')
        } else if (toLogin === 0 && !tokenState) {
            next()
        } else if (tokenState) {
            next()
        } else {
            next('/login')
        }
    }
)

export default router