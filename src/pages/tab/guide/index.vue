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
        :list="courseTabList"
        :current="courseTabIndex"
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
        v-for="(item, index) in allCourseChapterList"
        :key="index"
        class="h-full"
      >
        <scroll-view
          :ref="`scrollView${index}`"
          :scroll-top="scrollTops[courseTabIndex]"
          class="h-full w-auto"
          scroll-y
          @scrolltolower="reachBottom()"
          @scroll="scroll"
        >
          <!-- 有内容 -->
          <template v-if="item.list.length > 0">
            <!-- 资讯列表 -->
            <ChapterList
              v-for="(childItem, childIndex) in item.list"
              :key="childIndex"
              :item="childItem"
              :index="childIndex"
            />
            <up-loadmore
              :status="loadStatus[courseTabIndex]"
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
    <view v-if="scrollTop[courseTabIndex] > 400" class="go-top" @click="goTop">
      <up-icon color="#dc5095" name="arrow-up" size="24" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getCourseTabList, postCourseChapterList } from '@/api/guide'
import ChapterList from './components/ChapterList/index.vue'
import type { AllCourseChapterList, GuideCourseTabList } from '@/api/guide/types'

const allCourseChapterList = ref<AllCourseChapterList>([])
const perPage = ref<number | null>(null)

// 初始化数组的辅助函数
const initArray = (length: number, value: any) => Array.from({ length }, () => value)

const loadCoursesForTab = async (index: number) => {
  if (allCourseChapterList.value[index].list.length === 0) {
    allCourseChapterList.value[index] = await postCourseChapterList({
      course_id: index,
      current_page: 1,
      per_page: perPage.value,
    })
  }
}

const courseTabList = ref<GuideCourseTabList>([])
const courseTabIndex = ref<number>(0)
const swiperIndex = ref<number>(0)
const scrollTops = ref<Array<number>>([])
const scrollTop = ref<Array<number>>([])
const loadStatus = ref<Array<string>>([])
const nomoreText = ref('实在没有了')

onMounted(async () => {
  const tabListRes = await getCourseTabList()
  courseTabList.value = tabListRes
  const length = courseTabList.value.length
  scrollTops.value = initArray(length, 0)
  scrollTop.value = initArray(length, 0)
  allCourseChapterList.value = initArray(length, {
    list: [],
    pagination: {
      total_items: 0,
      total_pages: 0,
      current_page: 1,
      per_page: 0,
    },
  })
  loadStatus.value = initArray(length, 'loadmore')

  await loadCoursesForTab(tabListRes[0].index)
  console.log(allCourseChapterList.value)
  swiperIndex.value = tabListRes[0].index
})

watch(courseTabIndex, async (newIndex) => {
  await loadCoursesForTab(newIndex)
  swiperIndex.value = newIndex
})

const fetchCourseList = async () => {
  if (allCourseChapterList.value[courseTabIndex.value].pagination.current_page === allCourseChapterList.value[courseTabIndex.value].pagination.total_pages) {
    loadStatus.value[courseTabIndex.value] = 'nomore'
    return
  }
  loadStatus.value[courseTabIndex.value] = 'loading'
  const res = await postCourseChapterList({
    course_id: courseTabIndex.value,
    current_page: allCourseChapterList.value[courseTabIndex.value].pagination.current_page + 1,
    per_page: perPage.value,
  })
  allCourseChapterList.value[courseTabIndex.value].list = allCourseChapterList.value[courseTabIndex.value].list.concat(res.list)
  allCourseChapterList.value[courseTabIndex.value].pagination.current_page += 1
  loadStatus.value[courseTabIndex.value] = 'loadmore'
}

const changeTab = (item: { index: number }) => {
  courseTabIndex.value = item.index
}

const animationFinish = (e: { detail: { current: number } }) => {
  courseTabIndex.value = e.detail.current
  swiperIndex.value = e.detail.current
}

const reachBottom = () => {
  if (loadStatus.value[courseTabIndex.value] !== 'loadmore') return
  fetchCourseList()
}

const scroll = (e: { detail: { scrollTop: number } }) => {
  scrollTop.value[courseTabIndex.value] = e.detail.scrollTop
}

const goTop = () => {
  const index = courseTabIndex.value
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
