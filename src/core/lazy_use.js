import Vue from 'vue'
import config from '../config/defaultSettings'

import VueStorage from 'vue-ls'

import {
  Button,
  Layout,
  Menu,
  Breadcrumb,
  Avatar,
  Icon,
  Tabs,
  Drawer,
  Card,
  Form,
  Input,
  Row,
  Col,
  Table,
  Modal,
  ConfigProvider,
  notification,
  Select,
  Dropdown,
  Timeline,
  Upload,
  Empty,
  message
} from 'ant-design-vue'

Vue.use(Button)
  .use(Layout)
  .use(Menu)
  .use(Breadcrumb)
  .use(Avatar)
  .use(Icon)
  .use(Tabs)
  .use(Drawer)
  .use(Card)
  .use(Form)
  .use(Input)
  .use(Row)
  .use(Col)
  .use(Table)
  .use(Modal)
  .use(ConfigProvider)
  .use(Select)
  .use(Dropdown)
  .use(Timeline)
  .use(Upload)
  .use(Empty)

Vue.prototype.$notification = notification
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message

Vue.use(VueStorage, config.storageOptions)
