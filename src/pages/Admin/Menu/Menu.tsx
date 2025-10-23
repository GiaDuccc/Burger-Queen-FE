import Header from '~/components/Header/Header'
import Nav from '~/components/Nav/Nav'
import adminStyle from '~/pages/Admin/Admin.module.scss'
import { useEffect, useState } from 'react'
import { getAllFoodbyType, getFoodType } from '~/apis/foodAPI/foodAPI';
import editIcon from '~/assets/edit.png'
import trashIcon from '~/assets/trash.png'
import addIcon from '~/assets/add.png'
import menuStyle from './Menu.module.scss'

interface FoodByType {
  foodType: string;
  foods: object[];
}

function Menu() {

  const [foodByType, setFoodByType] = useState<FoodByType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const arrayOfFood: FoodByType[] = [];
      const type = await getFoodType();
      console.log(type)
      await Promise.all(
        type.map(async (item: { foodType: string }) => {
          console.log("item: ", item);
          const foods = await getAllFoodbyType(item.foodType);
          arrayOfFood.push({
            foodType: item.foodType,
            foods: foods.map((food: any) => ({
              ...food,
              image: 'https://api.popeyes.vn/api/v1/files/3.5.CajunCheesePopWings4pcs.png'
            }))
          });
        })
      );
      setFoodByType(arrayOfFood);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("foodByType:", foodByType);
  }, [foodByType]);


  return (
    <div className={adminStyle.container}>
      <Header />
      <div className={adminStyle.layout}>
        <Nav />
        {/* <div className={adminStyle.sidebar}>

        </div> */}
        <div className={adminStyle.content}>
          {foodByType.length > 0 &&
            foodByType.map((item) => (
              <div
                className={menuStyle.menuDiv}
                key={item.foodType}
              >
                <div className={menuStyle.menuTitleDiv}>
                  <h2 className={menuStyle.foodType} >{item.foodType}</h2>
                  <button className={menuStyle.foodButton}>
                    <img src={addIcon} alt="addIcon" className={menuStyle.buttonIcon} />
                  </button>
                </div>
                <div className={menuStyle.foodItemsDiv}>
                  {Array.isArray(item.foods) && item.foods.map((food: any) => (
                    <div
                      className={menuStyle.foodItemCard}
                      key={food._id}
                    >
                      <div className={menuStyle.foodImageDiv}>
                        <img src={food.image} alt={food.foodName} className={menuStyle.foodImg} />
                      </div>
                      <div className={menuStyle.foodInfo}>
                        <h3 className={menuStyle.foodName}>{food.foodName}</h3>
                        <p className={menuStyle.foodPrice}>{food.price}<span className={menuStyle.currency}>đ</span></p>
                        <div className={menuStyle.foodButtonDiv}>
                          <button className={menuStyle.foodButton}>
                            <img src={editIcon} alt="editIcon" className={menuStyle.buttonIcon} />
                          </button>
                          <button className={menuStyle.foodButton}>
                            <img src={trashIcon} alt="trashIcon" className={menuStyle.buttonIcon} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Menu
