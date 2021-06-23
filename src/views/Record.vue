<template>
  <a-card>
    <a-timeline v-if="records.length">
      <a-timeline-item v-for="(item, index) in records" :key="index">
        <div
          style="display: flex; flex-direction: row; justify-content: space-between; align-items: center"
        >
          <p>{{ item.executeDate + ' ~ ' + item.finishDate }}</p>
          <a-button
            v-if="item.objectStatusCode === 'VALID'"
            type="primary"
            @click="invalid(item.id)"
            >作废</a-button
          >
          <a-button v-if="item.objectStatusCode === 'INVALID'" type="danger">已作废</a-button>
        </div>
        <p>保养人员：{{ item.createdByName }}</p>
        <p>作业类型：{{ item.recType === 'CJBY' ? '拆解保养' : '电磁组件更换' }}</p>
        <p>电梯产品合同号-梯号：{{ item.eleContractNo }}</p>
        <p>电梯注册编号：{{ item.equipRegisterNo }}</p>
        <a-upload
          list-type="picture-card"
          :file-list="item.list"
          @preview="handlePreview"
          :remove="() => false"
        >
        </a-upload>
        <p>问题描述：{{ item.remark }}</p>
      </a-timeline-item>
    </a-timeline>
    <a-empty v-else />
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </a-card>
</template>

<script>
import { brakesInvalid, getRecord } from '../api/api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
export default {
  name: 'Record',
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      records: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      if (this.$route.query && this.$route.query.eleContractNo) {
        const { eleContractNo } = this.$route.query
        getRecord({ eleContractNo, recType: 'ZGJL' }).then(res => {
          console.log(res)
          res.result.forEach(item => {
            item.list.forEach(item2 => {
              item2.uid = item2.aid
              item2.status = 'done'
            })
          })
          this.records = res.result
        })
      }
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    invalid(id) {
      brakesInvalid({ id }).then(() => {
        this.$message.success('操作成功')
        this.initData()
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .anticon-delete {
  display: none;
}
</style>
