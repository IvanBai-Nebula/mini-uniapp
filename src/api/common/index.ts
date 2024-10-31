/**
 * 通用接口
 */
import type { SendCodeParams, SendCodeResult, UploadImageResult } from './types'
import { postRequest, uploadRequest } from '@/utils/request'

enum URL {
  upload = '/common/upload',
  sendCode = '/sendCode',
}

// 图片上传
export const uploadImage = (imagePath: string) =>
  uploadRequest<UploadImageResult>({ url: URL.upload, filePath: imagePath, name: 'file' })

// 发送验证码
export const sendCode = (data: SendCodeParams) => postRequest<SendCodeResult>({ url: URL.sendCode, data })
