<template>
  <!-- 资讯列表 -->
  <view class="course-list animate__animated animate__fadeInLeft animate__fast wrap-card border-b">
    <!-- 头像栏 -->
    <view class="flex flex-row items-center justify-between">
      <!-- 头像 -->
      <view class="flex flex-row items-center justify-center">
        <image
          class="img-header mr-10" :src="info.userPic" mode="widthFix" lazy-load
          @click.stop="$u.route('/pages/mine/user-space')"
        />
        <view class="flex items-center justify-center text-30 text-gray-500">
          {{ item.username }}
          <view
            class="iconfont iconxingbie-nan tag-age"
            :class="[item.sex === 0 ? 'iconxingbie-nan' : 'iconxingbie-nv girl']"
          >
            <text class="ml-10">
              {{ item.age }}
            </text>
          </view>
        </view>
      </view>
      <!-- 关注 -->
      <view class="flex flex-row items-center justify-center rounded-10 bg-gray-100 px-10 py-5 text-28">
        <template v-if="info.isFollow">
          <text @click="follow(false)">
            已关注
          </text>
        </template>
        <template v-else>
          <view class="flex items-center" @click="follow(true)">
            <text class="iconfont iconjia mr-10 text-24" />
            关注
          </view>
        </template>
      </view>
    </view>
    <!-- 标题 -->
    <view class="line-1 my-10 w-100 text-32" @click="goDetail()">
      {{ info.title }}
    </view>
    <!-- 插槽：图片、视频 -->
    <slot>
      <view class="relative flex flex-row items-center justify-center">
        <!-- 图片 -->
        <image class="w-full rounded-20" :src="info.coverPic" mode="widthFix" lazy-load @click="goDetail()" />
        <template v-if="info.type === 'video'">
          <!-- 视频 -->
          <view class="iconfont icon-play iconbofang" />
          <view class="play-info">
            {{ info.playNum }}次播放 {{ info.playLong }}
          </view>
        </template>
      </view>
    </slot>
    <!-- 点赞、评论 -->
    <view class="my-10 flex flex-row items-center justify-between text-gray-500">
      <view class="flex flex-row items-center justify-center">
        <view class="mr-20 flex flex-row items-center justify-center" @click.stop="handleMark('smile')">
          <view class="iconfont mr-10 text-36" :class="[handleIcon('smile', info.infoNum)]" />
          {{ info.infoNum.smileNum }}
        </view>
        <view class="flex flex-row items-center justify-center" @click.stop="handleMark('cry')">
          <view class="iconfont mr-10 text-36" :class="[handleIcon('cry', info.infoNum)]" />
          {{ info.infoNum.cryNum }}
        </view>
      </view>
      <view class="flex flex-row items-center justify-center">
        <view class="mr-20 flex flex-row items-center justify-center" @click="handleComment()">
          <view class="iconfont iconliaotian mr-10 text-36" />
          {{ info.commentNum }}
        </view>
        <view class="flex flex-row items-center justify-center" @click="handleShare()">
          <view class="iconfont iconfenxiang mr-10 text-36" />
          {{ info.shareNum }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: Object,
    index: {
      type: [Number, String],
      default: -1,
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['follow', 'mark', 'comment', 'share'],
  data() {
    return {
      info: null,
    }
  },
  watch: {
    item: {
      handler(val) {
        this.info = val
      },
      immediate: true,
    },
  },
  methods: {
    // 关注
    follow(value) {
      this.$emit('follow', {
        value,
        index: this.index,
      })
    },
    // 表情处理
    handleIcon(type, item = null) {
      if (!item) return
      const index = item.index
      if (type === 'smile') {
        if (index === 1) {
          return 'active,icondianzan'
        }
        else {
          return 'iconthumbsup'
        }
      }
      else {
        if (index === 2) {
          return 'active,iconz-nolikeFill'
        }
        else {
          return 'iconz-nolike'
        }
      }
    },
    // 操作表情
    handleMark(value) {
      this.$emit('mark', {
        value,
        index: this.index,
      })
    },
    // 评论
    handleComment() {
      if (!this.isDetail) return this.goDetail()
      this.$emit('comment')
    },
    // 分享
    handleShare() {
      if (!this.isDetail) return this.goDetail()
      this.$emit('share')
    },
    // 进入详情页
    goDetail() {
      if (this.isDetail) return // 详情页，不跳转
      this.$u.route('pages/home/detail', {
        data: JSON.stringify(this.info),
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.course-list {
  .img-header {
    width: 100rpx;
    height: 100rpx;
    border-radius: 100%;
  }

  .tag-age {
    padding: 2rpx 10rpx;
    margin-left: 10rpx;
    font-size: 24rpx;
    color: #FFF;
    background-color: $u-primary;
    border-radius: 20rpx;

    &.girl {
      background-color: $u-error;
    }
  }

  .icon-play {
    position: absolute;
    font-size: 120rpx;
    color: #FFF;
  }

  .play-info {
    position: absolute;
    right: 10rpx;
    bottom: 10rpx;
    padding: 5rpx 20rpx;
    font-size: 25rpx;
    color: #FFF;
    background-color: rgb(153 153 153 / 75%);
    border-radius: 50rpx;
  }

  .active {
    color: #19be6b;

    view {
      color: #19be6b;
    }
  }
}
</style>
