import axiosAdmin from '../axiosAdmin';

export const getAllBranch = async () => {
  const response = await axiosAdmin.get(`/branch`);
  return response.data;
}

export const getAllCities = async (): Promise<string[]> => {
  const response = await axiosAdmin.get(`/branch/getAllCities`);
  return response.data;
}

export const getBranchByCity = async (city: string) => {
  const response = await axiosAdmin.get(`/branch/getBranchByCity`, {
    params: { city }
  });
  return response.data;
}

export const getBranchNameById = async (branchId: string) => {
  const response = await axiosAdmin.get(`/branch/getBranchNameById/${branchId}`);
  return response.data;
}