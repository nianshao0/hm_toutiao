import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' // 引入flexible.js -> 设置根标签字体大小(移动端适配)
import diretivesObj from '@/utils/directives'
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Popup, Row, Col, Badge, Search, Divider, Image as VanImage, CellGroup, Tag } from 'vant'

Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(VanImage)
Vue.use(Divider)
Vue.use(diretivesObj)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Col)
Vue.use(Row)
Vue.use(Popup)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 目标1：有2处在检查我的代码
// webpack开发服务器(在下面终端中)+eslint插件，在保存时，检查代码
// 如果在写代码过程中使用插件解决了问题，webpack里就不会报错了
// vscode+eslint插件+工作区根目录下.eslinrc.js配置，在保存时，检查代码

// 如果不好使排查问题
// 1.ESLint插件右下角 -> 扩展设置
// 2.打开配套md笔记，大纲左边的最下面，有一些常见的错误

// 目标2：组件使用套路
// 1.明确目标，找到类似组件
// 2.引入注册然后复制过来
// 3.读和删没用的
// 4.修改，改成我们想要的样子
// 样式修改：
// (1):找到类名，自己写css覆盖掉它
// (2):看文档，是否支持自定义样式
