import Tabs, { TabPane } from 'ant-design-vue/es/tabs'
export default {
  name: 'TMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    onTabClick(e) {
      this.$router.push({ path: e })
    },
    renderTabPane(menu) {
      const asyncProps = {
        key: menu.path,
        props: {
          tab: menu.meta.title
        }
      }
      return <TabPane {...asyncProps} />
    }
  },
  render() {
    const asyncProps = {
      props: {
        size: 'large',
        activeKey: this.$route.path
      },
      on: {
        tabClick: this.onTabClick
      }
    }
    const menuList = this.menu.map(item => {
      if (item.hidden) {
        return null
      }
      return this.renderTabPane(item)
    })
    return <Tabs {...asyncProps}>{menuList}</Tabs>
  }
}
