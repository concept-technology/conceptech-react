import { useState} from 'react';
import { login, logout, refresh } from '../utils/auth';


export const BASE_URL = 'https://tmsx99-8000.csb.app'

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const { data } = await login(credentials);
    localStorage.setItem('accessToken', data.access);
    setUser(data.user);
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('accessToken');
    setUser(null);
  };

  const refreshAccessToken = async () => {
    const { data } = await refresh();
    localStorage.setItem('accessToken', data.access);
  };

  return { user, handleLogin, handleLogout, refreshAccessToken };
};
