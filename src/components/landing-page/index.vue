<template>
  <view class="container">
    <view class="welcome">
      <text>欢迎来到照护日记！</text>
    </view>
    <view class="description">
      <text>
        这是一个照护知识分享的平台，你可以在这里找到关于如何照护患者的各种教程、技巧、方法、工具等，帮助患者更好地保护自己。
      </text>
    </view>
    <view class="button">
      <button class="custom-style" @click="startHandle">
        现在开始
      </button>
    </view>
  </view>
  <view class="footer">
    <image class="custom-style" src="@/static/images/footer.png" />
  </view>
</template>

<script lang="ts" setup>
const emit = defineEmits(['start'])
const start: Ref<boolean> = ref(true)
const startHandle = () => {
  start.value = false
  console.log(start.value)
  emit('start', start.value)
}
</script>

<style lang='scss' scoped>
.container {
  padding-right: 35rpx;
  padding-left: 35rpx;
  width: 90%;

  .welcome {
    @apply h-25 text-8 font-bold line-height-25;
  }

  .description {
    @apply text-30rpx line-height-50rpx c-gray;

    letter-spacing: 5rpx;
    word-break: break-all;
  }

  .button {
    @apply flex m-t-60rpx w-400rpx h-100rpx;

    justify-content: flex-start;

    .custom-style {
      @apply w-full h-auto c-white bg-#f55594 border-none;

      border-radius: 40rpx;
    }
  }
}

.footer {
  @apply position-fixed bottom-0 left-0 w-full overflow-hidden;

  .custom-style {
    position: relative;
    left: -8%;
    width: 120%;
    height: 900rpx;
    object-fit: cover;
  }
}
</style>
