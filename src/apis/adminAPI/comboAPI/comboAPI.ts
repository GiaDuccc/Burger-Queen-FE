import axiosAdmin from '../axiosAdmin'

export const getAllCombo = async () => {
  const response = await axiosAdmin.get(`combo`)
  return response.data
}

export const deleteCombo = async (comboId: string) => {
  const response = await axiosAdmin.delete(`combo/${comboId}`)
  return response.data
}

export const createCombo = async (data: object) => {
  const response = await axiosAdmin.post(`combo`, data);
  return response.data;
}

export const updateCombo = async (comboId: string, data: object) => {
  const response = await axiosAdmin.put(`combo/${comboId}`, data);
  return response.data;
}