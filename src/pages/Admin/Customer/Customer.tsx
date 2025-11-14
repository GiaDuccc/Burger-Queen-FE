import customerStyles from './Customer.module.scss'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllUserPage } from '~/apis/adminAPI/customerAPI/customerAPI';
import filterIcon from '~/assets/filter.png';
import Pagination from '~/components/Pagination/Pagination';

const filterOptions = ['Newest', 'Oldest', 'A-Z', 'Z-A'];

function Customer() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [customers, setCustomers] = useState([]);
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

  const fetchCustomers = async () => {
    await getAllUserPage({
      page: currentPage.toString(),
      limit: limit.toString(),
      filter: filter,
    })
      .then((data) => {
        if (data.users.length === 0) toast.info("No customers found");
        setCustomers(data.users);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        toast.error(error.message);
      })
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
    fetchCustomers();
  }, [searchParams]);

  return (
    <div className={customerStyles.container}>
      <div className={customerStyles.content}>
        <div className={customerStyles.header}>
          <h1 className={customerStyles.title}>CUSTOMERS</h1>
          <button
            type='button'
            className={customerStyles.filterButton}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            onBlur={() => setIsFilterOpen(false)}
          >
            <img className={customerStyles.buttonIcon} src={filterIcon} alt="Filter" />
            {isFilterOpen && (
              <ul className={customerStyles.filterDropdown}>
                {filterOptions.map((option) => (
                  <li
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className={customerStyles.filterOption}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </button>
        </div>
        <div className={customerStyles.customerList}>
          {customers.length > 0 && customers.map((customer: any) => (
            <div key={customer._id} className={customerStyles.customerCard}>
              <div className={customerStyles.avatar}>
                <img src={customer.avatarUrl} className={customerStyles.avatarImage} alt="Avatar" />
              </div>
              <div className={customerStyles.info}>
                <p>{customer.fullName}</p>
                <p style={{ textDecoration: 'underline', color: '#ff7d01' }}>{customer.email}</p>
                <p>{customer.phoneNumber}</p>
                <p>{customer.address}</p>
                <p className={customerStyles.time}>Join date: {new Date(customer.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
    </div>
  )
}

export default Customer
