export interface TabItem {
  index: number;
  name: string;
}

export interface TabsResult {
  tabs: Array<TabItem>;
}

export interface ListParams {
  category: string;
}

export interface Progress {
  current: number;
  total: number;
}

export interface ListItem {
  id: number;
  title: string;
  description: string;
  img: string;
  progress: Progress;
}

export interface ListResult {
  list: Array<ListItem>;
  quiz_set: number;
}

export interface QuizListParams {
  quiz_set: number;
}

export interface Option {
  option: string;
  answer: string;
  score: number;
}

export interface Question {
  id: number;
  question: string;
  options: Array<Option>;
}

export interface QuizListResult {
  title: string;
  description: string;
  img: string;
  questions: Array<Question>;
}
