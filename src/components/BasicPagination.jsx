// import studentService from '../services/student';
import { Pagination } from 'react-bootstrap';
const BasicPagination = ({ paging, toPage, toPrevPage, toNextPage }) => {
  const items = [];

  for (let i = 1; i <= paging.totalPages; i++) {
    items.push(
      <Pagination.Item
        key={`pg-${i}`}
        active={i === paging.currentPage}
        onClick={() => toPage(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size='sm'>
        <Pagination.Prev disabled={!paging.prev} onClick={toPrevPage} />
        {items}
        <Pagination.Next disabled={!paging.next} onClick={toNextPage} />
      </Pagination>
    </div>
  );
};

export default BasicPagination;
