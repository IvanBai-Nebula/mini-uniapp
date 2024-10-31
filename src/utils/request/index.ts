// 引入配置
import type { HttpRequestConfig, HttpResponse } from 'uview-plus/libs/luch-request'
import type { IResponse } from './type'
import Request from 'uview-plus/libs/luch-request/index'
import { requestInterceptors, responseInterceptors } from './interceptors'

const http = new Request()

// 引入拦截器配置
export function setupRequest() {
  http.setConfig((defaultConfig: HttpRequestConfig) => {
    /* defaultConfig 为默认全局配置 */
    defaultConfig.baseURL = import.meta.env.VITE_API_BASE_URL
    // #ifdef H5
    if (import.meta.env.VITE_APP_PROXY === 'true') {
      defaultConfig.baseURL = import.meta.env.VITE_API_PREFIX
    }
    // #endif
    return defaultConfig
  })
  requestInterceptors(http)
  responseInterceptors(http)
}

export function request<T = any>(config: HttpRequestConfig): Promise<T> {
  return new Promise((resolve) => {
    http.request(config).then((res: HttpResponse<IResponse<T>>) => {
      console.log('[ res ] >', res)
      const data = res.data
      resolve(data as T)
    })
  })
}

export function getRequest<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'GET' })
}

export function postRequest<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'POST' })
}

export function putRequest<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'PUT' })
}

export function deleteRequest<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'DELETE' })
}

export function uploadRequest<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'UPLOAD' })
}

export function downloadRequest<T = any>(config: HttpRequestConfig): Promise<T> {
  return request({ ...config, method: 'DOWNLOAD' })
}

export default setupRequest
