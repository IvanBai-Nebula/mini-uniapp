<template>
  <view :style="{ minHeight: `${minHeight}px`, overflowY: 'auto' }">
    <start-page v-if="pageVisible" @visible-change="visibleChange" />
    <login-register v-else />
  </view>
</template>

<script setup lang="ts">
import { useScreenHeight } from '@/utils'

const { minHeight } = useScreenHeight() // 获取屏幕高度
const pageVisible: Ref<boolean> = ref(true) // 页面可见性状态

// 更新页面可见性
const visibleChange = (value: boolean) => {
  pageVisible.value = value // 更新页面可见性
}
</script>
