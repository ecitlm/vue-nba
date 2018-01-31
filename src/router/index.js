import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import News from '@/components/News'
Vue.use(Router)

export default new Router({
    history: true,
    //mode: 'history',
    routes: [{
            path: '/home',
            name: 'Home',
            component: Home,
            meta: {
                navShow: true,
                title: "赛事直播"
            }
        },
        {
            path: '/news',
            name: 'News',
            component: News,
            meta: {
                navShow: true,
                title: "新闻资讯"
            }
        },
        { path: '*', redirect: '/home' }
    ]
})