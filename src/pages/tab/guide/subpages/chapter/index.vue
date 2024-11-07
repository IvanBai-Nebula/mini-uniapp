<template>
  <view class="course-detail">
    <u-navbar-mini
      :auto-back="true"
      bg-color="transparent"
    >
      <template #left>
        <up-icon
          name="arrow-left"
          size="18"
          color="black"
        />
      </template>
    </u-navbar-mini>
    <image
      class="course-detail-bg"
      src="https://care-daily-test-1318382758.cos.ap-shanghai.myqcloud.com/course-detail-bg.jpg"
    />
    <view class="course-detail-card">
      <text class="course-detail-title">
        {{ title }}
      </text>
      <view class="course-detail-info flex">
        <view v-show="watchedNum !== undefined">
          <div class="i-mdi:account-multiple-outline font-size-35rpx" />
          <text class="number m-l-20rpx m-r-40rpx">
            {{ ((watchedNum ? watchedNum : 0) / 1000).toFixed(1) }}k
          </text>
        </view>
        <view v-show="thumbNum !== undefined">
          <div class="i-mdi:thumb-up-outline font-size-33rpx" />
          <text class="rate m-l-20rpx">
            {{ ((thumbNum ? thumbNum : 0) / 1000).toFixed(1) }}分
          </text>
        </view>
      </view>
      <view class="course-detail-desc">
        <text class="font-size-36rpx">
          课程简介
        </text>
        <text class="m-t-20rpx leading-normal">
          {{ des }}
        </text>
      </view>
    </view>
    <view class="course-detail-content">
      <u-sticky>
        <up-tabs
          :list="tabList"
          :current="tabIndex"
          line-color="#dc5095"
          :active-style="{ color: '#dc5095' }"
          :inactive-style="{ color: '#d0d1d9' }"
          line-width="30"
          :scrollable="false"
          @change="changeTab"
        />
      </u-sticky>
      <view v-if="tabIndex === 0">
        <u-list>
          <u-list-item
            v-for="(item, index) in sectionList"
            :key="index"
          >
            <u-cell
              :title="item.title"
              :border="false"
              :custom-style="{ height: '120rpx' }"
            >
              <template #icon>
                {{ index < 10 ? `0${index + 1}` : index + 1 }}
              </template>
              <template #label>
                <view class="m-t-20rpx flex font-size-30rpx c-#d0d1d9">
                  <div class="i-mdi:eye-outline" />
                  <text v-show="item.watched_num !== undefined" class="m-l-10rpx m-r-30rpx font-size-25rpx">
                    {{ ((item.watched_num ? item.watched_num : 0) / 1000).toFixed(1) }}k
                  </text>
                </view>
              </template>
              <template #value>
                <button
                  class="course-btn"
                  :style="{ backgroundColor: colorList[item.learn_record] }"
                  @click="goSection(item)"
                >
                  {{ recordList[item.learn_record] }}
                </button>
              </template>
            </u-cell>
          </u-list-item>
        </u-list>
      </view>
      <view v-if="tabIndex === 1" class="m-t-40rpx flex items-center justify-center">
        <video
          :src="video"
          :page-gesture="true"
          :show-loading="true"
          :enable-progress-gesture="true"
          :show-mute-btn="true"
          :enable-play-gesture="true"
        />
      </view>
      <view v-if="tabIndex === 2" class="m-x-20rpx m-t-40rpx flex flex-col items-center justify-center">
        <text class="quiz-text">
          完成了前面的学习快来进行简单的巩固测试吧，完成测试后将计入学习排行榜，与同学们一起分享学习心得!
        </text>
        <button class="quiz-btn" @click="goQuiz">
          开始测试
        </button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Section } from '@/api/guide/types'
import { postChapterDetail } from '@/api/guide'
import useGuideStore from '@/store/modules/guide'

const chapterId = ref<number>(0)
onLoad((options: any) => {
  chapterId.value = options.chapterId
})

