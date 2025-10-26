import styles from './AddFood.module.scss'
import closeIcon from '~/assets/close.png'
import { createFood } from '~/apis/foodAPI/foodAPI';

interface AddFoodProps {
  onClose: () => void;
  foodTypeActive: string;
}

const fields = [
  { field: 'foodName', label: 'Food Name' },
  { field: 'foodType', label: 'Food Type' },
  { field: 'description', label: 'Description' },
  { field: 'favor', label: 'Favor' },
  { field: 'price', label: 'Price' },
  { field: 'imageUrl', label: 'Image URL' }
]

function AddFood(props: AddFoodProps) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, foodTypeActive: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set('foodType', foodTypeActive);
    console.log(Object.fromEntries(formData));
    await createFood(Object.fromEntries(formData))
      .then((res) => {
        console.log('Food created successfully:', res);
      })
      .catch((error) => {
        console.error('Error creating food:', error);
      });
      
    props.onClose();
  }

  return (
    <div className={styles.addFoodContainer}>
      <div className={styles.addFoodDiv}>
        <div className={styles.headerDiv}>
          <h1 className={styles.headerTitle}>ADD FOOD</h1>
          <button className={styles.button} onClick={props.onClose}>
            <img className={styles.buttonIcon} src={closeIcon} alt="close icon" />
          </button>
        </div>
        <form className={styles.addFoodContent} onSubmit={(e) => handleSubmit(e, props.foodTypeActive)}>
          {fields.map((field) => (
            <div className={styles.addFoodFieldDiv} key={field.field}>
              <h3 className={styles.fieldTitle}>{field.label}</h3>
              {field.field === 'foodType' ? (
                <input name={`${field.field}`} type="text" className={styles.fieldInputActived} placeholder={props.foodTypeActive} value={props.foodTypeActive} disabled />
              ) : (
                <input name={`${field.field}`} type={field.field === 'price' ? 'number' : 'text'} className={styles.fieldInput} placeholder={`Enter ${field.label}`} />
              )}
            </div>
          ))}
          <div className={styles.addButtonDiv}>
            <button type="submit" className={styles.addButton}>ADD FOOD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddFood
