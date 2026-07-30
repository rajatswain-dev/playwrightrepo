export interface User {
  email: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
  name?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface TodoItem {
  id?: number;
  title: string;
  completed: boolean;
}
