import branchStyles from './Branch.module.scss'
import branchImage from '~/assets/branch.png'
import { useEffect, useState } from 'react';
import { getAllBranch, getAllCities, getBranchByCity } from '~/apis/adminAPI/branchAPI/branchAPI';

interface BranchByCity {
  city: string;
  branches: any[]; // hoặc định nghĩa interface Branch proper
}

function Branch() {

  const [branchByCity, setBranchByCity] = useState<BranchByCity[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      const cities = await getAllCities();
      const branchByCity = await Promise.all(
        cities.map(async (city) => {
          const branches = await getBranchByCity(city);
          return { city, branches };
        })
      );
      setBranchByCity(branchByCity);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    console.log(branchByCity);
  }, [branchByCity]);

  return (
    <>
      <div className={branchStyles.branchContainer}>
        <div className={branchStyles.branchContent}>
          {branchByCity.map((branchCity) => (
            <div key={branchCity.city} className={branchStyles.branchCitySection}>
              <h3 className={branchStyles.branchCityTitle}>{branchCity.city}</h3>
              <ul className={branchStyles.branchList}>
                {branchCity.branches.map((branch) => (
                  <li key={branch._id} className={branchStyles.branchItem}>
                    <div className={branchStyles.branchImageDiv}>
                      <img src={branchImage} alt={branch.branchName} className={branchStyles.branchImage} />
                    </div>
                    <div className={branchStyles.branchInfoDiv}>
                      <p className={branchStyles.branchName}>{branch.branchName}</p>
                      <p className={branchStyles.branchAddress}>{branch.address}</p>
                    </div>
                    <div className={branchStyles.branchStatusDiv}>
                      <p
                        className={branchStyles.branchStatus}
                        style={{ color: branch.status ? 'green' : 'red' }}
                      >{branch.status ? 'Open' : 'Closed'}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button onClick={async () => await getAllBranch().then((data) => console.log(data))} style={{ width: "30px", height: "30px"  }}></button>
      </div>
    </>
  )
}

export default Branch
