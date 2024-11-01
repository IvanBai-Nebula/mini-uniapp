<template>
  <view class="container">
    <view class="welcome">
      <text>欢迎来到照护日记！</text>
    </view>
    <view class="des">
      <text>
        这是一个照护知识分享的平台，你可以在这里找到关于如何照护患者的各种教程、技巧、方法、工具等，帮助患者更好地保护自己。
      </text>
    </view>
    <button class="btn" @click="startHandle">
      现在开始
    </button>
  </view>
  <view class="footer">
    <image class="img" src="@/static/images/bg-footer.png" />
  </view>
</template>

<script lang="ts" setup>
const emit = defineEmits(['visibleChange'])
const startHandle = () => {
  emit('visibleChange', false)
}
</script>

<style lang='scss' scoped>
.container {
  @apply px-35rpx w-[90vw];

  .welcome {
    @apply h-25 line-height-25 text-8 font-bold;
  }

  .des {
    @apply text-30rpx line-height-50rpx tracking-wide break-all;

    color: $u-tips-color;
  }

  .btn {
    @apply absolute z-1000 justify-start m-t-60rpx w-300rpx h-100rpx border-none rounded-45rpx shadow-md c-white;

    background-color: $primary;

    &:active {
      background-color: $primary-light;
    }
  }
}

.footer {
  @apply fixed bottom-[-5px] w-full overflow-hidden;

  .img {
    @apply relative w-[125vw] h-1000rpx left-[-8vw];
  }
}
</style>
