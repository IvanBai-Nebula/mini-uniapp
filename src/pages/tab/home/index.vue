<template>
  <div id="app" class="container">
    <h1 class="title">
      首页
    </h1>

    <div class="grid-container">
      <div class="grid-item">
        <img src="/static/images/home-img/patient-evaluation.png" alt="患者评价" class="icon">
        <p>患者评价</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/home-img/patient-management.png" alt="患者管理" class="icon">
        <p>患者管理</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/home-img/care-skills.png" alt="护理技能" class="icon">
        <p>护理技能</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/home-img/chinese-medicine.png" alt="中医技能" class="icon">
        <p>中医技能</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/home-img/environment-guide.png" alt="环境指导" class="icon">
        <p>环境指导</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/home-img/tool-use.png" alt="器具使用" class="icon">
        <p>器具使用</p>
      </div>
      <div class="grid-item">
        <img src="/static/images/home-img/ranking.png" alt="排行榜" class="icon">
        <p>排行榜</p>
      </div>
    </div>

    <div class="bottom-container">
      <div class="bottom-item">
        <img src="/static/images/home-img/health-evaluation.png" alt="健康自评">
        <p>健康自评</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/home-img/self-relaxation.png" alt="自我放松">
        <p>自我放松</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/home-img/fitness.png" alt="强身健体">
        <p>强身健体</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/home-img/self-healing.png" alt="自我疗愈">
        <p>自我疗愈</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/home-img/faq.png" alt="护理答疑">
        <p>护理答疑</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/home-img/community.png" alt="护理者社区">
        <p>护理者社区</p>
      </div>
      <div class="bottom-item">
        <img src="/static/images/home-img/ai-tool.png" alt="护理者AI辅助工具">
        <p>护理者AI辅助工具</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
  padding: 20px;
  height: 100vh;
  background-color: #e8f2f8;
  flex-direction: column;
}

.title {
  margin-bottom: 20px;
  font-size: 28px;
}

.grid-container {
  display: grid;
  margin-bottom: 20px;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
}

.grid-item {
  position: relative;
  padding: 15px;
  text-align: center;
  background-color: #fff;
  border: 2px solid #007bff;
  border-radius: 8px;
  transition: background-color 0.3s;
}
</style>
