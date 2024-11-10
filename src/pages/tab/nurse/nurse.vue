<!--<template>
  <div id="app" class="container">
    <div class="header">
      <img src="/static/images/nurse/house.png" alt="house icon" class="house-icon">
      <h1>健康自评</h1>
    </div>

    <div class="grid-container">
      <div class="grid-item">
        <img src="/static/images/nurse/psychology.png" alt="心理评估" class="icon">
        <p>心理评估量表</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/nurse/sleep.png" alt="睡眠评估" class="icon">
        <p>睡眠评估量表</p>
      </div>
    </div>

    <div class="bottom-container">
      <div class="bottom-item">
        <img src="/static/images/nurse/relaxation.png" alt="自我放松">
        <p>自我放松</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/nurse/fitness.png" alt="强身健体">
        <p>强身健体</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/nurse/self-healing.png" alt="自我疗愈">
        <p>自我疗愈</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HealthAssessment',
}
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
  background-color: #e8f2f8;
  border-radius: 10px;
}

.header {
  padding: 20px;
  background-color: #f8d2e1;
  border-radius: 10px;
}

.house-icon {
  width: 50px;
  height: auto;
}

.grid-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.grid-item {
  padding: 15px;
  margin: 0 10px;
  width: 120px;
  background-color: #fff;
  border: 2px solid #ff6f61;
  border-radius: 5px;
}

.icon {
  width: 40px;
  height: auto;
}

.bottom-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
}

.bottom-item {
  margin: 0 15px;
  text-align: center;
}

.bottom-item img {
  width: 40px;
  height: auto;
}
</style>-->

<template>
  <view class="wrap">
    <up-button @click="clear">清空列表</up-button>
    <up-waterfall v-model="flowList" ref="uWaterfallRef">
      <template v-slot:left="{leftList}">
        <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
          <!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
          <up-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></up-lazy-load>
          <view class="demo-title">
            {{item.title}}
          </view>

          <up-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></up-icon>
        </view>
      </template>
      <template v-slot:right="{rightList}">
        <view class="demo-warter" v-for="(item, index) in rightList" :key="index">
          <up-lazy-load threshold="-450" border-radius="10" :image="item.image" :index="index"></up-lazy-load>
          <view class="demo-title">
            {{item.title}}
          </view>

          <up-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" @click="remove(item.id)"></up-icon>
        </view>
      </template>
    </up-waterfall>
    <up-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></up-loadmore>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loadStatus: 'loadmore',
      flowList: [],
      list: [
        {
          title: '健康自评',

          /*image: 'http://pic.sc.chinaz.com/Files/pic/pic9/202002/zzpic23327_s.jpg',*/
          image: '/static/images/nurse/house.png',
        },
        {

          title: '心理评估量表',

          image: '/static/images/nurse/psychology.png',
        },
        {

          title: '睡眠评估量表',

          image: '/static/images/nurse/sleep.png',
        },
        {

          title: '自我放松',

          image: '/static/images/nurse/relaxation.png',
        },
        {

          title: '强身健体',
          image: '/static/images/nurse/fitness.png',
        },
        {

          title: '自我疗愈',
          image: '/static/images/nurse/self-healing.png',
        },
      ]
    }
  },
  onLoad() {
    this.addRandomData();
  },
  onReachBottom() {
    this.loadStatus = 'loading';
    // 模拟数据加载
    setTimeout(() => {
      this.addRandomData();
      this.loadStatus = 'loadmore';
    }, 1000)
  },
  methods: {
    addRandomData() {
      for(let i = 0; i < 10; i++) {
        let index = this.$u.random(0, this.list.length - 1);
        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(this.list[index]))
        item.id = this.$u.guid();
        this.flowList.push(item);
      }
    },
    remove(id) {
      this.$refs.uWaterfallRef.remove(id);
    },
    clear() {
      this.$refs.uWaterfallRef.clear();
    }
  }
}
</script>

<!--<style>
/* page不能写带scope的style标签中，否则无效 */
page {
  background-color: rgb(240, 240, 240);
}
</style>-->

<style lang="scss"  scoped>
.demo-warter {
  border-radius: 8px;
  margin: 5px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
}

.u-close {
  position: absolute;
  top: 32rpx;
  right: 32rpx;
}

.demo-image {
  width: 100%;
  border-radius: 4px;
}

.demo-title {
  font-size: 30rpx;
  margin-top: 5px;
 /* color: $up-main-color;*/
}

.demo-tag {
  display: flex;
  margin-top: 5px;
}

.demo-tag-owner {
 /* background-color: $up-type-error;*/
  color: #FFFFFF;
  display: flex;
  align-items: center;
  padding: 4rpx 14rpx;
  border-radius: 50rpx;
  font-size: 20rpx;
  line-height: 1;
}

.demo-tag-text {
 /* border: 1px solid $up-type-primary;*/
 /* color: $up-type-primary;*/
  margin-left: 10px;
  border-radius: 50rpx;
  line-height: 1;
  padding: 4rpx 14rpx;
  display: flex;
  align-items: center;
  border-radius: 50rpx;
  font-size: 20rpx;
}

.demo-price {
  font-size: 30rpx;
 /* color: $up-type-error;*/
  margin-top: 5px;
}

.demo-shop {
  font-size: 22rpx;
  /*color: $up-tips-color;*/
  margin-top: 5px;
}
</style>
