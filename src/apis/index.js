import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchProductDetailsAPI = async (productId) => {
  const response = await axios.get(`${API_ROOT}/v1/products/${productId}`)
  return response.data
}

export const fetchAllProductFilter = async () => {
  const response = await axios.get(`${API_ROOT}/v1/products/filter`)
  return response.data
}

// export const fetchAllProductAPI = async () => {}

export const fetchAllProductPageAPI = async (page, limit, filter = {}) => {
  const response = await axios.get(`${API_ROOT}/v1/products/`, {
    params: {
      page,
      limit,
      ...filter
    }
  })
  return response
}

export const fetchCreateCustomerAPI = async (payload) => {
  try {
    const response = await axios.post(`${API_ROOT}/v1/customers/`, payload)
    return response.data
  } catch (error) {
    throw error.response.data.errors
  }
}

export const fetchLoginAPI = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/customers/login`, data)
  return response.data
}