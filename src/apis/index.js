import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchProductDetailsAPI = async (productId) => {
  const response = await axios.get(`${API_ROOT}/v1/products/${productId}`)
  return response.data
}