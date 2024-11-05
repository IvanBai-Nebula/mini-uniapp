import type { PaginationParams } from '@/api/common/types'

export interface InfoNum {
  index: number; // 0：没有操作，1：顶，2：踩
  smileNum: number; // 微笑数
  cryNum: number; // 哭泣数
}

export interface PostListItem {
  username: string; // 用户名
  avatar: string; // 用户头像
  sex: number; // 0 男 1 女
  birthday: string; // 年龄
  title: string; // 标题
  type: string; // images：图文，video：视频
  playNum: string; // 播放数
  playLong: string; // 播放时长
  coverPic: string; // 封面图
  infoNum: InfoNum; // 顶踩信息
  commentNum: number; // 评论数
  shareNum: number; // 分享数
}

export interface PostListResult {
  list: Array<PostListItem>;
}

export type PostList = PostListResult

// 列表请求参数
export interface PostListParams {
  mode: string; // 列表类型，hot：热门，new：最新
  pagination: PaginationParams;
}
