import type { User } from '@/store/modules/user/types'

export interface ProfileParams {
  id?: string;
}

export interface LoginParams {
  phone: string;
  code: string;
}

export interface RegisterParams extends LoginParams {
  username: string;
}

export interface LoginByCodeParams {
  code: string;
}

export interface LoginResult extends User {
}
