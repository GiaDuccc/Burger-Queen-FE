import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchProductDetailsAPI = async (productId) => {
  const response = await axios.get(`${API_ROOT}/v1/products/${productId}`)
  return response.data
}

export const fetchAllProductAPI = async () => {
  const response = await axios.get(`${API_ROOT}/v1/products/`)
  return response.data
}

export const fetchAllProductPageAPI = async (page, limit) => {
  const response = await axios.get(`${API_ROOT}/v1/products/`, {
    params: { page, limit }
  })
  return response
}