import apiClient from "../ApiClint";


export const login = (data: { username: string; password: string }) =>
  apiClient.post('/auth/jwt/create/', data);

export const logout = () => apiClient.post('/auth/jwt/logout/');

export const refresh = () => apiClient.post('/auth/jwt/refresh/');
