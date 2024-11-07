<template>
  <!-- 资讯列表 -->
  <view class="animate__animated animate__fadeInLeft animate__fast course-list">
    <!-- 图片 -->
    <image class="course-image" mode="widthFix" :src="item.img" lazy-load @click="goDetail()" />
    <!-- 标题 -->
    <view class="course-title my-10 w-100 text-32" @click="goDetail()">
      {{ item.title }}
    </view>
    <button class="course-button" :style="{ backgroundColor: colorList[item.learn_record] }" @click="goDetail()">
      {{ recordList[item.learn_record] }}
    </button>
  </view>
</template>

<script lang="ts" setup>
import type { ChapterItem } from '@/api/guide/types'

const props = defineProps<{
  item: ChapterItem;
  index: number;
}>()

const colorList = ['#dc5095', '#eb921a', '#5bba51']
const recordList = ['开始学习', '已学习', '学习中']

const goDetail = () => {
  uni.navigateTo({
    url: `/pages/tab/guide/subpages/chapter/index?chapterId=${props.item.chapter_id}`,
  })
}
</script>

<style lang="scss" scoped>
.course-list {
  @apply flex relative m-x-40rpx m-y-25rpx p-20rpx rounded-20rpx bg-#f2f3f5;

  .course-title {
    @apply m-l-20rpx font-bold text-4;
  }

  .course-button {
    @apply absolute p-0 bottom-3 right-5 w-150rpx h-60rpx text-25rpx c-white border-none rounded-45rpx;
  }
}
</style>
