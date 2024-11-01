<template>
  <view class="son-footer">
    <view class="SonFooter">
      <!-- 正在回答的题目号 -->
      <text>正在回答:</text><br>
      <text class="question-number">
        {{ currentQuestion }}/{{ totalQuestions }}
      </text>
    </view>

    <button class="previous-btn" @click="back()">
      上一题
    </button>
    <button class="next-btn" @click="next()">
      下一题
    </button>
  </view> >
</template>

<script setup lang="ts">
// 当前题目号和总题目数
const currentQuestion = ref(8) // 当前题目，示例值
const totalQuestions = ref(24) // 总题目数，示例值
function back() {
  // 跳转到上一题
  console.log('back')
  uni.showToast({
    title: '已跳转到上一题',
    icon: 'none', // 不显示图标
    duration: 1000, // 持续时间
  })
}

function next() {
  // 跳转到下一题
  console.log('next')
  uni.showToast({
    title: '已跳转到下一题',
    icon: 'none', // 不显示图标
    duration: 1000, // 持续时间
  })
}
</script>

<style scoped lang="scss">
.son-footer {
  position: relative; /* 使用绝对定位 */
  right: 0; /* 确保宽度覆盖整个父组件 */
  bottom: -230px; /* 确保在底部 */
  left: 0; /* 确保在左侧 */
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 按钮之间均匀分布 */
  padding: 10px; /* 内边距 */
  background-color: #f9f9f9; /* 可选的背景色 */
  border-top: 1px solid #e0e0e0; /* 可选的边框 */
}

.question-number {
  font-size: 16px;
}
</style>
