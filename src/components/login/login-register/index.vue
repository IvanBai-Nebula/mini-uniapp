<template>
  <view class="login-form-wrap">
    <view class="title">
      <text v-if="register">
        注册
      </text>
      <text v-else>
        手机号码登录
      </text>
    </view>
    <u-form ref="formRef" :model="form" :rules="rules">
      <u-form-item v-if="register" prop="username">
        <u-input
          v-model="form.username"
          class="u-border-bottom"
          border="none"
          font-size="17"
          type="text"
          placeholder="请输入用户名"
        />
      </u-form-item>
      <u-form-item prop="phone">
        <u-input
          v-model="form.phone"
          class="u-border-bottom"
          border="none"
          font-size="17"
          type="number"
          placeholder="请输入手机号"
        />
      </u-form-item>
      <u-form-item prop="code">
        <view class="u-border-bottom flex">
          <u-input
            v-model="form.code"
            border="none"
            font-size="17"
            type="number"
            placeholder="请输入验证码"
          >
            <template #suffix>
              <u-code ref="uCodeRef" @change="codeChange" />
              <u-button
                :text="tips"
                :plain="true"
                style="height: 20px;background-color: transparent;border: none;"
                @click="getCode"
              />
            </template>
          </u-input>
        </view>
      </u-form-item>

      <button class="login-btn" :style="[inputStyle]" @tap="submit">
        <text v-if="register">
          注册
        </text>
        <text v-else>
          登录
        </text>
        <text class="i-mdi-login ml-5rpx" />
      </button>
      <view class="alternative" @tap="register = !register">
        <text v-if="register">
          已注册，去登录
        </text>
        <text v-else>
          新用户注册
        </text>
        <text class="i-mdi:chevron-right" />
      </view>
    </u-form>
  </view>
  <view class="hint">
    <up-radio-group
      v-model="agreed"
      style="display: inline-block; width: 35rpx;"
      @change="agreedChange"
    >
      <up-radio class="m-y-0" shape="square" size="small" />
    </up-radio-group>
    <text class="hint-text">
      我已阅读并同意
    </text>
    <text class="hint-text link">
      《照护日记用户协议与隐私政策》，
    </text>
    <text class="hint-text">
      并授权照护日记使用我的账号信息（如昵称、头像、手机号等）以便享受便捷服务。
    </text>
  </view>

  <view v-if="!register" class="login-options">
    <text class="title">
      快捷登陆
    </text>
    <img class="login-icon" src="@/static/images/weixin.png" alt="" @click="quickLogin">
  </view>
</template>

<script lang="ts" setup>
import uCode from 'uview-plus/components/u-code/u-code.vue'
import type { CSSProperties } from 'vue'
import { useUserStore } from '@/store'
import { useLoading } from '@/hooks'
import { UserApi } from '@/api'

const userStore = useUserStore()
const formRef = ref<any>(null)
const form = reactive({
  username: '',
  phone: '',
  code: '',
})

const rules = {
  username: [
    // 必填规则
    { required: true, message: '请输入用户名', trigger: ['blur'] },
    // 6-8个字符之间的判断
    { min: 5, max: 10, message: '长度在5-10个字符之间', trigger: ['blur'] },
    {
      asyncValidator: async (rule: any, value: string, callback: (error?: Error) => void) => {
        uni.$u.http.post('https://apifoxmock.com/m1/5169100-4833975-default/wexin/check_username', { username: value }).then((res: any) => {
          if (res.success) {
            callback()
          }
          else {
            callback(new Error('用户名已存在'))
          }
        })
      },
      trigger: ['blur'],
    },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern: /^(?:(?:\+|00)86)?1(?:3\d|4[5-79]|5[0-35-9]|6[5-7]|7[0-8]|8\d|9[189])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur',
    },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' },
  ],
}

const tips = ref<string>()
const uCodeRef = ref<InstanceType<typeof uCode> | null>(null)
const register = ref<boolean>(false)

const inputStyle = computed<CSSProperties>(() => {
  const style = {} as CSSProperties
  if (form.phone && form.code) {
    style.color = '#fff'
    style.backgroundColor = 'rgba(220, 80, 149, 0.8)'
  }
  return style
})

const codeChange = (text: string) => {
  tips.value = text
}

// 获取验证码
const getCode = async () => {
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

// 同意协议
const agreed: Ref<boolean> = ref(false)
const agreedChange = () => {
  agreed.value = !agreed.value
}

const formValidate = () => {
  formRef.value?.validate().then((valid: boolean) => {
    if (!valid) {
      uni.$u.toast('请正确填写信息')
    }
  }).catch(() => {
    uni.$u.toast('请正确填写信息')
  })
}

// 注册
const registerSubmit = async () => {
  formValidate()
  if (!agreed.value) {
    uni.$u.toast('请阅读并同意协议')
  }
  await UserApi.register({
    username: form.username,
    phone: form.phone,
    code: form.code,
  })
  uni.$u.toast('注册成功')
  register.value = false
}

// 登录成功
const loginSuccess = () => {
  useLoading().showLoading('登录中')
  setTimeout(() => {
    useLoading().hideLoading()
    uni.$u.toast('登录成功')
    uni.switchTab({ url: '/pages/tab/home/index' })
  }, 1000)
}

// 登录
const loginSubmit = async () => {
  formValidate()
  if (!agreed.value) {
    uni.$u.toast('请阅读并同意协议')
    return
  }
  // 登录请求
  await userStore.login({
    phone: form.phone,
    code: form.code,
  })
  loginSuccess()
}

const submit = () => {
  if (register.value) {
    registerSubmit()
  }
  else {
    loginSubmit()
  }
}

// 快捷登录
const quickLogin = async () => {
  if (!agreed.value)
    return uni.$u.toast('请阅读并同意协议')
  await userStore.quickLogin()
  loginSuccess()
}
</script>

<style lang="scss" scoped>
.login-form-wrap {
  @apply mt-80rpx mx-auto mb-0 w-600rpx;

  .title {
    @apply mb-100rpx text-60rpx text-left font-400;
  }

  .tips {
    @apply mt-8rpx mb-60rpx;

    color: $u-info;
  }

  .login-btn {
    @apply flex items-center justify-center m-t-60rpx py-12rpx px-0 text-4 border-none c-white rounded-45rpx shadow-md;

    background-color: $primary;

    &:active {
      background-color: $primary-light; // 当鼠标悬停时改变颜色
    }
  }

  .alternative {
    @apply flex mt-40rpx justify-center items-center tracking-wider;

    color: $u-main-color;
  }
}

.hint {
  @apply mt-30rpx px-40rpx py-20rpx text-28rpx line-height-6;

  color: $u-tips-color;

  .hint-text {
    @apply inline line-height-inherit
  }

  .link {
    color: $u-warning;
  }
}

.login-options {
  @apply flex flex-col items-center mt-180rpx;
  // 顶部外边距
  color: $u-tips-color;

  .title {
    @apply flex justify-center tracking-wider;
    // 水平居中
  }

  .login-icon {
    @apply flex justify-center w-90rpx h-90rpx mt-40rpx;
    // 水平居中
  }
}
</style>
