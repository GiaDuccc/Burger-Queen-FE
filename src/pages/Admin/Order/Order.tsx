import employeeStyles from './Order.module.scss';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import filterIcon from '~/assets/filter.png';
import orderIcon from '~/assets/orderIcon.png';
import { jwtDecode } from 'jwt-decode';
import { getAllOrderPage } from '~/apis/adminAPI/orderAPI/orderAPI';
import { getUserDetail } from '~/apis/adminAPI/customerAPI/customerAPI';
import Pagination from '~/components/Pagination/Pagination';

const filterOptions = ['Newest', 'Oldest'];

interface Order {
  _id: string;
  userId: string;
  employeeId?: string;
  branchId: string;
  items: {
    itemType: "food" | "combo";
    itemId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

function Order() {

  const token = jwtDecode(localStorage.getItem('accessTokenAdmin') || '') as { employeeId: string; branchId: string; role: string };

  const [searchParams, setSearchParams] = useSearchParams();

  const [orders, setOrders] = useState<any[]>([]);
  const [orderUsers, setOrderUsers] = useState<any[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // pagination state
  const currentPage = parseInt(searchParams.get("page") || "1");
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  const [filter, setFilter] = useState(
    searchParams.get("filter") || ""
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchEmployees = async () => {
    let branchId = "";
    if (token.role !== "manager") {
      branchId = token.branchId;
    }
    await getAllOrderPage({
      page: currentPage.toString(),
      limit: limit.toString(),
      filter: filter,
    }, branchId)
      .then(async (data) => {
        console.log(data)
        if (data.orders.length === 0) {
          toast.info("No orders found");
          return;
        }
        let users = await Promise.all(data.orders.map(async (order: any) => {
          return await getUserDetail(order.userId);
        }));
        setOrderUsers(users);
        setOrders(data.orders);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setSearchParams(prev => {
        prev.set('page', newPage.toString());
        return prev;
      });

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  const handleFilterSelect = (selectedFilter: string) => {
    setFilter(selectedFilter.toLowerCase());
    setSearchParams(prev => {
      prev.set('filter', selectedFilter.toLowerCase());
      return prev;
    });
  }

  useEffect(() => {
    fetchEmployees();
  }, [searchParams]);

  useEffect(() => {
    console.log(orderUsers)
    console.log(orders)
  }, [orders]);

  return (
    <div className={employeeStyles.container}>
      <div className={employeeStyles.content}>
        <div className={employeeStyles.header}>
          <h1 className={employeeStyles.title}>ORDERS</h1>
          <button
            type='button'
            className={employeeStyles.filterButton}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            onBlur={() => setIsFilterOpen(false)}
          >
            <img className={employeeStyles.buttonIcon} src={filterIcon} alt="Filter" />
            {isFilterOpen && (
              <ul className={employeeStyles.filterDropdown}>
                {filterOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className={employeeStyles.filterOption}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </button>
        </div>
        <div className={employeeStyles.orderList}>
          {orders.length > 0 && orders.map((order: any, idx: number) => (
            <div key={idx} className={employeeStyles.orderCard}>
              <div className={employeeStyles.avatar}>
                <img src={orderUsers[idx]?.avatarUrl} className={employeeStyles.avatarImage} alt="Avatar" />
              </div>
              <div className={employeeStyles.info}>
                <p style={{ color: '#ff7d01' }}>{orderUsers[idx]?.fullName}</p>
                <p>Price: {order.total}đ</p>
                <p className={employeeStyles.time}>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className={employeeStyles.icon}>
                <img src={orderIcon} alt="Order Icon" />
              </div>
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
    </div>
  )
}

export default Order;
