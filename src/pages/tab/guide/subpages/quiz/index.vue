<!--<template>-->
<!--  <custom-nav>-->
<!--    <view class="top-container">-->
<!--      <text class="i-mdi:close h-45rpx w-45rpx text-#1C234C" />-->
<!--      <view class="abv">-->
<!--        {{ current < 10 ? `0${current}` : current }}/{{ total }}题-->
<!--      </view>-->
<!--      <view style="width: 40%;">-->
<!--        <up-line-progress :percentage="`${percentageCurrent}`" :show-text="false" />-->
<!--      </view>-->
<!--    </view>-->
<!--  </custom-nav>-->

<!--  <view class="question-container">-->
<!--    <view class="question-type">-->
<!--      单选题-->
<!--    </view>-->
<!--    <view class="question-content">-->
<!--      {{ currentQuestion.question }}-->
<!--    </view>-->
<!--    <view class="options">-->
<!--      <view-->
<!--        v-for="(option, index) in currentQuestion.options"-->
<!--        :key="index"-->
<!--        class="option-item"-->
<!--        :class="{ selected: selectedOption === index }"-->
<!--        @click="selectOption(index)"-->
<!--      >-->
<!--        {{ option.option }}  {{ option.answer }}-->
<!--      </view>-->
<!--    </view>-->
<!--  </view>-->
<!--  <view class="son-footer">-->
<!--    <button class="previous-btn" @click="back()">-->
<!--      上一题-->
<!--    </button>-->
<!--    <button class="next-btn" @click="next()">-->
<!--      下一题-->
<!--    </button>-->
<!--  </view>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { postQuiz } from '@/api/guide'-->
<!--import type { QuizResult } from '@/api/guide/types'-->
<!--import { useLoading } from '@/hooks'-->

<!--const quizSet = ref<number>(0)-->

<!--onLoad((option) => {-->
<!--  // 获取传参-->
<!--  quizSet.value = option?.quizSet-->
<!--})-->

<!--// const props = defineProps({-->
<!--//   quizSet: {-->
<!--//     type: Number,-->
<!--//     required: true,-->
<!--//   },-->
<!--// })-->

<!--const quizList = ref<QuizResult>({-->
<!--  title: '',-->
<!--  description: '',-->
<!--  img: '',-->
<!--  questions: [],-->
<!--})-->

<!--onMounted(async () => {-->
<!--  useLoading().showLoading()-->
<!--  // 获取题目列表-->
<!--  setTimeout(async () => {-->
<!--    const { title, des, img, list } = await postQuiz({ quiz_set: quizSet.value })-->
<!--    quizList.value = { title, des: description, img, list }-->
<!--    useLoading().hideLoading()-->
<!--  }, 500)-->
<!--})-->

<!--// const questions = ref([-->
<!--//   {-->
<!--//     content: '如果擎天柱看到4S店会想到什么？（ ）',-->
<!--//     options: [-->
<!--//       { label: 'A、这里是汽车人游乐园', value: 'A' },-->
<!--//       { label: 'B、我们在贩卖人口', value: 'B' },-->
<!--//       { label: 'C、这里是变形金刚聚集地', value: 'C' },-->
<!--//       { label: 'D、这里是人民公园相亲角', value: 'D' },-->
<!--//     ],-->
<!--//   },-->
<!--//   {-->
<!--//     content: '变形金刚中最喜欢的角色是谁？（ ）',-->
<!--//     options: [-->
<!--//       { label: 'A、大黄蜂', value: 'A' },-->
<!--//       { label: 'B、擎天柱', value: 'B' },-->
<!--//       { label: 'C、光头强', value: 'C' },-->
<!--//       { label: 'D、何炅（邪恶栀子花版）', value: 'D' },-->
<!--//     ],-->
<!--//   },-->
<!--//   {-->
<!--//     content: '上海最好的大学是？（ ）',-->
<!--//     options: [-->
<!--//       { label: 'A、上海外国语大学', value: 'A' },-->
<!--//       { label: 'B、SISU', value: 'B' },-->
<!--//       { label: 'C、上外', value: 'C' },-->
<!--//       { label: 'D、Shanghai International Studys University ', value: 'D' },-->
<!--//     ],-->
<!--//   },-->
<!--//   {-->
<!--//     content: '中国最好的大学是？（ ）',-->
<!--//     options: [-->
<!--//       { label: 'A、上海外国语大学', value: 'A' },-->
<!--//       { label: 'B、SISU', value: 'B' },-->
<!--//       { label: 'C、上外', value: 'C' },-->
<!--//       { label: 'D、Shanghai International Studys University ', value: 'D' },-->
<!--//     ],-->
<!--//   },-->
<!--//   {-->
<!--//     content: '世界最好的大学是？（ ）',-->
<!--//     options: [-->
<!--//       { label: 'A、上海外国语大学', value: 'A' },-->
<!--//       { label: 'B、SISU', value: 'B' },-->
<!--//       { label: 'C、上外', value: 'C' },-->
<!--//       { label: 'D、Shanghai International Studys University ', value: 'D' },-->
<!--//     ],-->
<!--//   },-->
<!--//   // 添加更多题目-->
<!--// ])-->
<!--// 当前题目号和总题目数-->
<!--const current = ref(1)-->
<!--const total = computed(() => quizList.value.questions.length)-->

