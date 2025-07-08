// Common types used throughout the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export type LoadingState = 'idle' | 'pending' | 'succeeded' | 'failed';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}
