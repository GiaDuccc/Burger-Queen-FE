import axios from 'axios';
import { API_ROOT } from '~/utils/constants';
import axiosClient from '../axiosClient';

export const signIn = async (username: string, password: string) => {
    const response = await axiosClient.post('auth/signIn', {
      username,
      password
    });
    return response.data;
};