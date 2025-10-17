import React, { useEffect } from 'react'
import { fetchProductDetailsAPI } from '~/apis'

function HomePage() {

  useEffect(() => {
    console.log("chay")
    const fetchData = async () => {
      const data = await fetchProductDetailsAPI()
      console.log(data)
    }
    fetchData()
  }, [])

  return (
    <></>
  )
}

export default HomePage
