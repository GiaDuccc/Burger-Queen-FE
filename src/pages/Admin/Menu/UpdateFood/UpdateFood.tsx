import styles from './UpdateFood.module.scss'
import closeIcon from '~/assets/close.png'
import { updateFood } from '~/apis/adminAPI/foodAPI/foodAPI';
import { useEffect, useState } from 'react';

interface AddFoodProps {
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

function UpdateFood(props: AddFoodProps) {

  const [foodActive, setFoodActive] = useState(props.foodActive);

  useEffect(() => {
    setFoodActive(props.foodActive);
  }, [props.foodActive]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, foodTypeActive: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('foodType', foodTypeActive);
    console.log(Object.fromEntries(formData));
    await updateFood(props.foodActive._id, Object.fromEntries(formData))
      .then((res) => {
        console.log('Food updated successfully:', res);
      })
      .catch((error) => {
        console.error('Error updating food:', error);
      });

    props.onClose();
  }

  return (
    <>
      <div className={styles.headerDiv}>
        <h1 className={styles.headerTitle}>UPDATE FOOD</h1>
        <button className={styles.button} onClick={props.onClose}>
          <img className={styles.buttonIcon} src={closeIcon} alt="close icon" />
        </button>
      </div>
      <form className={styles.updateFoodContent} onSubmit={(e) => handleSubmit(e, props.foodActive.foodType)}>
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
                onChange={(e) => setFoodActive({ ...foodActive, [field.field]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // ⛔ chặn submit khi nhấn Enter
                  }
                }}
              />
            )}
          </div>
        ))}
        <div className={styles.updateButtonDiv}>
          <button type="submit" className={styles.updateButton}>UPDATE FOOD</button>
        </div>
      </form>
    </>
  )
}

export default UpdateFood;