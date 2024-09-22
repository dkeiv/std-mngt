import { Pagination, Row, Col, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const BasicPagination = ({ students, itemsPerPage, handlePageChange }) => {
  const [paging, setPaging] = useState({
    totalItems: '',
    totalPages: '',
    currentPage: 1,
    prev: null,
    next: null,
  });

  useEffect(() => {
    const curTotalPages = Math.ceil(students.length / itemsPerPage);
    setPaging(prev => ({
      ...prev,
      totalItems: students.length,
      totalPages: curTotalPages,
      currentPage:
        prev.totalPages > curTotalPages ? prev.prev : prev.currentPage,
      prev: prev.currentPage <= 1 ? null : prev.currentPage - 1,
      next: prev.currentPage >= curTotalPages ? null : prev.currentPage + 1,
    }));
  }, [students, itemsPerPage]);

  const toPage = page => {
    if (page >= 0 && page <= paging.totalPages) {
      setPaging(prev => ({
        ...prev,
        currentPage: page,
        prev: page <= 1 ? null : page - 1,
        next: page >= prev.totalPages ? null : page + 1,
      }));

      handlePageChange(page);
    }
  };

  const toPrevPage = () => {
    if (paging.prev) {
      handlePageChange(paging.prev);

      setPaging(prev => ({
        ...prev,
        currentPage: prev.prev,
        prev: prev.prev <= 1 ? null : prev.prev - 1,
        next: prev.next - 1,
      }));
    }
  };

  const toNextPage = () => {
    if (paging.next) {
      handlePageChange(paging.next);

      setPaging(prev => ({
        ...prev,
        currentPage: prev.next,
        next: prev.next >= prev.totalPages ? null : prev.next + 1,
        prev: prev.prev + 1,
      }));
    }
  };

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
    <Pagination className='justify-content-center'>
      <Pagination.Prev disabled={!paging.prev} onClick={toPrevPage} />
      {items}
      <Pagination.Next disabled={!paging.next} onClick={toNextPage} />
    </Pagination>
  );
};

export default BasicPagination;
