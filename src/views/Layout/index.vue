<template>
  <div>
    <!-- 二级路由页面 -->
    <div class="home_container">
      <router-view></router-view>
    </div>

    <!-- 下面底部导航 -->
    <div>
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to="/layout/home">首页</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/layout/user">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>
.home_container {
  padding-bottom: 50px;
}

/* 底部导航上边框 */
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
