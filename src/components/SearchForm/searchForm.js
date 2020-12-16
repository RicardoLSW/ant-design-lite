import Style from './searchForm.module.scss'
import { Select, Checkbox, Button, Row, Col, Input, Form, DatePicker, Icon } from 'ant-design-vue'

export default {
  name: 'SForm',
  props: {
    /**
     * 表单配置项
     */
    config: {
      type: Array,
      required: true
    },
    /**
     * 每行个数，默认每行3个
     */
    rowNumber: {
      type: Number,
      default: 3
    },
    labelCol: {
      type: Object,
      default: () => {
        return { span: 5 }
      }
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return { span: 19 }
      }
    },
    gutter: {
      type: Number,
      default: 8
    },
    /**
     * 是否显示导出按钮
     * 提供export事件，传递一个表单内容
     */
    showExport: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示展开/收起
     */
    isUnfold: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      isShow: false
    }
  },
  computed: {
    rows() {
      return parseInt((24 / this.rowNumber).toString())
    },
    buttonMD() {
      if (this.config && this.config.length) {
        // 如果左侧有自定义按钮组，则右侧按钮宽度默认为8
        if (this.$slots.leftButtonGroup) return 8
        if (this.rowNumber === this.config.length + 1) return this.rows
        else return 24 - (this.config.length % this.rowNumber) * this.rows
      }
      return 0
    }
  },
  methods: {
    reset() {
      this.form.resetFields()
      this.$emit('search', this.getAllValue())
    },
    onSearch() {
      this.$emit('search', this.getAllValue())
    },
    onExport() {
      this.$emit('export', this.getAllValue())
    },
    setValue(key, value) {
      const params = {}
      params[key] = value
      this.form.setFieldsValue(params)
    },
    getValue(key) {
      return this.form.getFieldValue(key)
    },
    getAllValue() {
      return this.form.getFieldsValue()
    },
    renderFormItem(item, index) {
      let tag = null
      switch (item.type) {
        case 'input':
          tag = <Input v-decorator={[item.key]} {...{ props: { placeholder: `请输入${item.value}` } }} />
          break
        case 'select':
          const selectOption = item.selectOptions.map((e, i) => {
            return (
              <Select.Option key={i} value={e.key}>
                {e.value}
              </Select.Option>
            )
          })
          tag = (
            <Select v-decorator={[item.key]} {...{ props: { placeholder: `请选择${item.value}` } }}>
              {selectOption}
            </Select>
          )
          break
        case 'checkbox':
          tag = (
            <Checkbox
              v-decorator={[
                item.key,
                {
                  valuePropName: 'checked'
                }
              ]}
            />
          )
          break
        case 'range-picker':
          tag = (
            <DatePicker.RangePicker
              v-decorator={[item.key]}
              style={{ width: '100%' }}
            ></DatePicker.RangePicker>
          )
          break
        case 'input-search':
          tag = (
            <Input.Search
              v-decorator={[item.key]}
              {...{
                props: { placeholder: `请选择${item.value}` },
                on: { search: () => item.inputSearch(item.key) }
              }}
              read-only
            />
          )
          break
        default:
          break
      }
      return (
        <Col
          {...{ props: { md: this.rows, sm: 24 } }}
          v-show={index >= this.rowNumber && this.isUnfold ? this.isShow : 'true'}
        >
          <Form.Item {...{ props: { label: item.value } }}>{tag}</Form.Item>
        </Col>
      )
    },
    renderActionButton() {
      let btnGroup = null
      if (this.showExport) {
        btnGroup = (
          <Button
            {...{
              props: { type: 'primary' },
              on: { click: this.onExport }
            }}
          >
            导出
          </Button>
        )
      }
      let unfold = null
      if (this.config.length > this.rowNumber && this.isUnfold)
        unfold = (
          <a style={{ marginLeft: '8px' }} {...{ on: { click: () => (this.isShow = !this.isShow) } }}>
            {this.isShow ? '收起' : '展开'}
            <Icon type={this.isShow ? 'up' : 'down'} />
          </a>
        )
      const buttonGroup = [
        <Col {...{ props: { md: this.buttonMD, sm: 24 } }} style={{ float: 'right', overflow: 'hidden' }}>
          <span
            class={Style['table-page-search-submitButtons']}
            style={{ float: 'right', overflow: 'hidden' }}
          >
            {btnGroup}
            <Button
              {...{
                props: { type: 'primary' },
                on: { click: this.onSearch }
              }}
              style={{ marginLeft: '8px' }}
            >
              查询
            </Button>
            <Button {...{ on: { click: this.reset } }} style={{ marginLeft: '8px' }}>
              重置
            </Button>
            {/* 在查询、重置右边添加自定义按钮 */}
            {this.$slots.defaultButtonGroup}
            {unfold}
          </span>
        </Col>
      ]
      // 添加左侧自定义按钮组
      if (this.$slots.leftButtonGroup) {
        buttonGroup.unshift(
          <Col {...{ props: { md: 16, sm: 24 } }}>
            <span class={Style['table-page-search-submitButtons']}>{this.$slots.leftButtonGroup}</span>
          </Col>
        )
      }
      return buttonGroup
    }
  },
  render(createElement, context) {
    console.log(this.$slots)
    const props = {
      props: {
        labelCol: this.labelCol,
        wrapperCol: this.wrapperCol,
        labelAlign: 'right'
      }
    }
    const formItem = this.config.map((item, index) => {
      if (!item) {
        return null
      }
      return this.renderFormItem(item, index)
    })
    let queryForm = null
    // 把左侧按钮组和右侧按钮组放在新的一行，与查询表单分开
    if (this.$slots.leftButtonGroup)
      queryForm = [
        <Row {...{ props: { gutter: this.gutter } }}>{formItem}</Row>,
        <Row>{this.renderActionButton()}</Row>
      ]
    else
      queryForm = (
        <Row {...{ props: { gutter: this.gutter } }}>{formItem.concat(this.renderActionButton())}</Row>
      )
    return (
      <div class={Style['table-page-search-wrapper']}>
        <Form {...props} form={this.form}>
          {queryForm}
        </Form>
      </div>
    )
  }
}
