<template>
  <div>
    <a-card :bordered="false">
      <s-form
        ref="searchForm"
        :config="config"
        :row-number="3"
        :isUnfold="false"
        @search="$refs.table.refresh()"
      >
        <template slot="defaultButtonGroup">
          <a-button type="primary">导出</a-button>
        </template>
      </s-form>
    </a-card>
    <a-card style="margin-top: 24px" :bordered="false">
      <s-table
        ref="table"
        size="small"
        rowKey="eleContractNo"
        :columns="columns"
        :data="loadData"
        bordered
        :scroll="{ x: 1820 }"
      >
        <span slot="action" slot-scope="text, record">
          <a @click="removeType(record.eleContractNo)">移除制动器类型</a>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { SForm, STable, Ellipsis } from '../components'
import { INPUT, RANGE_PICKER, SELECT } from '../components/SearchForm/searchForm'
import { elevators, removeTag } from '../api/api'
import * as _ from 'lodash'
import moment from 'moment'
export default {
  name: 'BranchList',
  components: { SForm, STable, Ellipsis },
  data() {
    return {
      config: [
        { key: 'eleContractNo', value: '合同号梯号', type: INPUT },
        { key: 'startEndDate', value: '整改日期', type: RANGE_PICKER },
        {
          key: 'type',
          value: '制动器状态',
          type: SELECT,
          selectOption: [
            { key: 'RECTIFIED', title: '已整改' },
            { key: 'NOT_RECTIFIED', title: '未整改' }
          ],
          selectOptions: () => {}
        },
        { key: 'orgName', value: '维保单位名称', type: INPUT },
        {
          key: 'activeStatusCode',
          value: '有效性',
          type: SELECT,
          selectOption: [
            { key: '有效', title: '有效' },
            { key: '无效', title: '无效' }
          ],
          selectOptions: () => {}
        },
        {
          key: 'brakesType',
          value: '制动器类型',
          type: SELECT,
          selectOption: [
            { key: 'EM鼓式制动器', title: 'EM鼓式制动器' },
            { key: 'PM鼓式制动器', title: 'PM鼓式制动器' },
            { key: '威特主机', title: '威特主机' }
          ],
          selectOptions: () => {}
        }
      ],
      columns: [
        {
          title: '电梯合同号',
          dataIndex: 'eleContractNo',
          width: '150px',
          customRender: (value, row, index) => ({
            children: <a {...{ on: { click: () => this.toRecord(row) } }}>{value}</a>
          })
        },
        {
          title: '客户名称',
          dataIndex: 'customerName',
          width: '200px',
          customRender: (value, row, index) => ({
            children: (
              <ellipsis length={24} tooltip>
                {value}
              </ellipsis>
            )
          })
        },
        {
          title: '电梯注册编号',
          dataIndex: 'equipRegisterNo',
          width: '200px'
        },
        {
          title: '客户梯号',
          dataIndex: 'eleLocalName',
          width: '100px'
        },
        {
          title: '所属分公司',
          dataIndex: 'branchOrgName',
          width: '150px'
        },
        {
          title: '维保站名称/三方保养单位',
          dataIndex: 'orgName',
          width: '200px'
        },
        {
          title: '制动器状态',
          dataIndex: 'whetherToRectify',
          width: '100px',
          customRender: (value, row, index) => ({
            children: value === 'RECTIFIED' ? '整改' : '未整改'
          })
        },
        {
          title: '整改日期',
          dataIndex: 'finishDate',
          width: '180px'
        },
        {
          title: '下次年检日期',
          dataIndex: 'examinationValidDate',
          width: '180px'
        },
        {
          title: '有效性',
          dataIndex: 'activeStatusCode',
          width: '80px'
        },
        {
          title: '鼓式制动器类型',
          dataIndex: 'brakesType',
          width: '130px'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: '150px'
        }
      ],
      loadData: parameter => {
        console.log(parameter)
        const params = {
          branchOrgName: ''
        }
        if (
          Array.isArray(this.$refs.searchForm.getAllValue().startEndDate) &&
          this.$refs.searchForm.getAllValue().startEndDate.length
        ) {
          params.startDate = moment(this.$refs.searchForm.getAllValue().startEndDate[0]).format(
            'YYYY-MM-DD'
          )
          params.endDate = moment(this.$refs.searchForm.getAllValue().startEndDate[1]).format(
            'YYYY-MM-DD'
          )
        }
        return elevators(
          Object.assign(
            parameter,
            params,
            _.pick(this.$refs.searchForm.getAllValue(), [
              'eleContractNo',
              'type',
              'orgName',
              'brakesType',
              'brakesType'
            ])
          )
        ).then(res => ({
          data: res.result.content,
          page: parameter.page,
          size: parameter.size,
          totalCount: res.result.totalElements
        }))
      }
    }
  },
  methods: {
    toRecord(data) {
      this.$router.push({ name: 'Record', query: { ...data } })
    },
    removeType(eleContractNo) {
      removeTag({ eleContractNo }).then(() => {
        this.$message.success('操作成功')
      })
    }
  }
}
</script>

<style scoped></style>
