<template>
  <view class="son-footer">
    <button class="previous-btn">
      上一题
    </button>
    <button class="next-btn">
      下一题
    </button>
  </view> >
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.son-footer {
  position: absolute; /* 使用绝对定位 */
  right: 0; /* 确保宽度覆盖整个父组件 */
  bottom: 0; /* 确保在底部 */
  left: 0; /* 确保在左侧 */
  z-index: 10; /* 确保在背景图片上方 */
  display: flex; /* 使用flex布局 */
  justify-content: space-between; /* 按钮之间均匀分布 */
  padding: 10px; /* 内边距 */
  background-color: #f9f9f9; /* 可选的背景色 */
  border-top: 1px solid #e0e0e0; /* 可选的边框 */
}
</style>
