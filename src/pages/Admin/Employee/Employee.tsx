import employeeStyles from './Employee.module.scss';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import rightIcon from '~/assets/rightArrowBlack.png';
import leftIcon from '~/assets/leftArrowBlack.png';
import filterIcon from '~/assets/filter.png';
import { getAllEmployeePage } from '~/apis/adminAPI/employeeAPI/employeeAPI';

const filterOptions = ['Newest', 'Oldest', 'A-Z', 'Z-A'];

function Employee() {

  const [searchParams, setSearchParams] = useSearchParams();

  const [employees, setEmployees] = useState <any[]> ([]);
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
    await getAllEmployeePage({
      page: currentPage.toString(),
      limit: limit.toString(),
      filter: filter,
    })
      .then(async (data) => {
        console.log(data)
        if (data.employees.length === 0) {
          toast.info("No employees found");
          return;
        }
        setEmployees(data.employees);
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
    console.log(employees)
  }, [employees]);

  return (
    <div className={employeeStyles.container}>
      <div className={employeeStyles.content}>
        <div className={employeeStyles.header}>
          <h1 className={employeeStyles.title}>CUSTOMERS</h1>
          {/* <div className={employeeStyles.filterList}>
          </div> */}
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
        <div className={employeeStyles.customerList}>
          {employees.length > 0 && employees.map((employee: any) => (
            <div key={employee._id} className={employeeStyles.customerCard}>
              <div className={employeeStyles.avatar}>
                <img src={employee.avatarUrl} className={employeeStyles.avatarImage} alt="Avatar" />
              </div>
              <div className={employeeStyles.info}>
                <p>{employee.fullName}</p>
                <p style={{ textDecoration: 'underline', color: '#ff7d01' }}>{employee.email}</p>
                <p>{employee.phoneNumber}</p>
                <p>{employee.address}</p>
                <p>Join date: {new Date(employee.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={employeeStyles.pagination}>
          <button className={employeeStyles.paginationButton} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            <img className={employeeStyles.buttonIcon} src={leftIcon} alt="Previous" />
          </button>
          <p>{currentPage}</p>
          <button className={employeeStyles.paginationButton} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            <img className={employeeStyles.buttonIcon} src={rightIcon} alt="Next" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Employee;
