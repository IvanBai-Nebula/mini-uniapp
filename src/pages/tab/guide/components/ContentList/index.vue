<template>
  <view>{{ props.category }}</view>
</template>

<script lang="ts" setup>
import { useLoading } from '@/hooks'
import { getList } from '@/api/guide'

const props = defineProps({
  category: {
    type: Number,
    required: true,
  },
})
const contentList = ref([])
const quizSet = ref()
const initData = () => {
  useLoading().showLoading()
  setTimeout(async () => {
    const res = await getList({ category: props.category })
    contentList.value = res.list
    quizSet.value = res.quiz_set
    useLoading().hideLoading()
  }, 500)
}

watch(() => props.category, () => {
  initData()
  console.log('contentList', contentList.value)
  console.log('quizSet', quizSet.value)
}, { immediate: true })
</script>
