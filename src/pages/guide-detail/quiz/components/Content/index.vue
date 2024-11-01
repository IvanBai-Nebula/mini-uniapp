<template>
  <view class="question-container">
    <view class="question-type">
      单选题
    </view>
    <view class="question-content">
      如果擎天柱看到4S店会想到什么？（ ）
    </view>
    <view class="options">
      <view
        v-for="(option, index) in options"
        :key="index"
        class="option-item"
        :class="{ selected: selectedOption === index }"
        @click="selectOption(index)"
      >
        {{ option.label }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const options = ref([
  { label: 'A、这里是汽车人游乐园', value: 'A' },
  { label: 'B、我们在贩卖人口', value: 'B' },
  { label: 'C、这里是变形金刚聚集地', value: 'C' },
  { label: 'D、这里是人民公园相亲角', value: 'D' },
])

const selectedOption = ref<number | null>(null)

function selectOption(index: number) {
  selectedOption.value = index
}
</script>

<style scoped lang="scss">
.question-container {
  padding: 20px;
  background-color: #f8f8f8;
}

.question-type {
  display: inline-block;
  padding: 5px 10px;
  margin-bottom: 10px;
  color: #fff;
  background-color: #23a455;
  border-radius: 5px;
}

.question-content {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.options {
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  gap: 10px;
}

.option-item {
  padding: 15px;
  font-size: 16px;
  color: #333;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;
}

.option-item.selected {
  background-color: #e6f7ff;
  border-color: #1890ff;
}

.option-item:hover {
  background-color: #f5f5f5;
}
</style>
