/**
 * 照护指导相关接口
 */
import type {
  CourseParams,
  CourseResult,
  QuizParams,
  QuizResult,
  TabListResult,
} from '@/api/guide/types'
import { getRequest, postRequest } from '@/utils'

enum URL {
  tabList = '/guide/tab_list',
  course = '/guide/course',
  quiz = '/guide/quiz',
}
export const getTabList = () => getRequest<TabListResult>({ url: URL.tabList })
export const postCourse = (params: CourseParams) => postRequest<CourseResult>({ url: URL.course, params })
export const postQuiz = (params: QuizParams) => postRequest<QuizResult>({ url: URL.quiz, params })
