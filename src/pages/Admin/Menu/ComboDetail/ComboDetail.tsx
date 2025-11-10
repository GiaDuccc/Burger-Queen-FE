import styles from '../UpdateCombo/UpdateCombo.module.scss'
import closeIcon from '~/assets/close.png'
import { getFoodDetail } from '~/apis/adminAPI/foodAPI/foodAPI';
import { useEffect, useState } from 'react';

interface ComboProps {
  onClose: () => void;
  comboActive: any;
}

const fields = [
  { field: 'comboName', label: 'Combo Name' },
  { field: 'description', label: 'Description' },
  { field: 'price', label: 'Price' },
  { field: 'items', label: 'Items' },
  { field: 'imageUrl', label: 'Image URL' }
]


function ComboDetail(props: ComboProps) {

  const [listFoodSelected, setListFoodSelected] = useState<any[]>([]);
  const [comboActive, setComboActive] = useState(props.comboActive);

  useEffect(() => {
    setComboActive(props.comboActive);
  }, [props.comboActive]);

  useEffect(() => {
    if (props.comboActive.foods.length) {
      const fetch = async () => {
        const tmp = await Promise.all(
          props.comboActive.foods.map(async (item: any) => {
            const foodDetail = await getFoodDetail(item.foodId);
            return {
              quantity: item.quantity,
              food: foodDetail,
            };
          })
        );
        setListFoodSelected(tmp);
      };
      fetch();
    }
  }, [props.comboActive]);

  return (
    <>
      <div className={styles.headerDiv}>
        <h1 className={styles.headerTitle}>COMBO DETAIL</h1>
        <button className={styles.button} onClick={props.onClose}>
          <img className={styles.buttonIcon} src={closeIcon} alt="close icon" />
        </button>
      </div>
      <form className={styles.updateComboContent}>
        {fields.map((field) => (
          <div className={styles.updateComboFieldDiv} key={field.field}>
            {field.field === 'items' ? (
              <>
                <div className={styles.fieldItemsDiv}>
                  <h3 className={styles.fieldTitle}>{field.label}</h3>
                  <div className={styles.fieldFoodSearchDiv}>
                  </div>
                </div>
                <div className={styles.fieldFoodSelected}>
                  {listFoodSelected.map((item, idx) => (
                    <div key={idx} className={styles.foodSelectedItem}>
                      <img src={item.food.imageUrl} alt={item.food.foodName} className={styles.foodSelectedItemImage} />
                      <div className={styles.foodSelectedItemInfo}>
                        <p className={styles.foodSelectedItemName}>{item.food.foodName}</p>
                        <p className={styles.foodSelectedItemPrice}>
                          {item.food.price}
                          <span className={styles.currency}>đ</span>
                        </p>
                      </div>
                      <div
                        className={styles.foodSelectedItemFunctions}
                        style={{ justifyContent: 'flex-end' }}
                      >
                        <div className={styles.foodSelectedUpdateQuantityDiv}>
                          <div className={styles.foodSelectedQuantity}>{item.quantity}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className={styles.fieldTitle}>{field.label}</h3>
                <input name={`${field.field}`} type={field.field === 'price' ? 'number' : 'text'}
                  className={styles.fieldInput}
                  placeholder={comboActive[field.field]}
                  value={comboActive[field.field]}
                  disabled
                />
              </>
            )}

          </div>
        ))}
      </form>
    </ >
  )
}

export default ComboDetail
