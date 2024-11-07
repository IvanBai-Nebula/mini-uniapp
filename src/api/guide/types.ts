import type { PaginationParams, PaginationResult } from '@/api/common/types'

/*
导航栏api,df
 */

// 导航栏标签
export interface GuideCourseTabItem {
  index: number; // 索引
  name: string; // 名称
}

// 导航栏标签列表结果
export type GuideCourseTabListResult = Array<GuideCourseTabItem>

// 导航栏标签列表
export type GuideCourseTabList = GuideCourseTabListResult

/*
课程章节api,df
 */

// 章节
export interface ChapterItem {
  chapter_id: number; // 章节ID
  title: string; // 章节标题
  img: string; // 章节封面
  learn_record: number; // 学习进度
}

// 课程章节列表请求参数
export interface CourseChapterListParams extends PaginationParams {
  course_id: number; // 课程ID，即导航栏标签index
}

// 课程章节列表请求结果
export interface CourseChapterListResult {
  list: Array<ChapterItem>; // 章节列表
  pagination: PaginationResult; // 分页信息
}

// 所有课程列表
export type AllCourseChapterList = Array<CourseChapterListResult>

/*
章节详情api，df
*/

// 节
export interface Section {
  section_id: number; // 节id
  title: string; // 节标题
  learn_record: number; // 学习进度
  watched_num?: number; // 观看次数
}

// 章节详情请求参数
export interface ChapterDetailParams {
  chapter_id: number; // 章节ID
}

// 章节详情
export interface ChapterDetailResult {
  title: string; // 章节标题
  des: string; // 章节描述
  list: Array<Section>; // 节列表
  video: string; // 视频地址
  quiz_set_id: number; // 题库id
  watched_num?: number; // 观看次数
  thumb_num?: number; // 点赞次数
}

export type ChapterDetail = ChapterDetailResult

/*
节详情api,df
 */

// 节详情请求参数
export interface SectionDetailParams {
  section_id: number; // 节ID
}

// 节详情请求结果
export type SectionDetailResult = Array<{ content: Array<string>; img: Array<string> }>

// 节详情即知识点列表
export type KnowledgeList = SectionDetailResult

/*
题库api
*/

// 选项
export interface Option {
  opt_num: string; // 选项编号
  answer: string; // 答案
  score: number; // 分值
}

// 题目
export interface QuizItem {
  quiz_id: number; // 题目id
  question: string; // 题目内容
  options: Array<Option>; // 选项列表
}

// 题列表
export type QuizList = Array<QuizItem>

// 题库请求参数
export interface QuizSetParams {
  quiz_set_id: number; // 题库id
}

// 题库请求结果
export interface QuizSetResult {
  title: string; // 题库名称
  des: string; // 题库描述
  img: string; // 题库封面
  list: Array<QuizItem>; // 题目列表
}
