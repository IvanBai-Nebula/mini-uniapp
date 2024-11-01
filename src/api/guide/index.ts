/**
 * 照护指导相关接口
 */
import type { ListParams, TabsResult } from '@/api/guide/types'
import { getRequest, postRequest } from '@/utils'
import type { CommonResult } from '@/api/common/types'

enum URL {
  tabs = '/guide/tabs',
  list = '/guide/list',
}
export const getTabs = () => getRequest<TabsResult>({ url: URL.tabs })
export const getList = (params?: ListParams) => postRequest<CommonResult>({ url: URL.list, params })
