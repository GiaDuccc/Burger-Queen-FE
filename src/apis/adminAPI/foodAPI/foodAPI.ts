import axiosAdmin from '../axiosAdmin'

export const getAllFoodbyType = async (foodType: string) => {
  const response = await axiosAdmin.get(`/food/getAllFoodbyType`, { params: { foodType } })
  return response.data
}

export const getFoodDetail = async (foodId: string) => {
  const response = await axiosAdmin.get(`/food/${foodId}`)
  return response.data
}

export const getFoodType = async () => {
  const response = await axiosAdmin.get(`/food/getFoodType`)
  return response.data
}

export const createFood = async (foodData: object) => {
  const response = await axiosAdmin.post(`/food`, foodData)
  return response.data
}

export const deleteFood = async (foodId: string) => {
  const response = await axiosAdmin.delete(`/food/${foodId}`)
  return response.data
}

export const searchFood = async (keyword: string) => {
  const response = await axiosAdmin.get(`/food/searchFood?keyword=${keyword}`)
  return response.data
}

export const updateFood = async (foodId: string, foodData: object) => {
  const response = await axiosAdmin.put(`/food/${foodId}`, foodData)
  return response.data
}