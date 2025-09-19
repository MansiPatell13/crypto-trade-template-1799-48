export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  ok: boolean;
  error?: string;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  data?: T;
  error?: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface SearchableItem {
  id: string;
  name: string;
  symbol?: string;
}