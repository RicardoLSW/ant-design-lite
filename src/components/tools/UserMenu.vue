<template>
  <div class="user-wrapper">
    <div class="content-box">
      <span class="action ant-dropdown-link user-dropdown-menu">
        <!--        <a-avatar class="avatar" size="small" :src="avatar" />-->
        <span>{{ userInfo().employeeName }}</span>
      </span>
      <!--      <span class="action">-->
      <!--        <a class="logout_title" href="javascript:;" @click="handleLogout">-->
      <!--          <a-icon type="logout" />-->
      <!--          <span>&nbsp;退出登录</span>-->
      <!--        </a>-->
      <!--      </span>-->
    </div>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from 'vuex'

import { mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  computed: {
    // ...mapGetters(['nickname', 'avatar'])
  },
  methods: {
    ...mapGetters(['userInfo']),
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          // return this.Logout()
          //   .then(() => {
          //   })
          //   .catch(err => {
          //     this.$message.error({
          //       title: '错误',
          //       description: err.message
          //     })
          //   })
        },
        onCancel() {}
      })
    }
  }
}
</script>
<style scoped>
.logout_title {
  color: inherit;
  text-decoration: none;
}
</style>
