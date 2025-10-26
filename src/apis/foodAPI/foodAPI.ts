import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const getAllFoodbyType = async (foodType: string) => {
  const response = await axios.get(`${API_ROOT}/v1/food/getAllFoodbyType`, { params: { foodType } })
  return response.data
}

export const getFoodType = async () => {
  const response = await axios.get(`${API_ROOT}/v1/food/getFoodType`)
  return response.data
}

export const createFood = async (foodData: object) => {
  const response = await axios.post(`${API_ROOT}/v1/food`, foodData)
  return response.data
}

export const deleteFood = async (foodId: string) => {
  const response = await axios.delete(`${API_ROOT}/v1/food/${foodId}`)
  return response.data
}

export const searchFood = async (keyword: string) => {
  const response = await axios.get(`${API_ROOT}/v1/food/searchFood?keyword=${keyword}`)
  return response.data
}