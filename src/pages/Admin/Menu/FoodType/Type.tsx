import { useEffect, useState } from 'react';
import { getAllFoodbyType } from '~/apis/foodAPI/foodAPI';

function Type({ foodType }: { foodType: string | null }) {

  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    console.log(foodType);
    const fetchData = async () => {
      await getAllFoodbyType(foodType || '')
        .then((data) => {
          console.log(data);
          setFoodItems(data);
        })
        .catch((error) => {
          console.error('Error fetching food by type:', error);
        });
    };
    fetchData();
  }, [foodType]);

  return (
    <><h1>Type Page</h1></>
  )
}

export default Type
