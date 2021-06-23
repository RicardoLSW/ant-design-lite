;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-2d0c91e7'],
  {
    '587e': function(e, t, a) {
      'use strict'
      a.r(t)
      var r = function() {
          var e = this,
            t = e.$createElement,
            a = e._self._c || t
          return a(
            'div',
            [
              a(
                'a-card',
                { attrs: { bordered: !1 } },
                [
                  a(
                    's-form',
                    {
                      ref: 'searchForm',
                      attrs: { config: e.config, 'row-number': 3, isUnfold: !1 },
                      on: {
                        search: function(t) {
                          return e.$refs.table.refresh()
                        }
                      }
                    },
                    [
                      a(
                        'template',
                        { slot: 'defaultButtonGroup' },
                        [
                          a(
                            'a-button',
                            { attrs: { type: 'primary' }, on: { click: e.exportExcel } },
                            [e._v('导出')]
                          )
                        ],
                        1
                      )
                    ],
                    2
                  )
                ],
                1
              ),
              a(
                'a-card',
                { staticStyle: { 'margin-top': '24px' }, attrs: { bordered: !1 } },
                [
                  a('s-table', {
                    ref: 'table',
                    attrs: {
                      size: 'small',
                      rowKey: 'eleContractNo',
                      columns: e.columns,
                      data: e.loadData,
                      bordered: '',
                      scroll: { x: 1820 }
                    },
                    scopedSlots: e._u([
                      {
                        key: 'action',
                        fn: function(t, r) {
                          return a('span', {}, [
                            a(
                              'a',
                              {
                                on: {
                                  click: function(t) {
                                    return e.removeType(r.eleContractNo)
                                  }
                                }
                              },
                              [e._v('移除制动器类型')]
                            )
                          ])
                        }
                      }
                    ])
                  })
                ],
                1
              )
            ],
            1
          )
        },
        n = [],
        o = a('5530'),
        l = a('2af9'),
        s = a('2407'),
        c = a('4ec3'),
        i = a('2ef0'),
        d = a('c1df'),
        u = a.n(d),
        p = {
          name: 'HelloWorld',
          components: { SForm: l['b'], STable: l['c'], Ellipsis: l['a'] },
          data: function() {
            var e = this,
              t = this.$createElement
            return {
              config: [
                { key: 'eleContractNo', value: '合同号梯号', type: s['a'] },
                { key: 'startEndDate', value: '整改日期', type: s['b'] },
                {
                  key: 'type',
                  value: '制动器状态',
                  type: s['c'],
                  selectOption: [
                    { key: 'RECTIFIED', title: '已整改' },
                    { key: 'NOT_RECTIFIED', title: '未整改' }
                  ],
                  selectOptions: function() {}
                },
                { key: 'orgName', value: '维保单位名称', type: s['a'] },
                { key: 'branchOrgName', value: '所属分公司', type: s['a'] },
                {
                  key: 'activeStatusCode',
                  value: '有效性',
                  type: s['c'],
                  selectOption: [
                    { key: '有效', title: '有效' },
                    { key: '无效', title: '无效' }
                  ],
                  selectOptions: function() {}
                },
                {
                  key: 'brakesType',
                  value: '制动器类型',
                  type: s['c'],
                  selectOption: [
                    { key: 'EM鼓式制动器', title: 'EM鼓式制动器' },
                    { key: 'PM鼓式制动器', title: 'PM鼓式制动器' },
                    { key: '威特主机', title: '威特主机' }
                  ],
                  selectOptions: function() {}
                }
              ],
              columns: [
                {
                  title: '电梯合同号',
                  dataIndex: 'eleContractNo',
                  width: '150px',
                  customRender: function(a, r, n) {
                    return {
                      children: t(
                        'a',
                        {
                          on: Object(o['a'])(
                            {},
                            {
                              click: function() {
                                return e.toRecord(r)
                              }
                            }
                          )
                        },
                        [a]
                      )
                    }
                  }
                },
                {
                  title: '客户名称',
                  dataIndex: 'customerName',
                  width: '200px',
                  customRender: function(e, a, r) {
                    return { children: t('ellipsis', { attrs: { length: 24, tooltip: !0 } }, [e]) }
                  }
                },
                { title: '电梯注册编号', dataIndex: 'equipRegisterNo', width: '200px' },
                { title: '客户梯号', dataIndex: 'eleLocalName', width: '100px' },
                { title: '所属分公司', dataIndex: 'branchOrgName', width: '150px' },
                { title: '维保站名称/三方保养单位', dataIndex: 'orgName', width: '200px' },
                {
                  title: '制动器状态',
                  dataIndex: 'whetherToRectify',
                  width: '100px',
                  customRender: function(e, t, a) {
                    return { children: 'RECTIFIED' === e ? '整改' : '未整改' }
                  }
                },
                { title: '整改日期', dataIndex: 'finishDate', width: '180px' },
                { title: '下次年检日期', dataIndex: 'examinationValidDate', width: '180px' },
                { title: '有效性', dataIndex: 'activeStatusCode', width: '80px' },
                { title: '鼓式制动器类型', dataIndex: 'brakesType', width: '130px' },
                {
                  title: '操作',
                  dataIndex: 'action',
                  scopedSlots: { customRender: 'action' },
                  width: '150px'
                }
              ],
              loadData: function(t) {
                var a = {}
                return (
                  Array.isArray(e.$refs.searchForm.getAllValue().startEndDate) &&
                    e.$refs.searchForm.getAllValue().startEndDate.length &&
                    ((a.startDate = u()(e.$refs.searchForm.getAllValue().startEndDate[0]).format(
                      'YYYY-MM-DD'
                    )),
                    (a.endDate = u()(e.$refs.searchForm.getAllValue().startEndDate[1]).format(
                      'YYYY-MM-DD'
                    ))),
                  Object(c['c'])(
                    Object.assign(
                      t,
                      a,
                      i['pick'](e.$refs.searchForm.getAllValue(), [
                        'eleContractNo',
                        'type',
                        'orgName',
                        'branchOrgName',
                        'brakesType',
                        'brakesType'
                      ])
                    )
                  ).then(function(e) {
                    return {
                      data: e.result.content,
                      page: t.page,
                      size: t.size,
                      totalCount: e.result.totalElements
                    }
                  })
                )
              }
            }
          },
          methods: {
            toRecord: function(e) {
              this.$router.push({ name: 'Record', query: Object(o['a'])({}, e) })
            },
            exportExcel: function() {
              var e = {}
              Array.isArray(this.$refs.searchForm.getAllValue().startEndDate) &&
                this.$refs.searchForm.getAllValue().startEndDate.length &&
                ((e.startDate = u()(this.$refs.searchForm.getAllValue().startEndDate[0]).format(
                  'YYYY-MM-DD'
                )),
                (e.endDate = u()(this.$refs.searchForm.getAllValue().startEndDate[1]).format(
                  'YYYY-MM-DD'
                ))),
                Object(c['d'])(
                  Object.assign(
                    e,
                    i['pick'](this.$refs.searchForm.getAllValue(), [
                      'eleContractNo',
                      'type',
                      'orgName',
                      'branchOrgName',
                      'brakesType',
                      'brakesType'
                    ])
                  )
                ).then()
            },
            removeType: function(e) {
              var t = this
              Object(c['f'])({ eleContractNo: e }).then(function() {
                t.$message.success('操作成功')
              })
            }
          }
        },
        h = p,
        f = a('2877'),
        m = Object(f['a'])(h, r, n, !1, null, '5a910f79', null)
      t['default'] = m.exports
    }
  }
])
