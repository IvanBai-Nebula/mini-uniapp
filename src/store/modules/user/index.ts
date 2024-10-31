import type { LoginParams } from '@/api/user/types'
import type { User } from './types'
import { UserApi } from '@/api'

import { defineStore } from 'pinia'

const useUserStore = defineStore('user', () => {
  const user: Ref<User | null> = ref(null)

  // 设置用户信息
  const setUser = (partial: Partial<User>) => {
    user.value = { ...user.value, ...partial }
  }

  // 重置用户信息
  const resetUser = () => {
    user.value = null
  }

  // 获取用户信息
  const getUser = async () => {
    const res = await UserApi.getUserProfile()
    setUser(res)
  }

  const getToken = () => {
    return user.value?.token || ''
  }

  // 异步登录并存储token
  const login = async (loginForm: LoginParams) => {
    const res = await UserApi.login(loginForm)
    setUser(res)
  }

  // Logout
  const logout = async () => {
    await UserApi.logout()
    resetUser()
  }

  // 微信快捷登录
  const quickLogin = async () => {
    const response = await wx.login()
    const code: string = response.code
    if (!code) {
      uni.$u.toast('登录失败，请重试')
    }
    console.log('code', code)
    const res = await UserApi.quickLogin({ code })
    setUser(res)
  }

  return {
    user,
    setUser,
    resetUser,
    getUser,
    getToken,
    login,
    logout,
    quickLogin,
  }
}, {
  persist: true,
})

export default useUserStore
