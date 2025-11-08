import axiosAdmin from "../axiosAdmin"

export const getAllUserPage = async (params: Record<string, any>) => {
  const res = await axiosAdmin.get(`/user/getAllUserPage`, { params });
  return res.data;
};

export const getUserDetail = async (userId: string) => {
  const res = await axiosAdmin.get(`/user/${userId}`);
  return res.data;
}