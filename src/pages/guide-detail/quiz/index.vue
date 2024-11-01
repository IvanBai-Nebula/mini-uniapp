<template>
  <custom-nav>
    <SonTop />
  </custom-nav>
  <SonBody :quiz-list="quizList" />
  <SonFooter />
</template>

<script setup lang="ts">
import SonTop from './components/ProgressNav/index.vue'
import SonBody from './components/Content/index.vue'
import SonFooter from './components/Actions/index.vue'

const props = defineProps({
  quizSet: {
    type: Number,
    required: true,
  },
})
const quizList = ref([])

onMounted(async () => {
  const res = await getQuizSet({ quiz_set: props.quizSet })
  quizList.value = res.list
})
</script>

<style scoped lang="scss">
.nav-bar {
  position: relative;
  display: flex; /* 使用flex布局以便更好控制子组件 */
  flex-direction: column; /* 让子组件纵向排列 */
  align-items: stretch; /* 让子组件占满整个宽度 */

  .content {
    position: relative;
    z-index: 1; /* 设置子组件在背景图片之上 */
  }

  .bg {
    .bg-img {
      @apply w-full;

      position: absolute; /* 设置为绝对定位 */
      top: 0; /* 从顶端开始 */
      z-index: -1;
      height: 30%;
      object-fit: cover; /* 图片自适应覆盖 */
    }
  }
}
</style>
