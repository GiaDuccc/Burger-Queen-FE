import axiosAdmin from "../axiosAdmin"

export const getAllEmployees = async () => {
  const res = await axiosAdmin.get('/employee');
  return res.data;
}

export const getAllEmployeePage = async (params: Record<string, any>, branchId: string = "") => {
  const res = await axiosAdmin.get(`/employee/getAllEmployeePage`, {
    params: { ...params, branchId }
  });
  return res.data;
};