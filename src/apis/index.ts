import axios from 'axios'
import { API_ROOT } from '../utils/constants'

export const fetchProductDetailsAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/food`)
  return response.data
}