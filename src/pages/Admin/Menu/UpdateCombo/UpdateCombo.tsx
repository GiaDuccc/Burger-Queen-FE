import styles from './UpdateCombo.module.scss'
import closeIcon from '~/assets/close.png'
import trashIcon from '~/assets/trash.png'
import increaseIcon from '~/assets/rightArrowBlack.png'
import decreaseIcon from '~/assets/leftArrowBlack.png'
import { getFoodDetail, searchFood } from '~/apis/foodAPI/foodAPI';
import { updateCombo } from '~/apis/comboAPI/comboAPI'
import { useEffect, useState } from 'react';

interface UpdateComboProps {
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


function UpdateCombo(props: UpdateComboProps) {

  const [keyword, setKeyword] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [listFoodSelected, setListFoodSelected] = useState<any[]>([]);
  const [comboActive, setComboActive] = useState(props.comboActive);

  useEffect(() => {
    const fetchSearchResults = async () => {
      await searchFood(keyword).then(data => setSearchResults(data));
    }
    if (keyword.length < 2) {
      setSearchResults([]);
      return;
    };
    fetchSearchResults();
  }, [keyword]);

  useEffect(() => {
    console.log("listFoodSelected: ", listFoodSelected);
  }, [listFoodSelected]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const comboData = {
      ...Object.fromEntries(formData),
      foods: listFoodSelected.map(item => ({
        foodId: item.food._id,
        quantity: item.quantity
      }))
    };

    console.log(comboData);
    await updateCombo(props.comboActive._id, comboData)
      .then((res) => {
        console.log('Combo updated successfully:', res);
      })
      .catch((error) => {
        console.error('Error updating combo:', error);
      });

    props.onClose();
  }

  const handleAddFood = (food: any) => {
    setListFoodSelected(prev => {
      // Kiểm tra xem món đã có trong list chưa
      const existingIndex = prev.findIndex(item => item.food._id === food._id);

      if (existingIndex !== -1) {
        // Nếu đã tồn tại → tăng quantity
        const updatedList = [...prev];
        updatedList[existingIndex] = {
          ...updatedList[existingIndex],
          quantity: updatedList[existingIndex].quantity + 1
        };
        return updatedList;
      }

      // Nếu chưa có → thêm mới
      return [...prev, { food, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (foodId: string, action: string) => {
    setListFoodSelected(prev =>
      prev.map(item => {
        if (item.food._id !== foodId) return item;

        const newQuantity =
          action === 'increase'
            ? item.quantity + 1
            : item.quantity === 1 ? 1 : item.quantity - 1;

        return { ...item, quantity: newQuantity };
      })
    );
  };

  const handleDeleteFoodSelected = (foodId: string) => {
    setListFoodSelected(prev => prev.filter(item => item.food._id !== foodId));
  }

  return (
    <div className={styles.updateComboContainer}>
      <div className={styles.updateComboDiv}>
        <div className={styles.headerDiv}>
          <h1 className={styles.headerTitle}>UPDATE COMBO</h1>
          <button className={styles.button} onClick={props.onClose}>
            <img className={styles.buttonIcon} src={closeIcon} alt="close icon" />
          </button>
        </div>
        <form className={styles.updateComboContent} onSubmit={(e) => handleSubmit(e)}>
          {fields.map((field) => (
            <div className={styles.updateComboFieldDiv} key={field.field}>
              {field.field === 'items' ? (
                <>
                  <div className={styles.fieldItemsDiv}>
                    <h3 className={styles.fieldTitle}>{field.label}</h3>
                    <div className={styles.fieldFoodSearchDiv}>
                      <input
                        className={styles.fieldInput}
                        style={{ height: '36px', borderRadius: '12px', width: '100%' }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault(); // ⛔ chặn submit khi nhấn Enter
                          }
                        }}
                        placeholder="Search food"
                      />
                      {searchResults.length > 0 && isSearchFocused && (
                        <ul className={styles.listFoodSearchDiv}>
                          {searchResults.map((item: any) => (
                            <li
                              key={item._id}
                              onMouseDown={() => handleAddFood(item)}
                              className={styles.foodSearchItem}
                            >
                              <img
                                src={item.imageUrl}
                                alt={item.foodName}
                                className={styles.foodSearchItemImage}
                              />
                              <div className={styles.foodSearchItemInfo}>
                                <p className={styles.foodSearchItemName}>{item.foodName}</p>
                                <p className={styles.foodSearchItemPrice}>
                                  {item.price}
                                  <span className={styles.currency}>đ</span>
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
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
                        <div className={styles.foodSelectedItemFunctions}>
                          <button
                            type='button'
                            className={styles.trashButton}
                          >
                            <img
                              src={trashIcon}
                              className={styles.buttonIcon}
                              onClick={() => handleDeleteFoodSelected(item.food._id)}
                            />
                          </button>
                          <div className={styles.foodSelectedUpdateQuantityDiv}>
                            <button
                              type='button'
                              className={styles.foodSelectedUpdateQuantityButton}
                              onClick={() => handleUpdateQuantity(item.food._id, 'decrease')}
                            >
                              <img src={decreaseIcon} alt="decrease icon" className={styles.buttonIcon} />
                            </button>
                            <div className={styles.foodSelectedQuantity}>{item.quantity}</div>
                            <button
                              type='button'
                              className={styles.foodSelectedUpdateQuantityButton}
                              onClick={() => handleUpdateQuantity(item.food._id, 'increase')}
                            >
                              <img src={increaseIcon} alt="increase icon" className={styles.buttonIcon} />
                            </button>
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // ⛔ chặn submit khi nhấn Enter
                      }
                    }}
                    onChange={(e) => setComboActive({ ...comboActive, [field.field]: e.target.value })}
                  />
                </>
              )}

            </div>
          ))}
          <div className={styles.updateButtonDiv}>
            <button type="submit" className={styles.updateButton}>UPDATE COMBO</button>
          </div>
        </form>
      </div >
    </div >
  )
}

export default UpdateCombo
