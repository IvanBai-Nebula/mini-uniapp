// 小程序更新检测
export function mpUpdate() {
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    // 请求完新版本信息的回调
    console.log(res.hasUpdate)
  })
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '检测到新版本，是否下载新版本并重启小程序？',
      success(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      },
    })
  })
  updateManager.onUpdateFailed(() => {
    // 新的版本下载失败
    uni.showModal({
      title: '已经有新版本了哟~',
      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      showCancel: false,
    })
  })
}

export function convertToChineseNumber(num: number): string {
  const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  const tens = ['十'] // 十位的表示

  if (num < 0 || num > 99) {
    throw new Error('只能转换0到99之间的数字')
  }

  let result = ''

  // 处理十位
  const tenPlace = Math.floor(num / 10)
  const unitPlace = num % 10

  if (tenPlace > 0) { // 处理十位数字
    result += tens[0]
    if (tenPlace > 1) { // 如果十位数字大于1，添加对应的数字
      result = chineseNumbers[tenPlace] + result
    }
  }

  // 处理个位
  if (unitPlace > 0) {
    result += chineseNumbers[unitPlace]
  }
  else if (tenPlace === 0) { // 数字为零时
    result += chineseNumbers[0]
  }

  return result
}
