<template>
  <div class="logo">
    <router-link :to="{ name: '' }">
      <a-avatar shape="square" :size="56" :src="icon[0]" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: '项目标题',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      icon: [require('@/assets/logo.png')]
    }
  }
}
</script>
