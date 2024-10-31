export function useScreenHeight() {
  const screenHeight: Ref<number> = ref(0)
  const screenWidth: Ref<number> = ref(0)
  const minHeight: Ref<number> = ref(0)

  onMounted(() => {
    const systemInfo = uni.getSystemInfoSync()
    screenHeight.value = systemInfo.windowHeight
    screenWidth.value = systemInfo.windowWidth

    let minRequiredHeight: number = 0
    if (screenWidth.value >= 414) {
      if (screenHeight.value <= 736) {
        minRequiredHeight = 896
      }
    }
    else {
      minRequiredHeight = 667
    }

    minHeight.value = Math.max(screenHeight.value, minRequiredHeight)
  })

  return {
    screenHeight,
    minHeight,
  }
}
