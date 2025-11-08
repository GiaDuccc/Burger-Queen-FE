import axios from 'axios';
import axiosAdmin from '../axiosAdmin';

export const signInAdmin = async (username: string, password: string) => {
  const response = await axios.post('http://localhost:2004/v1/admin/auth/signInAdmin', {
    username, password
  }, { withCredentials: true });

  localStorage.setItem("accessTokenAdmin", response.data.accessToken);

  return response.data;
};

export const myInfo = async () => {
  const response = await axiosAdmin.get('/auth/myInfo')
  return response.data;
}