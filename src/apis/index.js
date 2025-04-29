import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const fetchProductDetailsAPI = async (productId) => {
  const response = await axios.get(`${API_ROOT}/v1/products/${productId}`)
  return response.data
}

export const fetchGetProduct = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/products/${id}`)
  return response.data
}

export const fetchAllProductFilter = async () => {
  const response = await axios.get(`${API_ROOT}/v1/products/filter`)
  return response.data
}

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

export const fetchGetOrder = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/orders/${id}`)
  return response.data
}

export const fetchCreateOrder = async () => {
  const response = await axios.post(`${API_ROOT}/v1/orders/`)
  return response.data
}

export const addProductToOrder = async (orderId, data) => {
  const response = await axios.put(`${API_ROOT}/v1/orders/${orderId}/add-product`, data)
  return response.data
}

export const removeProductFromOrderAPI = async (orderId, data) => {
  const response = await axios.put(`${API_ROOT}/v1/orders/${orderId}/remove-product`, data)
  return response.data
}

export const increaseQuantityAPI = async (orderId, product) => {
  const response = await axios.put(`${API_ROOT}/v1/orders/${orderId}/increase-quantity`, product)
  return response.data
}

export const decreaseQuantityAPI = async (orderId, product) => {
  const response = await axios.put(`${API_ROOT}/v1/orders/${orderId}/decrease-quantity`, product)
  return response.data
}

export const addOrderToCustomer = async (userId, order) => {
  const response = await axios.put(`${API_ROOT}/v1/customers/${userId}/add-order`, order)
  return response.data
}