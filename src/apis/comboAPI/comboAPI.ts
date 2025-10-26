import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const getAllCombo = async () => {
  const response = await axios.get(`${API_ROOT}/v1/combo`)
  return response.data
}

export const deleteCombo = async (comboId: string) => {
  const response = await axios.delete(`${API_ROOT}/v1/combo/${comboId}`)
  return response.data
}

export const createCombo = async (data: object) => {
  const response = await axios.post(`${API_ROOT}/v1/combo`, data);
  return response.data;
}