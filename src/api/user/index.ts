/**
 * 用户信息相关接口
 */
import type { LoginByCodeParams, LoginParams, LoginResult, ProfileParams, RegisterParams } from './types'
import { getRequest, postRequest } from '@/utils/request'
import type { User } from '@/store/modules/user/types'
import type { CommonResult } from '@/api/common/types'

enum URL {
  login = '/weixin/login',
  quickLogin = '/weixin/quick_login',
  register = '/weixin/register',
  logout = '/user/logout',
  profile = '/user/profile',
}

export const getUserProfile = (params?: ProfileParams) => getRequest<User>({ url: URL.profile, params })
export const login = (data: LoginParams) => postRequest<LoginResult>({ url: URL.login, data })
export const quickLogin = (data: LoginByCodeParams) => postRequest<LoginResult>({ url: URL.quickLogin, data })
export const register = (data: RegisterParams) => postRequest<CommonResult>({ url: URL.register, data })
export const logout = () => postRequest<CommonResult>({ url: URL.logout })
