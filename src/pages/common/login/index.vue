<template>
  <landing-page v-if="landing" @start="handleStart" />
  <view v-else>
    <view class="login-form-wrap">
      <view class="title">
        手机号码登录
      </view>
      <input v-model="tel" class="u-border-bottom text-4" type="number" placeholder="请输入手机号">
      <view class="u-border-bottom my-40rpx flex">
        <input v-model="code" class="flex-1 text-4" type="number" placeholder="请输入验证码">
        <view>
          <u-code ref="uCodeRef" @change="codeChange" />
          <u-button
            :text="tips"
            plain="true"
            class="border-none"
            style="background: transparent"
            @click="getCode"
          />
        </view>
      </view>
      <button class="login-btn" :style="[inputStyle]" @tap="submit">
        登录
        <text class="i-mdi-login ml-5rpx" />
      </button>
      <view class="alternative">
        <view>
          新用户注册
          <text class="i-mdi:chevron-right" />
        </view>
      </view>
    </view>
  </view>
  <!--  <view class="login-type-wrap"> -->
  <!--    <button class="btn" @tap="quickLogin"> -->
  <!--      <text class="i-mdi-wechat mr-5rpx" /> -->
  <!--      <text>微信快捷登录</text> -->
  <!--    </button> -->
  <!--  </view> -->

  <view class="hint">
    <up-radio-group v-model="agreedShow">
      <up-radio shape="square" />
    </up-radio-group>

    登录代表同意
    <text class="link">
      用户协议、隐私政策，
    </text>
    并授权使用您的账号信息（如昵称、头像、手机号等）以便您统一管理
  </view>
</template>

<script setup lang="ts">
import uCode from 'uview-plus/components/u-code/u-code.vue'
import type { CSSProperties } from 'vue'
import { setToken } from '@/utils/auth'
// import { useUserStore } from '@/store';

const landing: Ref<boolean> = ref(false)
const handleStart = (value) => {
  landing.value = value
}

// const userStore = useUserStore();
const tel = ref<string>('')
const code = ref<string>('')
const tips = ref<string>()
const uCodeRef = ref<InstanceType<typeof uCode> | null>(null)

const inputStyle = computed<CSSProperties>(() => {
  const style = {} as CSSProperties
  if (tel.value && code.value) {
    style.color = '#fff'
    style.backgroundColor = uni.$u.color.warning
  }
  return style
})

function codeChange(text: string) {
  tips.value = text
}

function getCode() {
  if (uCodeRef.value?.canGetCode) {
    // 模拟向后端请求验证码
    uni.showLoading({
      title: '正在获取验证码',
    })
    setTimeout(() => {
      uni.hideLoading()
      uni.$u.toast('验证码已发送')
      // 通知验证码组件内部开始倒计时
      uCodeRef.value?.start()
    }, 1000)
  }
  else {
    uni.$u.toast('倒计时结束后再发送')
  }
}

async function submit() {
  if (!uni.$u.test.mobile(Number(tel.value))) {
    uni.$u.toast('请输入正确的手机号')
    return
  }
  if (!code.value) {
    uni.$u.toast('请输入验证码')
    return
  }
  // 登录请求
  // const res = await userStore.login({ phone: tel.value, code: code.value }).catch(() => {
  //   uni.$u.toast('登录失败');
  // });
  // if (!res) return;
  setToken('1234567890')
  await uni.reLaunch({ url: '/pages/tab/home/index' })
}

const agreedShow: Ref<boolean> = ref(false)
</script>

<style lang="scss" scoped>
.login-form-wrap {
  @apply mt-80rpx mx-auto mb-0 w-600rpx;

  .title {
    @apply mb-100rpx text-60rpx text-left font-400;
  }

  input {
    @apply pb-6rpx mb-10rpx text-left;
  }

  .tips {
    @apply mt-8rpx mb-60rpx;

    color: $u-info;
  }

  .login-btn {
    @apply flex items-center justify-center py-12rpx px-0 text-4 bg-#f372ae border-none c-white;

    border-radius: 40rpx;

    &:hover {
      background-color: #eda2c5; // 当鼠标悬停时改变颜色
    }
  }

  .alternative {
    @apply flex mt-30rpx justify-center;

    color: #262424;
  }
}

.login-type-wrap {
  @apply flex pt-100rpx px-150rpx pb-150rpx;
  // 居中对齐

  .btn {
    @apply flex flex-auto justify-center items-center w-full h-100rpx text-4 text-white;

    padding: 0; // 移除默认内边距以确保内容间的间距由你控制
    background-color: #28bb9c; // 按钮背景颜色
    // 使用 `w-full` 使按钮宽度自适应
    border-radius: 15rpx;

    // 添加阴影效果
    box-shadow: 0 4rpx 8rpx rgb(0 0 0 / 20%);

    // 增加悬停效果
    &:hover {
      background-color: #24a68a; // 当鼠标悬停时改变颜色
    }
  }

}

.hint {
  @apply m-t-30rpx px-40rpx py-20rpx text-28rpx;

  color: $u-tips-color;

  .link {
    color: $u-warning;
  }
}
</style>
