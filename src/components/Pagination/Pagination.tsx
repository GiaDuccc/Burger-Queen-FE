import paginationStyles from './Pagination.module.scss';
import rightIcon from '~/assets/rightArrowBlack.png';
import leftIcon from '~/assets/leftArrowBlack.png';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, handlePageChange }: PaginationProps) {
  return (
    <div className={paginationStyles.pagination}>
      <button className={paginationStyles.paginationButton} disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}
        style={{ display: currentPage === 1 ? 'none' : 'inline-block' }}
      >
        <img className={paginationStyles.buttonIcon} src={leftIcon} alt="Previous" />
      </button>
      <p>{currentPage}</p>
      <button className={paginationStyles.paginationButton} disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}
        style={{ display: currentPage === 1 ? 'none' : 'inline-block' }}
      >
        <img className={paginationStyles.buttonIcon} src={rightIcon} alt="Next" />
      </button>
    </div>
  )
}

export default Pagination
