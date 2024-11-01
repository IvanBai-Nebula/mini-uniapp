<template>
  <view class="nav-bar" :style="getSlotStyle">
    <slot name="default">
      <view>
        默认插槽内容
      </view>
    </slot>
  </view>
</template>

<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
console.log(safeAreaInsets)

function getSlotStyle() {
  return {
    paddingTop: `${safeAreaInsets!.top + 10}px`,
  }
}
</script>

<style scoped lang="scss">
.nav-bar {
  @apply relative h-12vh w-full bg-cover bg-center bg-no-repeat;

  background-image: url("https://care-daily-1318382758.cos.ap-shanghai.myqcloud.com/nav-bg.jpg?versionId=MTg0NDUwMTM2MjQzMDYyNDM1ODU");
}
</style>
