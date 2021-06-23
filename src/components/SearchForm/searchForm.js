import Style from './searchForm.module.scss'
import { Select, Checkbox, Button, Row, Col, Input, Form, DatePicker, Icon } from 'ant-design-vue'
import { isArray } from 'ant-design-vue/lib/_util/vue-types/utils'

export const [INPUT, SELECT, CHECKBOX, RANGE_PICKER, INPUT_SEARCH] = new Array(6).keys()

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
  mounted() {
    this.config.forEach(item => {
      if (item.type === SELECT) {
        const { selectOptions } = item
        const result = selectOptions()
        if (
          (typeof result === 'object' || typeof result === 'function') &&
          typeof result.then === 'function' &&
          isArray(item.selectOption) &&
          item.selectOption.length === 0
        ) {
          result.then(r => {
            item.selectOption = r.data.map((e, i) => ({
              key: e[r.key],
              title: e[r.title]
            }))
          })
        }
      }
    })
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
    renderCol(item, index, node) {
      return (
        <Col
          {...{ props: { md: this.rows, sm: 24 } }}
          v-show={index >= this.rowNumber && this.isUnfold ? this.isShow : 'true'}
        >
          <Form.Item {...{ props: { label: item.value } }}>{node}</Form.Item>
        </Col>
      )
    },
    renderInput(item, index) {
      return this.renderCol(
        item,
        index,
        <Input v-decorator={[item.key]} {...{ props: { placeholder: `请输入${item.value}` } }} />
      )
    },
    renderSelect(item, index) {
      return this.renderCol(
        item,
        index,
        <Select
          v-decorator={[item.key]}
          options={item.selectOption}
          {...{ props: { placeholder: `请选择${item.value}` } }}
        />
      )
    },
    renderCheckbox(item, index) {
      return this.renderCol(
        item,
        index,
        <Checkbox
          v-decorator={[
            item.key,
            {
              valuePropName: 'checked'
            }
          ]}
        />
      )
    },
    renderRangePicker(item, index) {
      return this.renderCol(
        item,
        index,
        <DatePicker.RangePicker v-decorator={[item.key]} style={{ width: '100%' }} />
      )
    },
    renderInputSearch(item, index) {
      return this.renderCol(
        item,
        index,
        <Input.Search
          v-decorator={[item.key]}
          {...{
            props: { placeholder: `请选择${item.value}` },
            on: { search: () => item.inputSearch(item.key) }
          }}
          read-only
        />
      )
    },
    renderFormItem(item, index) {
      switch (item.type) {
        case INPUT:
          return this.renderInput(item, index)
        case SELECT:
          return this.renderSelect(item, index)
        case CHECKBOX:
          return this.renderCheckbox(item, index)
        case RANGE_PICKER:
          return this.renderRangePicker(item, index)
        case INPUT_SEARCH:
          return this.renderInputSearch(item, index)
        default:
          break
      }
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
          <a
            style={{ marginLeft: '8px' }}
            {...{ on: { click: () => (this.isShow = !this.isShow) } }}
          >
            {this.isShow ? '收起' : '展开'}
            <Icon type={this.isShow ? 'up' : 'down'} />
          </a>
        )
      const buttonGroup = [
        <Col
          {...{ props: { md: this.buttonMD, sm: 24 } }}
          style={{ float: 'right', overflow: 'hidden' }}
        >
          <span
            class={Style['table-page-search-submitButtons']}
            style={{ float: 'right', overflow: 'hidden' }}
          >
            {/* 在查询、重置左边添加自定义按钮 */}
            {this.$slots.defaultButtonGroup}
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
            {unfold}
          </span>
        </Col>
      ]
      // 添加左侧自定义按钮组
      if (this.$slots.leftButtonGroup) {
        buttonGroup.unshift(
          <Col {...{ props: { md: 16, sm: 24 } }}>
            <span class={Style['table-page-search-submitButtons']}>
              {this.$slots.leftButtonGroup}
            </span>
          </Col>
        )
      }
      return buttonGroup
    }
  },
  render(createElement, context) {
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
        <Row {...{ props: { gutter: this.gutter } }}>
          {formItem.concat(this.renderActionButton())}
        </Row>
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
