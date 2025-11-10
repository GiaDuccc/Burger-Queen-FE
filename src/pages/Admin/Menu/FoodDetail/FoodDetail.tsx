import styles from '../UpdateFood/UpdateFood.module.scss'
import closeIcon from '~/assets/close.png'
import { useEffect, useState } from 'react';

interface FoodProps {
  onClose: () => void;
  foodActive: any;
}

const fields = [
  { field: 'foodName', label: 'Food Name' },
  { field: 'foodType', label: 'Food Type' },
  { field: 'description', label: 'Description' },
  { field: 'favor', label: 'Favor' },
  { field: 'price', label: 'Price' },
  { field: 'imageUrl', label: 'Image URL' }
]

function FoodDetail(props: FoodProps) {

  const [foodActive, setFoodActive] = useState(props.foodActive);

  useEffect(() => {
    setFoodActive(props.foodActive);
  }, [props.foodActive]);

  return (
    <>
      <div className={styles.headerDiv}>
        <h1 className={styles.headerTitle}>FOOD DETAIL</h1>
        <button className={styles.button} onClick={props.onClose}>
          <img className={styles.buttonIcon} src={closeIcon} alt="close icon" />
        </button>
      </div>
      <form className={styles.updateFoodContent}>
        {fields.map((field) => (
          <div className={styles.updateFoodFieldDiv} key={field.field}>
            <h3 className={styles.fieldTitle}>{field.label}</h3>
            {field.field === 'foodType' ? (
              <input name={`${field.field}`} type="text" className={styles.fieldInputActived} placeholder={props.foodActive.foodType} value={props.foodActive.foodType} disabled />
            ) : (
              <input
                name={`${field.field}`}
                type={field.field === 'price' ? 'number' : 'text'}
                className={styles.fieldInput}
                placeholder={props.foodActive[field.field]}
                value={foodActive[field.field]}
                disabled
              />
            )}
          </div>
        ))}
      </form>
    </>
  )
}

export default FoodDetail;