<template>
  <view class="son-top">
    <button class="exit-button" @click="confirmExit">
      X
    </button>
    <text class="timer">
      {{ formattedTime }}
    </text>
  </view>
</template>

<script setup lang="ts">
const timeElapsed = ref(0)
const formattedTime = ref('00:00')

// 格式化时间
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`
}

function confirmExit() {
  uni.showModal({
    title: '退出确认',
    content: '是否要退出当前答题？',
    success(res) {
      if (res.confirm) uni.navigateBack()
    },
  })
}

onMounted(() => {
  setInterval(() => {
    timeElapsed.value += 1
    formattedTime.value = formatTime(timeElapsed.value)
  }, 1000)
})
</script>

<style scoped lang="scss">
.son-top {
  position: absolute; /* 使用绝对定位 */
  top: 0; /* 确保在顶部 */
  right: 0; /* 确保宽度覆盖整个父组件 */
  left: 0; /* 确保在左侧 */
  z-index: 10; /* 确保在背景图片上方 */
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 水平分散对齐 */
  align-items: center; /* 垂直居中 */
  padding: 10px; /* 内边距 */
  background-color: rgb(255 255 255 / 80%);
}/* 可选: 设置半透明背景 */

.exit-button {
  font-size: 24px;
  color: red;
  background: none; /* 去掉默认背景 */
  border: none; /* 去掉边框 */
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
}

.progress-bar {
  flex: 1; /* 使进度条占用剩余空间 */
  margin: 0 10px; /* 添加左右间距 */
}

.timer {
  font-size: 16px;
  color: #333;
}
</style>
