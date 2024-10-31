import { useUserStore } from '@/store'

// 登录页面
const loginPage = '/pages/common/login/index'
// 页面白名单
const whiteList = ['/pages/common/login/index']

// 检查地址白名单
function checkWhite(url: string) {
  const path = url.split('?')[0]
  return whiteList.includes(path)
}

// 页面跳转验证拦截器
const list = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab']
list.forEach((item) => {
  uni.addInterceptor(item, {
    invoke(to) {
      const userStore = useUserStore()
      if (userStore.user) {
        if (to.url === loginPage)
          uni.reLaunch({ url: '/pages/tab/home/index' })

        return true
      }
      else {
        if (checkWhite(to.url))
          return true

        uni.reLaunch({ url: loginPage })
        return false
      }
    },
    fail(err) {
      console.log(err)
    },
  })
})
