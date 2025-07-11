import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

import type { User, Post } from '../types';

// API configuration
const API_BASE_URL = import.meta.env.DEV
  ? '/api' // Use proxy in development
  : import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Enable CORS
  withCredentials: false,
});

// Request interceptor
apiClient.interceptors.request.use(
  config => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => {
    // Handle CORS errors
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - possibly CORS issue:', error.message);
      return Promise.reject(
        new Error(
          'Network error: Unable to reach the API. This might be a CORS issue.'
        )
      );
    }

    // Handle common errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Users
  async getUsers(): Promise<User[]> {
    const response = await apiClient.get<User[]>('/users');
    return response.data;
  },

  async getUser(id: number): Promise<User> {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  },

  // Posts
  async getPosts(): Promise<Post[]> {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  },

  async getPost(id: number): Promise<Post> {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  },

  async getPostsByUser(userId: number): Promise<Post[]> {
    const response = await apiClient.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  },
};

export default apiClient;
