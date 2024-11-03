<template>
  <view class="page-wrap">
    <up-navbar title="" placeholder left-icon="" right-icon="camera-fill" />
    <view class="flex items-center bg-white pb-30rpx pl-30rpx pr-20rpx">
      <view class="mr-10rpx">
        <up-avatar src="/static/images/logo.png" size="70" />
      </view>
      <view class="flex-1">
        <view class="pb-20rpx font-size-36rpx">
          uni-app
        </view>
        <view class="u-tips-color font-size-28rpx" @click="toCopy">
          微信号:uni-app
        </view>
      </view>
      <view class="ml-10rpx p-10rpx">
        <up-icon name="scan" color="#969799" />
      </view>
      <view class="ml-10rpx p-10rpx">
        <up-icon name="arrow-right" color="#969799" />
      </view>
    </view>

    <view class="mt-20rpx bg-white">
      <up-cell-group>
        <up-cell icon="rmb-circle" title="支付" is-link />
      </up-cell-group>
    </view>

    <view class="mt-20rpx bg-white">
      <up-cell-group>
        <up-cell icon="star" title="收藏" is-link />
        <up-cell icon="photo" title="相册" is-link />
        <up-cell icon="coupon" title="卡券" is-link />
        <up-cell icon="heart" title="关注" is-link />
      </up-cell-group>
    </view>

    <view class="mt-20rpx bg-white">
      <up-cell-group>
        <up-cell icon="setting" title="设置" is-link />
      </up-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import { useClipboard } from '@/hooks'

const { setClipboardData, getClipboardData } = useClipboard()

// const userStore = useUserStore()
// onShow(() => {
//   if (!userStore.user) {
//     uni.navigateTo({
//       url: '/pages/login/index',
//     })
//   }
// })
// 复制
const toCopy = async () => {
  await setClipboardData({ data: '1234567890' })
  const data = await getClipboardData()
  console.log('[ data ] >', data)
}
</script>
