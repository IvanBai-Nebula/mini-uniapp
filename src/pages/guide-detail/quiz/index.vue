<template>
  <!--  <view class="nav-bar" :style="{ paddingTop: `${safeAreaInsets?.top || 0}px` }"> -->
  <!--    <SonTop /> -->
  <!--    <SonBody /> -->
  <!--    <SonFooter /> -->
  <!--    <view class="bg"> -->
  <!--      <image class="bg-img" src="@/static/images/top-bar.png" /> -->
  <!--    </view> -->
  <!--  </view> -->
  <custom-nav />
</template>

<script setup lang="ts">
// const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<style scoped lang="scss">
//.nav-bar {
//  position: relative;
//
//  .content {
//    position: relative;
//    z-index: 1; /* 设置子组件在背景图片之上 */
//  }
//
//  .bg {
//    .bg-img {
//      @apply w-full;
//      position: absolute;
//      height: 12%;
//      top: 0;
//      object-fit: cover;
//      z-index: -10; /* 设置背景图片在子组件之下 */
//    }
//  }
// }
</style>
