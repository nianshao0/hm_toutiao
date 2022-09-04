import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import User from '@/views/User/index.vue'
import Search from '@/views/Search/index.vue'
import SearchResult from '@/views/Search/SearchResult.vue'
import ArticleDetail from '@/views/ArticleDetail/index.vue'
import UserEdit from '@/views/User/UserEdit.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/layout/home' }, // 默认显示layout和layout下的首页
  { path: '/login', component: Login },
  {
    path: '/layout',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      { path: 'user', component: User }
    ]
  },
  { path: '/search', component: Search },
  // 搜索结果页
  { path: '/search_result/:kw', component: SearchResult },
  // 文章详情页
  { path: '/detail', component: ArticleDetail },
  { path: '/user_edit', component: UserEdit }
]

const router = new VueRouter({
  routes
})

export default router
