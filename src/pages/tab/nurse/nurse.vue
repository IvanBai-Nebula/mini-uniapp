<template>
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
</style>
