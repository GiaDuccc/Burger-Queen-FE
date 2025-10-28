import Header from '~/components/Header/Header'
import Nav from '~/components/Nav/Nav'
import adminStyle from '~/pages/Admin/Admin.module.scss'
import { useEffect, useState } from 'react'
import { deleteFood, getAllFoodbyType, getFoodType } from '~/apis/foodAPI/foodAPI';
import editIcon from '~/assets/edit.png'
import trashIcon from '~/assets/trash.png'
import addIcon from '~/assets/add.png'
import menuStyle from './Menu.module.scss'
import { deleteCombo, getAllCombo } from '~/apis/comboAPI/comboAPI';
import AddFood from './AddFood/AddFood';
import AddCombo from './AddCombo/AddCombo';
import UpdateFood from './UpdateFood/UpdateFood';
import UpdateCombo from './UpdateCombo/UpdateCombo';

interface FoodByType {
  foodType: string;
  foods: object[];
}

function Menu() {

  const [foodByType, setFoodByType] = useState<FoodByType[]>([]);
  const [isAddingFoodOrCombo, setIsAddingFoodOrCombo] = useState<boolean>(false);
  const [foodActive, setFoodActive] = useState<any>({});
  const [isActiveUpdateFoodOrCombo, setIsActiveUpdateFoodOrCombo] = useState<boolean>(false);

  const handleAddFoodOrCombo = (food: any) => {
    setIsAddingFoodOrCombo(true);
    setIsActiveUpdateFoodOrCombo(false);
    setFoodActive(food);
  }

  const handleUpdateFoodOrCombo = (food: any) => {
    // console.log(food)
    setIsActiveUpdateFoodOrCombo(true);
    setIsAddingFoodOrCombo(false);
    setFoodActive(food);
  }

  const handleDeleteFood = async (id: string, type: string) => {
    console.log(id, type)
    if (type === 'combo') {
      await deleteCombo(id)
        .then((res) => {
          console.log('Combo deleted successfully:', res);
          // Refresh the food list after deletion
          fetchData();
        })
        .catch((error) => {
          console.error('Error deleting combo:', error);
        });
    }
    else {
      await deleteFood(id)
        .then((res) => {
          console.log('Food deleted successfully:', res);
          // Refresh the food list after deletion
          fetchData();
        })
        .catch((error) => {
          console.error('Error deleting food:', error);
        });
    }
  }

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
            image: food.imageUrl
          }))
        });
      })
    );
    arrayOfFood.push({
      foodType: 'combo',
      foods: await getAllCombo().then((combos) => combos.map((combo: any) => ({
        ...combo,
        image: combo.imageUrl
      })))
    })
    setFoodByType(arrayOfFood.sort((a, b) => a.foodType.localeCompare(b.foodType)));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("foodByType: ", foodByType);
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
                  <button
                    className={menuStyle.foodButton}
                    onClick={() =>
                      handleAddFoodOrCombo(item)
                    }
                  >
                    <img src={addIcon} alt="addIcon" className={menuStyle.buttonIcon} />
                  </button>
                </div>
                <div className={menuStyle.foodItemsDiv}>
                  {Array.isArray(item.foods) && item.foods.map((food: any) => (
                    <div
                      className={menuStyle.foodItemCard}
                      key={food._id}
                      onClick={() => handleUpdateFoodOrCombo(food)}
                    >
                      <div className={menuStyle.foodImageDiv}>
                        <img src={food.image} alt={food.foodName} className={menuStyle.foodImg} />
                      </div>
                      <div className={menuStyle.foodInfo}>
                        <h3 className={menuStyle.foodName}>{food.foodName ? food.foodName : food.comboName}</h3>
                        <p className={menuStyle.foodPrice}>{food.price}<span className={menuStyle.currency}>đ</span></p>
                        <div className={menuStyle.foodButtonDiv}>
                          <button
                            className={menuStyle.foodButton}
                            onClick={() => handleUpdateFoodOrCombo(food)}
                          >
                            <img src={editIcon} alt="editIcon" className={menuStyle.buttonIcon} />
                          </button>
                          <button
                            onClick={() => handleDeleteFood(food._id, item.foodType)}
                            className={menuStyle.foodButton}
                          >
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
        {isAddingFoodOrCombo && (
          <>
            {foodActive.foodType === 'combo' ? (
              <AddCombo
                onClose={() => {
                  setIsAddingFoodOrCombo(false);
                  fetchData();
                }}
              // foodTypeActive={foodTypeActive}
              />
            ) : (
              <AddFood
                onClose={() => {
                  setIsAddingFoodOrCombo(false);
                  fetchData();
                }}
                foodTypeActive={foodActive.foodType}
              />
            )}
          </>
        )}
        {isActiveUpdateFoodOrCombo && (
          <>
            {foodActive?.foodType ? (
              <UpdateFood
                onClose={() => {
                  setIsActiveUpdateFoodOrCombo(false);
                  fetchData();
                }}
                foodActive={foodActive}
              />
            ) : (
              <UpdateCombo
                onClose={() => {
                  setIsActiveUpdateFoodOrCombo(false);
                  fetchData();
                }}
                comboActive={foodActive}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Menu
