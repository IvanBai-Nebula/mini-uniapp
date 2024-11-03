/**
 * 照护指导相关接口
 */
import type { ListParams, ListResult, QuizListParams, QuizListResult, TabsResult } from '@/api/guide/types'
import { getRequest, postRequest } from '@/utils'

enum URL {
  tabs = '/guide/tabs',
  list = '/guide/list',
  quizList = '/quiz/list',
}
export const getTabs = () => getRequest<TabsResult>({ url: URL.tabs })
export const getList = (params?: ListParams) => postRequest<ListResult>({ url: URL.list, params })
export const getQuizList = (params?: QuizListParams) => getRequest<QuizListResult>({ url: URL.quizList, params })
