export type RoleType = '' | '*' | 'user'
export interface User {
  id?: string;
  username?: string;
  mobile?: string;
  avatar?: string;
  token?: string;
}

export type providerType =
  | 'weixin'
  | 'qq'
  | 'sinaweibo'
  | 'xiaomi'
  | 'apple'
  | 'univerify'
  | undefined
