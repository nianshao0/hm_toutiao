<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.back()" fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image round class="avatar" :src="profileObj.photo" @click="imageClickFn" />
          <!-- file 选择框 -->
          <!-- 视觉上隐藏，标签还在DOM树上，还可以触发功能 -->
          <input type="file" ref="iptFile" v-show="false" accept="image/*" @change="onFileChange" />
        </template>
      </van-cell>
      <van-cell title="名称" is-link :value="profileObj.name" />
      <van-cell title="生日" is-link :value="profileObj.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
import { userProfileAPI } from '@/api/index.js'
export default {
  name: 'UserEdit',
  data() {
    return {
      profileObj: {} // 用户基本信息
    }
  },
  async created() {
    const res = await userProfileAPI()
    console.log(res)
    this.profileObj = res.data.data
  },
  methods: {
    // 文件选择改变 - 事件
    onFileChange(e) {
      console.log(e.target.files[0]) // (用户选中的文件对象)数组其实是一个特殊的对象
    },
    // 图片 - 点击事件
    imageClickFn() {
      this.$refs.iptFile.click() // JS模拟标签的事件触发
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;

  .avatar {
    width: 50px;
    height: 50px;
  }
}

.van-nav-bar {
  background-color: #007bf0;
  color: white;
}

/deep/ .van-nav-bar__title {
  color: white
}

/deep/ .van-nav-bar .van-icon {
  color: white
}
</style>
