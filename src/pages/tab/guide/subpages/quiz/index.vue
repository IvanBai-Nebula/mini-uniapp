<template>
  <view class="quiz">
    <up-navbar

      auto-back placeholder
    >
      <template #center>
        <view class="m-r-100rpx flex">
          <view class="m-r-20rpx font-bold">
            {{
              currentIndex < 10 ? `0${currentIndex}` : currentIndex
            }}/{{ quizList.length < 10 ? `0${quizList.length}` : quizList.length }} 题
          </view>
          <view class="w-45vw">
            <up-line-progress :percentage="currentIndex / quizList.length * 100" :show-text="false" />
          </view>
        </view>
      </template>
    </up-navbar>
    <view class="quiz-content">
      <view class="m-b-80rpx flex items-center">
        <text class="quiz-type">
          单选题
        </text>
        <text class="quiz-question">
          题目：{{ quizList[currentIndex - 1].question }} &nbsp;(&nbsp;&nbsp;&nbsp;&nbsp;)
        </text>
      </view>

      <view class="quiz-options">
        <view
          v-for="(option, index) in quizList[currentIndex - 1].options"
          :key="index"
          class="custom-option"
        >
          <text class="m-l-40rpx">
            {{ convertNumToLetters(option.opt_num) }}、
          </text>
          <text>
            {{ option.answer }}
          </text>
        </view>
      </view>
      <view class="quiz-btn">
        <button class="m-l-150rpx" @click="changeQuiz(-1)">
          上一题
        </button>
        <button class="m-r-150rpx" @click="changeQuiz(1)">
          {{ currentIndex === quizList.length ? '完成' : '下一题' }}
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
          恭喜你完成了本节知识的练习题！点击完成返回课程章节页。
        </text>
        <view class="custom-popup-btn">
          <button @click="goBack">
            完成
          </button>
        </view>
      </view>
    </up-popup>
  </view>
</template>

<script lang='ts' setup>
import { postQuizSet } from '@/api/guide'
import type { QuizList } from '@/api/guide/types'

const QuizSetId = ref<number>(0)
onLoad((options: any) => {
  QuizSetId.value = options.chapterId
})

const quizList = ref<QuizList>([])
onMounted(async () => {
  const res = await postQuizSet({ quiz_set_id: QuizSetId.value })
  quizList.value = res.list
})

const currentIndex = ref<number>(1)
const showPopup = ref<boolean>(false)

const convertNumToLetters = (num: number): string | undefined => {
  const mapping: { [key: number]: string } = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
  }
  return mapping[num] // 可以直接返回
}

const close = () => {
  showPopup.value = false
}

const changeQuiz = (step: number) => {
  if (step === 1 && currentIndex.value === quizList.value.length) {
    showPopup.value = true
    return
  }
  if (step === -1 && currentIndex.value === 1) {
    uni.$u.toast('已经是第一题了')
    return
  }
  currentIndex.value += step
}

const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang='scss' scoped>
.quiz {
  .quiz-content {
     @apply m-t-60rpx m-x-40rpx;

    .quiz-type {
      @apply flex justify-center items-center h-50rpx w-100rpx text-25rpx font-bold c-white bg-#22BF57  rounded-tr-20rpx rounded-bl-20rpx;
    }

    .quiz-question {
      @apply m-l-20rpx text-30rpx w-70vw;
    }

    .quiz-options {
      @apply m-x-40rpx text-30rpx;

      .custom-option {
        @apply m-y-50rpx flex items-center text-30rpx h-110rpx w-80vw rounded-10rpx bg-#F4F5F7;
      }
    }

    .quiz-btn {
      position: fixed;
      right: 0; /* 确保宽度覆盖整个视口 */
      bottom: 7%;
      left: 0; /* 确保从左侧开始 */
      display: flex;
      justify-content: space-between;

      button {
        @apply flex justify-center items-center text-25rpx border-none bg-#22BF57 c-white rounded-20rpx h-70rpx w-130rpx;
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
      bottom: 0;
      display: flex;
      justify-content: center;

      button {
        @apply flex justify-center items-center text-25rpx border-none bg-#22BF57 c-white rounded-20rpx h-70rpx w-130rpx;
      }
    }
  }

}
</style>
