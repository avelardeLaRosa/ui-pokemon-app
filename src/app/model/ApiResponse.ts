export interface ApiResponse<T> {
  code?: string;
  exitoso?: boolean;
  messages?: string;
  data?: Data<T>;
}

export class Data<T> {
  pageNumber?: number;
  pageSize?: number;
  list?: T[];
  totalElements?: number;
  totalPages?: number;
  lastRow?: boolean;
  data?: T;
}

