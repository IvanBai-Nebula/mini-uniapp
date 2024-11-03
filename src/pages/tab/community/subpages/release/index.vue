<template>
  <!-- 首页/发布页 -->
  <view class="release">
    <!-- 自定义导航栏 -->
    <u-navbar :auto-back="true" placeholder>
      <template #center>
        <view>
          <view class="w-100 flex items-center justify-center text-30" @click="changeAction">
            {{ actionCurrent }}
            <view class="iconfont iconxiala2" />
          </view>
        </view>
      </template>
    </u-navbar>
    <view class="wrap-card">
      <!-- 文本域 -->
      <view class="my-20 text-gray-500">
        想说点啥
      </view>
      <u-textarea
        v-model="textContent" maxlength="100" height="100" placeholder="随便说点儿什么吧..." count
        confirm-type="done"
      />
      <!-- 上传多图 -->
      <view class="my-20 text-gray-500">
        分享图片
      </view>
      <u-upload
        ref="upload" :file-list="imgList" name="1" multiple :max-count="9" preview-full-image
        @after-read="handUpload" @delete="deletePic"
      />
    </view>
    <!-- 底部操作栏 -->
    <view class="bottom-handle">
      <!-- TODO: 菜单功能待完善 -->
      <view
        class="iconfont iconcaidan animate__animated mx-10 text-50" hover-class="animate__jello"
        @click="handleBottom('XXXXXX')"
      />
      <!-- TODO: 话题功能待完善 -->
      <view
        class="iconfont animate__animated iconhuati mx-10 text-50" hover-class="animate__jello"
        @click="handleBottom('XXXXXX') "
      />
      <view
        class="iconfont animate__animated icontupian mx-10 text-50" hover-class="animate__jello"
        @click="handleBottom('upload')"
      />
      <view class="ml-auto mr-20">
        <u-button
          text="发布" color="linear-gradient(to right, #dcc20b, #01906c)"
          :custom-style="{ width: '150rpx', height: '60rpx' }" @click="submit"
        />
      </view>
    </view>
    <!-- 中间弹出公告栏 -->
    <u-popup :show="popupShow" round="20" mode="center" :custom-style="{ width: '80%' }">
      <view class="m-20 flex flex-col items-center justify-center">
        <view class="flex items-center justify-center">
          <image class="notice-img" src="/static/images/demo/summer.svg" mode="widthFix" />
        </view>
        <view class="my-20 flex flex-col">
          <view>严禁发表以下信息：</view>
          <view>1、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的信息</view>
          <view>2、侮辱或者诽谤他人，侵害他人合法权益的信息</view>
          <view>3、煽动民族仇恨、民族歧视，破坏民族团结的信息</view>
        </view>
        <u-button :custom-style="btnStyle" :ripple="true" shape="circle" @click="closePopup">
          朕知道了
        </u-button>
      </view>
    </u-popup>
    <!-- 底部弹出操作菜单 -->
    <u-action-sheet
      :description="actionDesc" round="20" :actions="actionList" :show="actionShow"
      :safe-area-inset-bottom="true" cancel-text="取消" @select="selectAction" @close="actionShow = false"
    />
  </view>
</template>

<script setup>
// 页面数据
const textContent = ref('')
const actionCurrent = ref('所有人可见')
const actionDesc = '请设置您本条信息的访问权限'
const actionList = reactive([
  { name: '所有人可见' },
  { name: '仅好友可见' },
  { name: '仅自己可见' },
])
const actionShow = ref(false)
const imgList = reactive([
  { url: '/static/images/demo/autumn.svg' },
  { url: '/static/images/demo/winter.svg' },
])
const popupShow = ref(true)
const btnStyle = reactive({
  width: '450rpx',
  height: '75rpx',
  background: 'linear-gradient(-45deg,#01906c,#34D399)',
  color: '#FFFFFF',
  fontSize: '30rpx',
})
const draftShow = ref(true)
const form = reactive({ images: '' })

// 监听页面加载
onMounted(() => {
  uni.getStorage({
    key: 'releaseDraft',
    success: (res) => {
      const data = JSON.parse(res.data)
      textContent.value = data.textContent
      imgList.splice(0, imgList.length, ...data.imgList)
    },
  })
})

// 提示保存为草稿
function tipDraft() {
  uni.showModal({
    content: '是否要保存为草稿',
    cancelText: '不保存',
    confirmText: '保存',
    success: (res) => {
      if (res.confirm) {
        saveDraft()
      }
      else {
        uni.removeStorage({ key: 'releaseDraft' })
      }
      draftShow.value = false
      router.go(-1)
    },
  })
}

// 保存草稿
function saveDraft() {
  uni.setStorage({
    key: 'releaseDraft',
    data: JSON.stringify({
      textContent: textContent.value,
      imgList,
    }),
  })
}

// 提交
function submit() {
  draftShow.value = false
  router.go(-1)
}

// 选择访问
function changeAction() {
  actionShow.value = true
}

// 选中操作菜单
function selectAction(e) {
  actionCurrent.value = e.name
  actionShow.value = false
}

// 关闭公告
function closePopup() {
  popupShow.value = false
}

// 删除图片
function deletePic(index) {
  imgList.splice(index, 1)
}

// 自动上传
async function autoUpload(event) {
  const chooseList = [].concat(event.file)
  let fileListLen = imgList.length
  chooseList.forEach((item) => {
    imgList.push({ ...item, status: 'uploading', message: '上传中' })
  })
  for (let i = 0; i < chooseList.length; i++) {
    const url = await uploadFilePromise(chooseList[i].url)
    const item = imgList[fileListLen]
    imgList.splice(fileListLen, 1, { ...item, status: 'success', message: '', url })
    fileListLen++
  }
}

// 手动上传
function handUpload(event) {
  const chooseList = [].concat(event.file)
  chooseList.forEach((item) => {
    imgList.push({ ...item, status: '', message: '' })
  })
}

// 手动上传提交
async function handUploadSubmit() {
  if (!imgList.length) {
    return uni.showToast({ title: '请选择文件', icon: 'none' })
  }
  const imgUrls = []
  for (const item of imgList) {
    let url = item.url
    if (url.startsWith('blob')) url = await uploadFilePromise(url)
    imgUrls.push(url)
  }
  form.images = imgUrls.join(',')
}

// 上传图片
function uploadFilePromise(url) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: 'http://192.168.2.21:7001/upload',
      filePath: url,
      name: 'file',
      formData: { user: 'test' },
      success: (res) => {
        setTimeout(() => {
          const responseData = JSON.parse(res.data)
          resolve(responseData.url)
        }, 1000)
      },
      fail: (error) => {
        reject(error)
      },
    })
  })
}

// 底部操作
function handleBottom(type) {
  if (type === 'upload') {
    this.$refs.upload.chooseFile()
  }
}

// 导出需要在模板中使用的函数
defineExpose({
  tipDraft,
  autoUpload,
  handUploadSubmit,
})
</script>

<style lang="scss" scoped>
.release {
  .notice-img {
    width: 300rpx;
    height: 300rpx;
  }

  .bottom-handle {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    height: 85rpx;
    background-color: #fff;
    border-top: 1px solid black;
  }
}
</style>
