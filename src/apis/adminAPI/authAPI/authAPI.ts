import axios from 'axios';

export const signInAdmin = async (username: string, password: string) => {
  const response = await axios.post('http://localhost:2004/v1/admin/auth/signInAdmin', {
    username, password
  }, { withCredentials: true });

  localStorage.setItem("accessTokenAdmin", response.data.accessToken);

  return response.data;
};