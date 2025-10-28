import axios from 'axios';
import { API_ROOT } from '~/utils/constants';

export const getAllBranch = async () => {
  const response = await axios.get(`${API_ROOT}/v1/branch`);
  return response.data;
}

export const getAllCities = async (): Promise<string[]> => {
  const response = await axios.get(`${API_ROOT}/v1/branch/getAllCities`);
  return response.data;
}

export const getBranchByCity = async (city: string) => {
  const response = await axios.get(`${API_ROOT}/v1/branch/getBranchByCity`, {
    params: { city }
  });
  return response.data;
}