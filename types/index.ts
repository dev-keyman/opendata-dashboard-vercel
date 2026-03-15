/**
 * API 응답 공통 타입
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * 페이지네이션 타입
 */
export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface GuestbookPost {
  id: number;
  author_email: string;
  author_name: string;
  content: string;
  created_at: string;
}
