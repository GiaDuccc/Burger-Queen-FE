import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const getAllFoodbyType = async (foodType: string) => {
  const response = await axios.get(`${API_ROOT}/v1/food/getAllFoodbyType`, { params: { foodType } })
  return response.data
}