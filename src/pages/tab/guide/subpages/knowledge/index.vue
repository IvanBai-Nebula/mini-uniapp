<template>
  <view class="knowledge">
    <up-navbar
      placeholder
      :auto-back="true"
    >
      <template #center>
        <view class="m-r-100rpx flex items-center">
          <view class="m-r-20rpx font-bold">
            {{
              currentIndex < 10 ? `0${currentIndex}` : currentIndex
            }}/{{ knowledgeList.length < 10 ? `0${knowledgeList.length}` : knowledgeList.length }} 页
          </view>
          <view class="w-45vw">
            <up-line-progress :percentage="30" :show-text="false" />
          </view>
        </view>
      </template>
    </up-navbar>
    <view class="knowledge-content">
      <view class="knowledge-img">
        <img
          style="max-width: 100%;max-height: 600rpx"
          :src="knowledgeList[currentIndex - 1].img[0]"
          alt="cover"
        >
      </view>
      <view
        class="flex justify-center"
      >
        <up-line
          margin="40rpx"
        />
      </view>
      <view class="knowledge-text">
        <u-cell-group
          :border="false"
        >
          <u-cell
            v-for="(item, index) in knowledgeList[currentIndex - 1].content"
            :key="index"
            :border="false"
          >
            <template #label>
              <div class="i-mdi:dot text-40rpx" />
              <text>{{ item }}</text>
            </template>
          </u-cell>
        </u-cell-group>
      </view>
      <view class="knowledge-footer">
        <button class="m-l-150rpx" @click="changePage(-1)">
          上一页
        </button>
        <button class="m-r-150rpx" @click="changePage(1)">
          下一页
        </button>
      </view>
    </view>
  </view>
</template>

<script lang='ts' setup>
import { postSectionDetail } from '@/api/guide'
import type { KnowledgeList } from '@/api/guide/types'

const sectionId = ref<number>(0)
onLoad((options: any) => {
  sectionId.value = options.chapterId
})
const knowledgeList = ref<KnowledgeList>([])
onMounted(async () => {
  knowledgeList.value = await postSectionDetail({ section_id: sectionId.value })
})
const currentIndex = ref<number>(1)

function changePage(step: number) {
  if (step === 1 && currentIndex.value === knowledgeList.value.length) {
    return
  }
  if (step === -1 && currentIndex.value === 1) {
    return
  }
  currentIndex.value += step
}
</script>

<style lang='scss' scoped>
.knowledge {
  .knowledge-content {
    .knowledge-img {
      display: flex;
      justify-content: center;
      margin-top: 50rpx;
    }

    .knowledge-text {
      @apply m-x-40rpx text-30rpx;
    }

    .knowledge-footer {
      position: fixed;
      right: 0; /* 确保宽度覆盖整个视口 */
      bottom: 7%;
      left: 0; /* 确保从左侧开始 */
      display: flex;
      justify-content: space-between;

      button {
        @apply flex justify-center items-center text-20rpx border-none bg-#22BF57 c-white rounded-20rpx h-70rpx w-130rpx;
      }
    }
  }
}
</style>
