/**
 * 照护指导相关接口
 */
import type {
  ChapterDetailParams,
  ChapterDetailResult,
  CourseChapterListParams,
  CourseChapterListResult,
  GuideCourseTabListResult,
  QuizSetParams,
  QuizSetResult,
  SectionDetailParams,
  SectionDetailResult,
} from '@/api/guide/types'
import { getRequest, postRequest } from '@/utils'

enum URL {
  courseTabList = '/guide/course_tab_list',
  courseChapterList = '/guide/course_chapter_list',
  chapterDetail = '/guide/chapter_detail',
  sectionDetail = '/guide/section_detail',
  quizSet = '/guide/quiz_set',
}
export const getCourseTabList = () => getRequest<GuideCourseTabListResult>({ url: URL.courseTabList })
export const postCourseChapterList = (params: CourseChapterListParams) => postRequest<CourseChapterListResult>({ url: URL.courseChapterList, params })
export const postChapterDetail = (params: ChapterDetailParams) => postRequest<ChapterDetailResult>({ url: URL.chapterDetail, params })
export const postSectionDetail = (params: SectionDetailParams) => postRequest<SectionDetailResult>({ url: URL.sectionDetail, params })
export const postQuizSet = (params: QuizSetParams) => postRequest<QuizSetResult>({ url: URL.quizSet, params })
