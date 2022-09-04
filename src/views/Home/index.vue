<template>
  <div>
    <!-- 头部导航
      fixed 可以让头部div带固定定位样式
      (原理：给组件内props传入true/false，影响到组件内的动态样式：class)
      -->
    <div>
      <van-nav-bar fixed>
        <template v-slot:left>
          <img class="logo" src="@/assets/toutiao_logo.png" alt="">
        </template>
        <template #right>
          <!-- 坑：postcss只能翻译style里css样式代码，标签内行内样式无法转换px转rem，所以需要自己手动计算 -->
          <van-icon name="search" size="0.48rem" color="#fff" @click="moveSearchPageFn" />
        </template>
      </van-nav-bar>
    </div>
    <!-- tab航导栏
      van-tabs 一行容器
      van-tab 每个tab栏
      v-model关联的激活项的下标(双向绑定)
      tab栏+内容

      (重要)每个van-tab代表一个标签导航，中间夹着内容，对应的下属列表内容
      (重要)每个van-tab都对应独立的自己的ArticleList(多次)
      细节：van-tab循环了很多标签导航，与之一一对应的内容列表不是上来都创建的，默认当前激活导航对应列表组件
      第一次切换到对应频道时，才会创建下属的AryicleList组件->created方法
      第二次切换就是显示/隐藏切换
    -->
    <div class="main">
      <van-tabs v-model="channelId" @change="channelChangeFn" animated sticky offset-top="1.226667rem">
        <van-tab :title="obj.name" v-for="obj in userChannelList" :key="obj.id" :name="obj.id">
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <van-icon name="plus" size="0.37333334rem" class="moreChannels" @click="plusClickFn" />
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup class="channel_popup" v-model="show">
      <ChannelEdit :userList="userChannelList" :unCheckList="unCheckChannelList" @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn" @closeEV="closeFn" ref="editRef" v-model="channelId"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelsAPI, getAllChannelsAPI, updateChannelsAPI, removeTheChannelAPI } from '@/api/index.js'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  data() {
    return {
      channelId: 0, // tab导航-激活频道ID (默认频道ID为0，页面刚打开是推荐频道高亮-对应文章数据)
      userChannelList: [], // 用户选择的频道列表
      allChannelList: [], // 所有频道列表
      // articleList: [] // 文章列表
      show: false // 频道弹出层显示/隐藏
    }
  },
  async created() {
    const res = await getUserChannelsAPI()
    this.userChannelList = res.data.data.channels
    // this.channelChangeFn()

    // 所有频道列表
    const res2 = await getAllChannelsAPI()
    this.allChannelList = res2.data.data.channels
  },
  methods: {
    // tabs切换的事件 -> 获取文章列表数据
    async channelChangeFn() {
      // 文章列表
      // const res2 = await getAllArticleListAPI({
      //   channel_id: this.channelId, // 先默认请求推荐频道数据
      //   timestamp: (new Date()).getTime
      // })
      // console.log(res2)
      // this.articleList = res2.data.data.results
    },
    // +号点击方法
    plusClickFn() {
      this.show = true
    },
    // 添加频道
    async addChannelFn(channelObj) {
      this.userChannelList.push(channelObj)
      // 还要把最新的数组，发送给后台
      // 数组里对象字段 -> 转换
      // 推荐频道不能传递-删除剩下的频道对象
      // const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      // this.userChannelList.forEach((obj, index) => {
      //   // delete 对象.属性 可以删除键值对
      //   delete obj.name
      //   obj.seq = index
      // })
      // const res = await updateChannelsAPI({
      //   channels: newArr
      // })
      // console.log(res)

      // 上面的代码出问题，新增时，名字被删除了
      // 原因：所有数组里的对象，都是同一个内存地址，影响到ChannelEdit.vue中对象
      // 解决方案
      const newArr = this.userChannelList.filter(obj => obj.id !== 0)
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj } // 拷贝(浅拷贝)
        delete newObj.name
        newObj.seq = index

        return newObj // 让map方法把新对象收集起来形成一个新数组
      })
      const res = await updateChannelsAPI({
        channels: theNewArr
      })
      console.log(res)
    },
    // 删除频道
    async removeChannelFn(channelObj) {
      const index = this.userChannelList.findIndex(obj => obj.id === channelObj.id)
      this.userChannelList.splice(index, 1)

      // 第一种方式：把现在用户数组的数据，再覆盖式的发给后台
      // 需要把上面的更新数组过程，封装一个函数，add和remove里调用(笔记里)
      // 第二种方式：只调用删除的接口
      const res = await removeTheChannelAPI({
        channelId: channelObj.id
      })
      console.log(res)
      // 知道：删除接口返回状态码(Not Content) 无返回内容
    },
    // 关闭弹出层方法
    closeFn() {
      this.show = false
      // 我要让内部的编辑状态回归false
      this.$refs.editRef.isEdit = false
    },
    // 首页-右上角放大镜点击事件->跳转搜索页面
    moveSearchPageFn() {
      this.$router.push('/search')
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  // 计算属性
  computed: {
    unCheckChannelList() {
      // 目标：把所有频道数组挨个对象取出，去用户已选频道数组里查找，如果找不到，则让filter方法收集到一个新的数组里
      const newArr = this.allChannelList.filter(bigObj => {
        const index = this.userChannelList.findIndex(smallObj => {
          return smallObj.id === bigObj.id
        })

        // 如果找到了
        if (index > -1) {
          return false
        } else {
          return true
        }
      })

      return newArr
      // return this.allChannelList.filter(bigObj => (this.userChannelList.findIndex(smallObj => smallObj.id === bigObj.id) === -1))
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: #007bf0;
}

/deep/ .van-nav-bar__title {
  color: white
}

/deep/ .van-tabs__line {
  background-color: #007bf0
}

.logo {
  width: 100px;
  height: 30px
}

.main {
  padding-top: 46px // 底部在Layout/index.vue给二级路由挂载点容器上给了一个padding0bottom
}

// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

.channel_popup {
  width: 100vw;
  height: 100vh;
}

// 如果想给100%，要线给html和body设置100%
// vw和vh是css3新出的单位，参考浏览器窗口的百分比
</style>
