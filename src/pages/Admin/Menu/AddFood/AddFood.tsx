import styles from './AddFood.module.scss'
import closeIcon from '~/assets/close.png'
import { createFood } from '~/apis/adminAPI/foodAPI/foodAPI';
import { toast } from 'react-toastify';

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
    await createFood(Object.fromEntries(formData))
      .then(() => {
        toast.success('Food created successfully');
        props.onClose();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Failed to create food');
      });
  }

  return (
    <>
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
              <input
                name={`${field.field}`}
                type={field.field === 'price' ? 'number' : 'text'}
                className={styles.fieldInput}
                placeholder={`Enter ${field.label}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // ⛔ chặn submit khi nhấn Enter
                  }
                }}
              />
            )}
          </div>
        ))}
        <div className={styles.addButtonDiv}>
          <button type="submit" className={styles.addButton}>ADD FOOD</button>
        </div>
      </form>
    </>
  )
}

export default AddFood
