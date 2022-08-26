import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

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