const title = ref<string>('')
const sectionList = ref<Array<Section>>([])
const video = ref<string>('')
const quizSetId = ref<number>(0)
const des = ref<string>('')
const watchedNum = ref<number | undefined>(0)
const thumbNum = ref<number | undefined>(0)

onMounted(async () => {
  const res = await postChapterDetail({ chapter_id: chapterId.value })
  title.value = res.title
  sectionList.value = res.list
  video.value = res.video
  quizSetId.value = res.quiz_set_id
  des.value = res.des
  watchedNum.value = res.watched_num
  thumbNum.value = res.thumb_num
})

const colorList = ['#dc5095', '#eb921a', '#5bba51']
const recordList = ['开始学习', '已学习', '学习中']

const tabList = reactive([
  { name: '知识要点' },
  { name: '教学视频' },
  { name: '巩固测试' },
])
const tabIndex = ref<number>(0)

const changeTab = (item: { index: number }) => {
  tabIndex.value = item.index
}

const guideStore = useGuideStore()
const goSection = (item: any) => {
  guideStore.addChapterToSection({ chapterId: chapterId.value, sectionIdList: sectionList.value.map((section: Section) => section.section_id) })
  uni.navigateTo({
    url: `/pages/tab/guide/subpages/knowledge/index?chapterId=${chapterId.value}&sectionId=${item.section_id}`,
  })
}

const goQuiz = () => {
  uni.navigateTo({
    url: `/pages/tab/guide/subpages/quiz/index?quizSetId=${quizSetId.value}`,
  })
}
</script>

<style lang="scss">
page > view > view > view > view.u-navbar-mini__content.data-v-128ec6da {
  padding: 0 !important;

  view.u-navbar-mini__content__left.data-v-128ec6da > view > text {
    font-weight: bold !important;
    margin-bottom: 20rpx !important;
  }
}
</style>

<style lang="scss">
.course-detail {
  position: relative;
  background-color: white;

  .course-detail-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 55vh;
    object-fit: cover;
  }

  .course-detail-card {
    position: fixed; /* 使用绝对定位 */
    top: 30%; /* 距离顶部 40% */
    z-index: 1; /* 确保在背景之上 */
    width: 100%; /* 宽度 */
    height: 40vh;
    color: white;
    background-color: #FFCDA1;
    border-radius: 60rpx;

    .course-detail-title {
      position: fixed; /* 使用绝对定位 */
      margin-top: 30rpx;
      margin-left: 40rpx;
      font-size: 36rpx;
      text-align: center;
      font-weight: bold;
    }

    .course-detail-info {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100rpx;
      margin-left: 40rpx;
    }

    .course-detail-desc {
      position: fixed;
      display: flex;
      justify-content: center;
      margin-top: 180rpx;
      margin-right: 40rpx;
      margin-left: 40rpx;
      flex-direction: column;
    }
  }

  .course-detail-content {
    position: fixed;
    top: 56%;
    z-index: 2;
    overflow-y: auto;
    width: 100%;
    height: 44vh;
    color: black;
    background-color: white;
    border-radius: 60rpx 60rpx 0 0;

    .u-list {
      height: 600rpx !important;

      ::v-deep .u-cell {
        .u-cell__left-icon-wrap {
          margin-right: 30rpx !important;
          font-size: 40rpx !important;
          color: #d0d1d9 !important;
        }

        .u-cell__label {
          color: #d0d1d9 !important;
        }
      }

      .course-btn {
        @apply m-t-20rpx m-r-20rpx h-60rpx w-130rpx p-0 font-size-25rpx c-white rounded-45rpx line-height-60rpx ;
      }
    }

    .quiz-text {
      @apply m-x-40rpx font-size-30rpx leading-5 tracking-5rpx;
    }

    .quiz-btn {
      @apply fixed bottom-7vh m-x-40rpx h-60rpx w-130rpx p-0 bg-#dc5095 c-white font-size-25rpx rounded-45rpx line-height-60rpx ;
    }

  }
}
</style>
