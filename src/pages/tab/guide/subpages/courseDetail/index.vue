<template>
  <view class="course-detail">
    <up-navbar-mini
      :auto-back="true"
      bg-color="transparent"
    >
      <template #left>
        <up-icon
          name="arrow-left"
          size="16"
          color="black"
        />
      </template>
    </up-navbar-mini>
    <image
      class="course-detail-bg"
      src="https://care-daily-test-1318382758.cos.ap-shanghai.myqcloud.com/course-detail-bg.jpg"
    />
    <view class="course-detail-card">
      <text class="course-detail-title">
        第一章 吞咽障碍管理知识
      </text>
      <view class="course-detail-info flex">
        <div class="i-mdi:account-multiple-outline font-size-35rpx" />
        <text class="number m-l-20rpx m-r-40rpx">
          4.5k
        </text>
        <div class="i-mdi:thumb-up-outline font-size-33rpx" />
        <text class="rate m-l-20rpx">
          4.9分
        </text>
      </view>
      <view class="course-detail-desc">
        <text class="font-size-36rpx">
          课程简介
        </text>
        <text class="m-t-20rpx leading-normal">
          六年级绘画课是一门注重实践，启发创意的艺术课程，本课程旨在通过系统的绘画学习，培养学生的观察力、想象力和创作力，让学生掌握基本的绘画技能和理论知识，从而能够欣赏并创作出具有个性和表现力的绘画作品。
        </text>
      </view>
    </view>
    <view class="course-detail-content">
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
      <view v-if="tabIndex === 0">
        <up-list
          @srcolltolower="scrollToLower"
        >
          <up-list-item
            v-for="(item, index) in knowledgeList"
            :key="index"
            :item="item"
          />
        </up-list>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const tabList = reactive([
  { name: '知识要点' },
  { name: '教学视频' },
  { name: '巩固测试' },
])
const tabIndex = ref<number>(0)

const changeTab = (item: { index: number }) => {
  tabIndex.value = item.index
}
const knowledgeList = reactive([
  { title: '入口要求' },
  { title: '室内活动空间' },
  { title: '卧室环境要求' },
  { title: '卫生间的设备' },
])
</script>

<style lang="scss">
page > view > view > view > view.u-navbar-mini__content.data-v-128ec6da {
  padding: 0 !important;

  view.u-navbar-mini__content__left.data-v-128ec6da > view > text {
    font-weight: bold !important;
    margin-bottom: 20rpx !important;
  }
}
</style>

<style lang="scss">
.course-detail {
  position: relative;

  .course-detail-bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 55vh;
    object-fit: cover;
  }

  .course-detail-card {
    position: fixed; /* 使用绝对定位 */
    top: 30%; /* 距离顶部 40% */
    z-index: 1; /* 确保在背景之上 */
    width: 100%; /* 宽度 */
    height: 40vh;
    color: white;
    background-color: #FFCDA1;
    border-radius: 60rpx;

    .course-detail-title {
      position: fixed; /* 使用绝对定位 */
      margin-top: 30rpx;
      margin-left: 40rpx;
      font-size: 36rpx;
      text-align: center;
      font-weight: bold;
    }

    .course-detail-info {
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 100rpx;
      margin-left: 40rpx;
    }

    .course-detail-desc {
      position: fixed;
      display: flex;
      justify-content: center;
      margin-top: 180rpx;
      margin-right: 40rpx;
      margin-left: 40rpx;
      flex-direction: column;
    }
  }

  .course-detail-content {
    position: fixed;
    top: 56%;
    z-index: 2;
    width: 100%;
    height: 40vh;
    color: black;
    background-color: white;
    border-top-left-radius: 60rpx;
    border-top-right-radius: 60rpx;
  }
}
</style>
