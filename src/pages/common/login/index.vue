<template>
  <StartPage v-if="pageVisible" @visible-change="visibleChange" />
  <LoginRegister v-else />
</template>

<script setup lang="ts">
import StartPage from './components/StartPage/index.vue'
import LoginRegister from './components/LoginRegister/index.vue'

const pageVisible: Ref<boolean> = ref(true) // 页面可见性状态

// 更新页面可见性
const visibleChange = (value: boolean) => {
  pageVisible.value = value // 更新页面可见性
}
</script>
