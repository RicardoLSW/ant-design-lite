<template>
  <div>
    <a-layout style="min-height: 100vh; ">
      <div class="menu">
        <div class="title">{{ $route.matched[0].meta.title }}</div>
        <t-menu :menu="menus"></t-menu>
      </div>
      <a-layout-content style="height: 100%; margin: 24px 24px 0;">
        <router-view ref="content" />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import TMenu from '@/components/TabsMenu'
import config from '@/config/defaultSettings'
import convertRoutes from '@/utils/routeConvert'
import { asyncRouterMap } from '@/config/router.config'
export default {
  name: 'TabsView',
  components: { TMenu },
  data() {
    return {
      production: config.production,
      collapsed: false,
      menus: []
    }
  },
  created() {
    const routes = convertRoutes(asyncRouterMap.find(item => item.path === this.$route.matched[0].path))
    this.menus = (routes && routes.children) || []
    this.collapsed = !this.sidebarOpened
  }
}
</script>

<style scoped lang="scss">
.menu {
  background-color: #fff;
  .title {
    padding: 24px;
    color: #000;
    font-size: 24px;
    font-weight: 700;
  }
}
::v-deep .ant-tabs-bar {
  margin: 0;
}
::v-deep .ant-tabs .ant-tabs-large-bar .ant-tabs-tab {
  padding: 16px 32px;
}
</style>
