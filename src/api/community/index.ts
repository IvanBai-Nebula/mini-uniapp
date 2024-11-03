/**
 * 互动接口
 */
import { postRequest } from '@/utils/request'
import type { PostListParams, PostListResult } from '@/api/community/type'

enum URL {
  postList = '/community/post/list',
}

// 图片上传
export const postPostList = (params: PostListParams) => postRequest<PostListResult>({ url: URL.postList, params })
