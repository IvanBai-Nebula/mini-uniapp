export interface CommonParams {
  [key: string]: any;
}

export interface CommonResult {
  [key: string]: any;
}

export interface UploadImageResult {
  file: string;
  url: string;
}

export interface SendCodeParams {
  phone: number;
  code: number;
}

export interface SendCodeResult {
  code: number;
}

// 列表分页参数
export interface PaginationParams {
  current_page: number; // 当前页码
  per_page: number | null; // 每页数量 (可选, 后端默认5)
}

// 列表分页结果
export interface PaginationResult extends PaginationParams {
  total_items: number; // 总数量
  total_pages: number; // 总页数
}
