import employeeStyles from './Employee.module.scss';
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import rightIcon from '~/assets/rightArrowBlack.png';
import leftIcon from '~/assets/leftArrowBlack.png';
import filterIcon from '~/assets/filter.png';
import { getAllEmployeePage, getEmployeeByBranchId } from '~/apis/adminAPI/employeeAPI/employeeAPI';
import { jwtDecode } from 'jwt-decode';
import { getAllBranch } from '~/apis/adminAPI/branchAPI/branchAPI';
import Pagination from '~/components/Pagination/Pagination';

const filterOptions = ['Newest', 'Oldest', 'A-Z', 'Z-A'];

interface employeeBranch {
  branchId: string;
  branchName: string;
  employees: any[];
}

function Employee() {

  const token = jwtDecode(localStorage.getItem('accessTokenAdmin') || '') as { employeeId: string; branchId: string; role: string };

  const [searchParams, setSearchParams] = useSearchParams();

  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeBranch, setEmployeeBranch] = useState<employeeBranch[]>([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState(
    searchParams.get("filter") || ""
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchEmployees = async () => {
    if (token.role === "manager") {
      const branches = await getAllBranch();
      console.log(branches)

      const employeeByBranch = await Promise.all(
        branches.map(async (branch: any) => {
          const employees = await getEmployeeByBranchId(branch._id);
          return {
            branchId: branch._id,
            branchName: branch.branchName,
            employees: employees
          };
        })
      );

      setEmployeeBranch(employeeByBranch);
    }

    else {
      await getAllEmployeePage({
        filter: filter,
      }, token.branchId)
        .then(async (data) => {
          console.log(data)
          if (data.employees.length === 0) {
            toast.info("No employees found");
            return;
          }
          setEmployees(data.employees);
        })
        .catch((error) => {
          toast.error(error.message);
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
    console.log(employeeBranch)
  }, [employees, employeeBranch]);

  return (
    <div className={employeeStyles.container}>
      <div className={employeeStyles.content}>
        <div className={employeeStyles.header}>
          <h1 className={employeeStyles.title}>EMPLOYEES</h1>
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
        {token.role === "manager" ? (
          <>
            {employeeBranch.length > 0 && employeeBranch.map((branch: any) => (
              <>
                {branch.employees.length > 0 && (
                  <div key={branch.branchId} className={employeeStyles.branchSection}>
                    <h2 className={employeeStyles.branchName}>{branch.branchName}</h2>
                    <div className={employeeStyles.employeeList}>
                      <div className={employeeStyles.employeeList}>
                        {branch.employees.length > 0 && branch.employees.map((employee: any) => (
                          <div key={employee._id} className={employeeStyles.employeeCard}>
                            <div className={employeeStyles.avatar}>
                              <img src={employee.avatarUrl} className={employeeStyles.avatarImage} alt="Avatar" />
                            </div>
                            <div className={employeeStyles.info}>
                              <p>
                                {employee.fullName} -
                                <span style={{ color: '#ff7d01' }}> {employee.role.slice(0, 1).toUpperCase() + employee.role.slice(1)}</span>
                              </p>
                              <p>{employee.phoneNumber}</p>
                              <p style={{ textDecoration: 'underline', color: '#ff7d01' }}>{employee.email}</p>
                              <p>{employee.address}</p>
                              <p className={employeeStyles.time}>Join date: {new Date(employee.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
          </>
        ) : (
          <div className={employeeStyles.employeeList}>
            {employees.length > 0 && employees.map((employee: any) => (
              <div key={employee._id} className={employeeStyles.employeeCard}>
                <div className={employeeStyles.avatar}>
                  <img src={employee.avatarUrl} className={employeeStyles.avatarImage} alt="Avatar" />
                </div>
                <div className={employeeStyles.info}>
                  <p>{employee.fullName}</p>
                  <p style={{ textDecoration: 'underline', color: '#ff7d01' }}>{employee.email}</p>
                  <p>{employee.phoneNumber}</p>
                  <p>{employee.address}</p>
                  <p className={employeeStyles.time}>Join date: {new Date(employee.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Employee;
