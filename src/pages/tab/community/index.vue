<template>
  <view class="community">
    <up-navbar placeholder>
      <template #left>
        <view class="avatar">
          <up-avatar :src="avatar" size="35" />
        </view>
      </template>
      <template #center>
        <view class="nav-center">
          <up-search placeholder="搜索新分享" :show-action="false" disabled @click="handleSearch()" />
        </view>
      </template>
      <template #right>
        <view class="iconfont i-mdi:text-box-edit" @click="handlePublish()" />
      </template>
    </up-navbar>
    <up-sticky bg-color="#fff">
      <up-tabs
        :list="tabList" :current="tabIndex" line-color="#dc5095"
        :active-style="{ color: '#dc5095' }" :inactive-style="{ color: '#909399' }" line-width="30" :scrollable="false"
        @change="changeTab"
      />
    </up-sticky>
    <swiper class="flex-1" :current="swiperIndex" @animationfinish="animationFinish">
      <swiper-item v-for="(item, index) in swiperList" :key="index" class="h-full">
        <scroll-view
          :ref="`scrollView${index}`" :scroll-top="scrollTops[tabIndex]" class="h-full w-auto" scroll-y
          @scrolltolower="reachBottom" @scroll="scroll"
        >
          <!-- 有内容 -->
          <template v-if="item.list.length > 0">
            <!-- 资讯列表 -->
            <InfoList
              v-for="(item1, index1) in item.list" :key="index1" :item="item1" :index="index1"
              @mark="handleMark" @follow="handleFollow"
            />
            <up-loadmore :status="loadStatus[tabIndex]" style="height:60rpx" />
          </template>
          <!-- 无内容 -->
          <template v-else>
            <u-empty
              text="本来无一物,何处惹尘埃" icon="/static/images/demo/winter.svg" text-size="16" margin-top="25%"
              mode="list"
            />
          </template>
        </scroll-view>
      </swiper-item>
    </swiper>
    <!-- 回到顶部 -->
    <view v-if="scrollTop[tabIndex] > 400" class="go-top" @click="goTop">
      <up-icon color="#01906c" name="arrow-up" size="24" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { newsList } from '@/utils'
import InfoList from './components/InfoList/index.vue'

const userStore = useUserStore()
const avatar = userStore.user?.avatar || ''
// onShow(() => {
//   if (!userStore.user) {
//     uni.navigateTo({
//       url: '/pages/login/index',
//     })
//   }
// })

const handleSearch = () => {
  uni.navigateTo({
    url: '/pages/tab/community/subpages/search/index',

  })
}

const handlePublish = () => {
  uni.navigateTo({
    url: '/pages/tab/community/subpages/release/index',
    success: (res) => {
      console.log(res)
    },
  })
}

const tabIndex = ref<number>(0)
const tabList = [
  { name: '推荐' },
  { name: '最新' },
  { name: '热门' },
  { name: '专家' },
]

const scrollTops = reactive([0, 0, 0, 0, 0, 0])
const scrollTop = reactive([0, 0, 0, 0, 0, 0])
const loadStatus = ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore']
const swiperIndex = ref<number>(0)
const swiperList = reactive(newsList)
onMounted(() => {
  for (let i = 0; i < swiperList.length; i++) {
    console.log(swiperList[i].list)
  }
})

const changeTab = (item: { index: number }) => {
  tabIndex.value = item.index
  swiperIndex.value = item.index
  console.log(swiperList)
}
const animationFinish = (e: { detail: { current: number } }) => {
  tabIndex.value = e.detail.current
  swiperIndex.value = e.detail.current
}

const getList = (index: number) => {
  // 随机添加5条数据
  for (let i = 0; i < 5; i++) {
    const curr = uni.$u.random(0, swiperList[index].list.length - 1)
    const data = swiperList[index].list[curr]
    swiperList[index].list.push(data as any)
  }
  // 加载更多
  loadStatus.splice(tabIndex.value, 1, 'nomore')
}
const reachBottom = () => {
  // 是否可加载
  if (loadStatus[tabIndex.value] !== 'loadmore') return
  // 加载中
  loadStatus.splice(tabIndex.value, 1, 'loading')
  setTimeout(() => {
    getList(tabIndex.value)
  }, 1000)
}

const scroll = (e: { detail: { scrollTop: number } }) => {
  const index = tabIndex.value
  scrollTop.splice(index, 1, e.detail.scrollTop) // 400显示回到顶部
}
const handleFollow = (item: { index: number; value: boolean }) => {
  swiperList[swiperIndex.value].list[item.index].isFollow = item.value
  const title = item.value ? '关注成功' : '取消成功'
  uni.showToast({
    title,
    icon: 'none',
  })
}

const handleMark = (item: { index: number; value: string }) => {
  const infoNum = swiperList[swiperIndex.value].list[item.index].infoNum
  switch (item.value) {
    case 'smile':
      if (infoNum.index === 1) return // 微笑
      else if (infoNum.index === 2) infoNum.cryNum--
      infoNum.index = 1
      infoNum.smileNum++
      break
    case 'cry':
      if (infoNum.index === 2) return // 踩
      else if (infoNum.index === 1) infoNum.smileNum--
      infoNum.index = 2
      infoNum.cryNum++
      break
  }
  const title = item.value === 'smile' ? '谢谢表扬' : '继续加油'
  uni.showToast({
    title,
    icon: 'none',
  })
}
const goTop = () => {
  const index = tabIndex.value
  // 解决view层不同步的问题
  scrollTops.splice(index, 1, scrollTop[index])
  nextTick(() => {
    scrollTops.splice(index, 1, 0)
    scrollTop.splice(index, 1, 0)
  })
}
</script>

<style lang="scss" scoped>
.community {
  display: flex;
  width: 100%;
  height: calc(100vh - var(--window-top) - var(--window-bottom)); // 视高 - 内容区顶部 - 内容区底部
  flex-direction: column;

  ::v-deep .u-navbar {
    .iconfont {
      font-size: 48rpx;
      color: $primary;
    }

    .nav-center {
      @apply ml-20rpx;
    }

    .u-navbar__content {
      margin-right: 180rpx !important; // 胶囊按钮

      .u-navbar__content__left {
        @apply p-x-10rpx;
      }

      .u-navbar__content__right {
        @apply p-x-10rpx;
      }
    }
  }

  // 回到顶部
  .go-top {
    position: fixed;
    right: 30rpx;
    bottom: 100rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80rpx;
    height: 80rpx;
    background: #E5E7EB;
    border-radius: 100%;

    ::v-deep .u-icon--right {
      justify-content: center;
    }
  }
}
</style>
