import axiosAdmin from "../axiosAdmin"

export const getAllOrderPage = async (params: Record<string, any>, branchId: string = "") => {
  const res = await axiosAdmin.get(`/order/getAllOrderPage`, {
    params: { ...params, branchId }
  });
  return res.data;
};