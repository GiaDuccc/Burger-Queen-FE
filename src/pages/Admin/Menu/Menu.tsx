import Header from '~/components/Header/Header'
import Nav from '~/components/Nav/Nav'
import adminStyle from '~/pages/Admin/Admin.module.scss'
import { useSearchParams } from 'react-router-dom'
import FoodTypePage from './FoodType/Type';
function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const foodType = searchParams.get('type');

  return (
    <div className={adminStyle.container}>
      <Header />
      <div className={adminStyle.layout}>
        <Nav />
        <FoodTypePage foodType={foodType} />
      </div>
    </div>
  )
}

export default Menu
