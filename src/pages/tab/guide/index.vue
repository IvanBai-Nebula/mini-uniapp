<template>
  <view class="guide">
    <!-- 顶部栏 -->
    <up-navbar placeholder>
      <template #left>
        <view class="guide-title">
          我的学习
        </view>
      </template>
    </up-navbar>
    <!-- 导航栏 -->
    <up-sticky bg-color="#fff">
      <up-tabs
        :list="tabList"
        :current="tabIndex"
        line-color="#dc5095"
        :active-style="{ color: '#dc5095' }"
        :inactive-style="{ color: '#909399' }"
        line-width="30"
        :scrollable="false"
        @change="changeTab"
      />
    </up-sticky>
    <swiper
      class="flex-1"
      :current="swiperIndex"
      @animationfinish="animationFinish"
    >
      <swiper-item
        v-for="(item, index) in allCourseList"
        :key="index"
        class="h-full"
      >
        <scroll-view
          :ref="`scrollView${index}`"
          :scroll-top="scrollTops[tabIndex]"
          class="h-full w-auto"
          scroll-y
          @scrolltolower="reachBottom()"
          @scroll="scroll"
        >
          <!-- 有内容 -->
          <template v-if="item.list.length > 0">
            <!-- 资讯列表 -->
            <CourseList
              v-for="(childItem, childIndex) in item.list"
              :key="childIndex"
              :item="childItem"
              :index="childIndex"
            />
            <up-loadmore
              :status="loadStatus[tabIndex]"
              :nomore-text="nomoreText"
              style="height:60rpx"
            />
          </template>
          <!-- 无内容 -->
          <template v-else>
            <u-empty
              text="本来无一物,何处惹尘埃"
              icon="/static/images/demo/winter.svg"
              text-size="16"
              margin-top="25%"
              mode="list"
            />
          </template>
        </scroll-view>
      </swiper-item>
    </swiper>
    <!-- 回到顶部 -->
    <view v-if="scrollTop[tabIndex] > 400" class="go-top" @click="goTop">
      <up-icon color="#dc5095" name="arrow-up" size="24" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getTabList, postCourse } from '@/api/guide'
import type { AllCourseList, TabList } from '@/api/guide/types'
import CourseList from './components/CourseList/index.vue'

const allCourseList = ref<AllCourseList>([])
const perPage = ref<number | null>(null)

// 初始化数组的辅助函数
const initArray = (length: number, value: any) => Array.from({ length }, () => value)

const loadCoursesForTab = async (index: number) => {
  if (allCourseList.value[index].list.length === 0) {
    allCourseList.value[index] = await postCourse({
      id: index,
      current_page: 1,
      per_page: perPage.value,
    })
  }
}

const tabList = ref<TabList>([])
const tabIndex = ref<number>(0)
const swiperIndex = ref<number>(0)
const scrollTops = ref<Array<number>>([])
const scrollTop = ref<Array<number>>([])
const loadStatus = ref<Array<string>>([])
const nomoreText = ref('实在没有了')

onMounted(async () => {
  const tabListRes = await getTabList()
  tabList.value = tabListRes.list
  const length = tabList.value.length
  scrollTops.value = initArray(length, 0)
  scrollTop.value = initArray(length, 0)
  allCourseList.value = initArray(length, {
    list: [],
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      per_page: 0,
    },
  })
  loadStatus.value = initArray(length, 'loadmore')

  await loadCoursesForTab(tabListRes.list[0].index)
  console.log(allCourseList.value)
  swiperIndex.value = tabListRes.list[0].index
})

watch(tabIndex, async (newIndex) => {
  await loadCoursesForTab(newIndex)
  swiperIndex.value = newIndex
})

const fetchCourseList = async () => {
  if (allCourseList.value[tabIndex.value].pagination.current_page === allCourseList.value[tabIndex.value].pagination.total_pages) {
    loadStatus.value[tabIndex.value] = 'nomore'
    return
  }
  loadStatus.value[tabIndex.value] = 'loading'
  const res = await postCourse({
    id: tabIndex.value,
    current_page: allCourseList.value[tabIndex.value].pagination.current_page + 1,
    per_page: perPage.value,
  })
  allCourseList.value[tabIndex.value].list = allCourseList.value[tabIndex.value].list.concat(res.list)
  allCourseList.value[tabIndex.value].pagination.current_page += 1
  loadStatus.value[tabIndex.value] = 'loadmore'
}

const changeTab = (item: { index: number }) => {
  tabIndex.value = item.index
}

const animationFinish = (e: { detail: { current: number } }) => {
  tabIndex.value = e.detail.current
  swiperIndex.value = e.detail.current
}

const reachBottom = () => {
  if (loadStatus.value[tabIndex.value] !== 'loadmore') return
  fetchCourseList()
}

const scroll = (e: { detail: { scrollTop: number } }) => {
  scrollTop.value[tabIndex.value] = e.detail.scrollTop
}

const goTop = () => {
  const index = tabIndex.value
  scrollTops.value.splice(index, 1, scrollTop.value[index])
  nextTick(() => {
    scrollTops.value.splice(index, 1, 0)
    scrollTop.value.splice(index, 1, 0)
  })
}
</script>

<style lang='scss' scoped>
.guide {
  display: flex;
  width: 100%;
  height: calc(100vh - var(--window-top) - var(--window-bottom)); // 视高 - 内容区顶部 - 内容区底部
  flex-direction: column;

  .u-navbar {
    .guide-title {
      @apply pl-25rpx text-6 font-bold c-amber;
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