<!--// 获取当前题目的数据-->
<!--const currentQuestion = computed(() => {-->
<!--  return quizList.value.questions[current.value - 1]-->
<!--})-->

<!--const selectedOption = ref<number | null>(null) // 存储当前选中的选项的索引-->
<!--function selectOption(index: number) {-->
<!--  selectedOption.value = index-->
<!--}-->

<!--function back() { // 上一题的方法-->
<!--  if (current.value > 1) {-->
<!--    uni.showToast({-->
<!--      title: '已跳转到上一题',-->
<!--      icon: 'none', // 不显示图标-->
<!--      duration: 1000, // 持续时间-->
<!--    })-->
<!--    current.value&#45;&#45;-->
<!--    selectedOption.value = null // 重置选中的选项-->
<!--  }-->
<!--  else {-->
<!--    uni.showToast({-->
<!--      title: '这已经是第一题啦',-->
<!--      icon: 'none', // 不显示图标-->
<!--      duration: 1000, // 持续时间-->
<!--    })-->
<!--  }-->
<!--}-->
<!--// 下一题的方法-->
<!--function next() {-->
<!--  if (current.value < total.value) {-->
<!--    uni.showToast({-->
<!--      title: '已跳转到下一题',-->
<!--      icon: 'none', // 不显示图标-->
<!--      duration: 1000, // 持续时间-->
<!--    })-->
<!--    current.value++-->
<!--    selectedOption.value = null // 重置选中的选项-->
<!--  }-->
<!--  else {-->
<!--    uni.showToast({-->
<!--      title: '这已经是最后一题啦',-->
<!--      icon: 'none', // 不显示图标-->
<!--      duration: 1000, // 持续时间-->
<!--    })-->
<!--  }-->
<!--}-->

<!--const percentageCurrent = computed(() => Math.round((current.value / total.value) * 100))-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.nav-bar {-->
<!--  position: relative;-->
<!--  display: flex; /* 使用flex布局以便更好控制子组件 */-->
<!--  flex-direction: column; /* 让子组件纵向排列 */-->
<!--  align-items: stretch; /* 让子组件占满整个宽度 */-->

<!--  .content {-->
<!--    position: relative;-->
<!--    z-index: 1; /* 设置子组件在背景图片之上 */-->
<!--  }-->

<!--  .bg {-->
<!--    .bg-img {-->
<!--      @apply w-full;-->

<!--      position: absolute; /* 设置为绝对定位 */-->
<!--      top: 0; /* 从顶端开始 */-->
<!--      z-index: -1;-->
<!--      height: 30%;-->
<!--      object-fit: cover; /* 图片自适应覆盖 */-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.son-footer {-->
<!--  position: fixed; /* 使用固定定位 */-->
<!--  right: 0; /* 确保宽度覆盖整个父组件 */-->
<!--  bottom: 0; /* 固定在底部 */-->
<!--  left: 0; /* 确保在左侧 */-->
<!--  display: flex; /* 使用flex布局 */-->
<!--  justify-content: space-between; /* 按钮之间均匀分布 */-->
<!--  padding: 10px; /* 内边距 */-->
<!--  background-color: #f9f9f9; /* 可选的背景色 */-->
<!--  border-top: 1px solid #e0e0e0; /* 可选的边框 */-->
<!--}-->

<!--.question-number {-->
<!--  font-size: 16px;-->
<!--}-->

<!--.question-container {-->
<!--  padding: 20px;-->
<!--  background-color: rgb(255 255 255);-->
<!--}-->

<!--.question-type {-->
<!--  display: inline-block;-->
<!--  padding: 5px 10px;-->
<!--  margin-bottom: 10px;-->
<!--  color: #fff;-->
<!--  background-color: #23a455;-->
<!--  border-radius: 5px;-->
<!--}-->

<!--.question-content {-->
<!--  margin-bottom: 20px;-->
<!--  font-size: 18px;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.options {-->
<!--  display: flex;-->
<!--  padding-top: 20px;-->
<!--  flex-direction: column;-->
<!--  gap: 10px;-->
<!--}-->

<!--.option-item {-->
<!--  padding: 15px;-->
<!--  font-size: 16px;-->
<!--  color: #333;-->
<!--  background: rgb(244 245 247 / 100%);-->
<!--  border: 1px solid #e0e0e0;-->
<!--  border-radius: 5px;-->
<!--  transition: background-color 0.3s;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.option-item.selected {-->
<!--  background-color: #e6f7ff;-->
<!--  border-color: #1890ff;-->
<!--}-->

<!--.option-item:hover {-->
<!--  background-color: #f5f5f5;-->
<!--}-->

<!--.top-container {-->
<!--  @apply pt-13 pl-3 flex-->
<!--}-->
<!--</style>-->
