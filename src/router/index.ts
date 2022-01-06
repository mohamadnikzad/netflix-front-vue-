import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/pages/Home.vue'
import Explore from '/src/pages/Explore.vue'
import Movie from '/src/pages/Movie.vue'
import About from '/src/pages/About.vue'
import AdminPanel from '/src/pages/AdminPanel.vue'
import Login from '/src/pages/auth/Login.vue'
import Register from '/src/pages/auth/Register.vue'
import { getToken } from '../util/getToken'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/movie/:id',
        name: 'Movie',
        component: Movie,
    },
    {
        path: '/explore',
        name: 'Explore',
        component: Explore,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminPanel,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Register' && !getToken())
        next('/login')
    if ((to.name === 'Login' || to.name === 'Register') && !!getToken())
        next('/')
    else next()
})
export default router
