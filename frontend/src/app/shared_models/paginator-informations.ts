export interface PaginatorInformations {
  current_page: number;
  first_page_url?: string;
  from?: number;
  last_page?: number;
  last_page_url?: string;
  next_page_url?: string;
  path?: string;
  per_page: number;
  to?: number;
  total?: number;
  prev_page_url?: string;
}
