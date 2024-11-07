<template>
  <view class="knowledge">
    <up-navbar
      placeholder
      @left-click="goBack"
    >
      <template #center>
        <view class="m-r-100rpx flex items-center">
          <view class="m-r-20rpx font-bold">
            {{
              currentIndex < 10 ? `0${currentIndex}` : currentIndex
            }}/{{ knowledgeList.length < 10 ? `0${knowledgeList.length}` : knowledgeList.length }} 页
          </view>
          <view class="w-45vw">
            <up-line-progress :percentage="currentIndex / knowledgeList.length * 100" :show-text="false" />
          </view>
        </view>
      </template>
    </up-navbar>
    <view class="knowledge-title text-center">
      <text class="text-40rpx font-bold">
        {{ sectionTitle }}
      </text>
    </view>
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
      <view class="knowledge-btn">
        <button class="m-l-150rpx" @click="changePage(-1)">
          上一页
        </button>
        <button class="m-r-150rpx" @click="changePage(1)">
          {{ currentIndex === knowledgeList.length ? '完成' : '下一页' }}
        </button>
      </view>
    </view>
    <up-popup
      :show="showPopup"
      :round="10" mode="center"
      :close-on-click-overlay="false"
    >
      <view class="custom-popup">
        <div class="close-icon i-mdi:close text-35rpx" @click="close" />
        <text class="m-x-20rpx m-t-80rpx text-center text-30rpx">
          恭喜你完成了本节知识的学习！点击继续即刻进入下一节。
        </text>
        <view class="custom-popup-btn">
          <button class="m-l-50rpx" @click="goBack">
            退出
          </button>
          <button class="m-r-50rpx" @click="goNext">
            继续
          </button>
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script lang='ts' setup>
import { postSectionDetail } from '@/api/guide'
import type { KnowledgeList } from '@/api/guide/types'
import useGuideStore from '@/store/modules/guide'

const chapterId = ref<number>(0)
const sectionId = ref<number>(0)
onLoad((options: any) => {
  chapterId.value = options.chapterId
  sectionId.value = options.sectionId
})

const sectionTitle = ref<string>('')
const knowledgeList = ref<KnowledgeList>([])
onMounted(async () => {
  const res = await postSectionDetail({ section_id: sectionId.value })
  sectionTitle.value = res.title
  knowledgeList.value = res.list
})

const currentIndex = ref<number>(1)
const showPopup = ref<boolean>(false)

const close = () => {
  showPopup.value = false
}

const changePage = (step: number) => {
  if (step === 1 && currentIndex.value === knowledgeList.value.length) {
    showPopup.value = true
    return
  }
  if (step === -1 && currentIndex.value === 1) {
    uni.$u.toast('已经是第一页了')
    return
  }
  currentIndex.value += step
}

const goBack = () => {
  uni.navigateTo({
    url: `/pages/tab/guide/subpages/chapter/index?chapterId=${chapterId.value}`,
  })
}

const guideStore = useGuideStore()
const goNext = () => {
  guideStore.getNextSection(chapterId.value, sectionId.value)
  console.log(guideStore.chapterToSection)
  uni.navigateTo({
    url: `/pages/tab/guide/subpages/knowledge/index?chapterId=${chapterId.value}&sectionId=${sectionId.value}`,
  })
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

    .knowledge-btn {
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

  .custom-popup {
    position: relative;
    display: flex;
    align-items: center;
    width: 450rpx;
    height: 350rpx;
    flex-direction: column;

    .close-icon {
      position: absolute; /* 绝对定位 */
      top: 10rpx; /* 距离顶部的距离，可根据需要调整 */
      right: 10rpx; /* 距离右侧的距离，可根据需要调整 */
      cursor: pointer; /* 设置鼠标悬停时的样式 */
    }

    .custom-popup-btn {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;

      button {
        @apply flex justify-center items-center text-20rpx border-none bg-#22BF57 c-white rounded-20rpx h-70rpx w-130rpx;
      }
    }
  }

}
</style>
