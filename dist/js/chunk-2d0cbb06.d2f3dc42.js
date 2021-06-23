;(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  ['chunk-2d0cbb06'],
  {
    '4b79': function(e, t, a) {
      'use strict'
      a.r(t)
      var n = function() {
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
                        [a('a-button', { attrs: { type: 'primary' } }, [e._v('导出')])],
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
                        fn: function(t, n) {
                          return a('span', {}, [
                            a(
                              'a',
                              {
                                on: {
                                  click: function(t) {
                                    return e.removeType(n.eleContractNo)
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
        r = [],
        o = a('5530'),
        i = a('2af9'),
        c = a('2407'),
        l = a('4ec3'),
        s = a('2ef0'),
        d = a('c1df'),
        u = a.n(d),
        p = {
          name: 'BranchList',
          components: { SForm: i['b'], STable: i['c'], Ellipsis: i['a'] },
          data: function() {
            var e = this,
              t = this.$createElement
            return {
              config: [
                { key: 'eleContractNo', value: '合同号梯号', type: c['a'] },
                { key: 'startEndDate', value: '整改日期', type: c['b'] },
                {
                  key: 'type',
                  value: '制动器状态',
                  type: c['c'],
                  selectOption: [
                    { key: 'RECTIFIED', title: '已整改' },
                    { key: 'NOT_RECTIFIED', title: '未整改' }
                  ],
                  selectOptions: function() {}
                },
                { key: 'orgName', value: '维保单位名称', type: c['a'] },
                {
                  key: 'activeStatusCode',
                  value: '有效性',
                  type: c['c'],
                  selectOption: [
                    { key: '有效', title: '有效' },
                    { key: '无效', title: '无效' }
                  ],
                  selectOptions: function() {}
                },
                {
                  key: 'brakesType',
                  value: '制动器类型',
                  type: c['c'],
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
                  customRender: function(a, n, r) {
                    return {
                      children: t(
                        'a',
                        {
                          on: Object(o['a'])(
                            {},
                            {
                              click: function() {
                                return e.toRecord(n)
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
                  customRender: function(e, a, n) {
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
                var a = { branchOrgName: '' }
                return (
                  Array.isArray(e.$refs.searchForm.getAllValue().startEndDate) &&
                    e.$refs.searchForm.getAllValue().startEndDate.length &&
                    ((a.startDate = u()(e.$refs.searchForm.getAllValue().startEndDate[0]).format(
                      'YYYY-MM-DD'
                    )),
                    (a.endDate = u()(e.$refs.searchForm.getAllValue().startEndDate[1]).format(
                      'YYYY-MM-DD'
                    ))),
                  Object(l['c'])(
                    Object.assign(
                      t,
                      a,
                      s['pick'](e.$refs.searchForm.getAllValue(), [
                        'eleContractNo',
                        'type',
                        'orgName',
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
            removeType: function(e) {
              var t = this
              Object(l['f'])({ eleContractNo: e }).then(function() {
                t.$message.success('操作成功')
              })
            }
          }
        },
        f = p,
        h = a('2877'),
        m = Object(h['a'])(f, n, r, !1, null, '027eaa85', null)
      t['default'] = m.exports
    }
  }
])
