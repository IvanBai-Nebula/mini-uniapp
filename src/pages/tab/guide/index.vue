<template>
  <custom-nav>
    <template #default>
      <view class="guide-title" :style="{ paddingTop: `${(safeAreaInsets!.top === 47 ? 40 : safeAreaInsets!.top) + 10}px` }">
        照护指导
      </view>
    </template>
  </custom-nav>
  <view />
  <up-tabs
    :list="tabs"
    line-width="30"
    line-color="#dc5095"
    :active-style="{
      color: '#303133',
      fontWeight: 'bold',
      transform: 'scale(1.05)',
    }"
    :inactive-style="{
      color: '#606266',
      transform: 'scale(1)',
    }"
    item-style="height: 34px;flex:1;"
    @change="handleChange"
  />
  <ContentList :category="activeIndex" />
</template>

<script setup lang="ts">
import ContentList from './components/ContentList/index.vue'
import { getTabs } from '@/api/guide'
import type { TabItem } from '@/api/guide/types'

const tabs = ref<TabItem[]>([])
const activeIndex = ref<number>()
onMounted(async () => {
  const res = await getTabs()
  tabs.value = res.tabs // 将新数据更新到已有的响应式数组中
  activeIndex.value = tabs.value[0].index // 默认选中第一个标签
})
const { safeAreaInsets } = uni.getSystemInfoSync()

const handleChange = (index: object) => {
  activeIndex.value = index.index
}
</script>

<style lang='scss' scoped>
.guide-title {
  @apply pl-50rpx text-6 font-bold;
}
</style>
