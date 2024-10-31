// 返回res.data的interface
export interface IResponse<T = any> {
  success: boolean ;
  data: T;
  msg: string;
  status: string | number;
}
