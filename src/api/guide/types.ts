import type { PaginationParams, PaginationResult } from '@/api/common/types'

// 导航栏标签
export interface TabItem {
  index: number; // 索引
  name: string; // 名称
}

// 导航栏标签列表结果
export interface TabListResult {
  list: Array<TabItem>;
}

// 导航栏标签列表
export type TabList = Array<TabItem>

// 课程请求参数
export interface CourseParams extends PaginationParams {
  id: number;
}

// 课程
export interface CourseListItem {
  id: number;
  title: string;
  cover: string;
  learn_record: number;
}

// 课程列表请求结果
export interface CourseResult {
  list: Array<CourseListItem>;
  pagination: PaginationResult;
}

// 课程列表
export type CourseList = Array<CourseListItem>
export type AllCourseList = Array<CourseResult>

// 课程详情请求参数
export interface CourseDetailParams {
  id: number;
}

// 题库请求参数
export interface QuizParams {
  quiz_set: number; // 题库编号
}

// 选项
export interface Option {
  opt_num: string; // 编号
  answer: string; // 答案
  score: number; // 分值
}

// 问题
export interface QuizListItem {
  id: number; // 题目id
  question: string; // 题目内容
  options: Array<Option>; // 选项列表
}

// 题库请求结果
export interface QuizResult {
  title: string; // 题库名称
  des: string; // 题库描述
  img: string; // 题库封面
  list: Array<QuizListItem>; // 题目列表
}

// 题库列表
export type QuizList = Array<QuizListItem>
