import React, { useEffect, useState } from 'react';
import { Form, Pagination } from "react-bootstrap";
import './TablePagination.style.scss';
import usePagination, { DOTS } from "./usePagination";

const TablePagination = ({
   totalCount,
   changeItemsPerPage,
   pageSize,
   onPageChange,
   currentPage,
   siblingsCount = 1
}) => {
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / pageSize));
  }, [pageSize]);

  const paginationRange = usePagination({ currentPage, totalCount, siblingsCount, pageSize })

  const handlePrevClick = () => {
    let changedPage = currentPage > 1 ? currentPage - 1 : currentPage
    onPageChange(changedPage);
  }

  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  }

  const handleChangePageSize = (e) => {
    changeItemsPerPage(+e.target.value);
  }

  return (
    <div className='custom-table__pagination'>
      <Pagination>
        <Pagination.First onClick={() => onPageChange(1)} disabled={(totalCount <= pageSize)}/>
        <Pagination.Prev onClick={() => handlePrevClick()} disabled={currentPage === 1}/>
        {paginationRange.map((pageNumber, index) => {
          let current = index + 1;

          if (pageNumber === DOTS) {
            return <Pagination.Item key={index}>&#8230;</Pagination.Item>;
          }

          return <Pagination.Item
            key={index}
            active={currentPage === current}
            onClick={() => onPageChange(current)}
            disabled={(totalCount <= pageSize)}
          >
            {current}
          </Pagination.Item>
        })}
        <Pagination.Next onClick={() => handleNextClick()} disabled={currentPage === totalPages}/>
        <Pagination.Last onClick={() => onPageChange(totalPages)} disabled={(totalCount <= pageSize)}/>
      </Pagination>
      <Form.Select
        className='select-perpage'
        defaultValue={pageSize}
        onChange={(e) => handleChangePageSize(e)}
      >
        <option value="1">1</option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </Form.Select>
    </div>
  );
};

export default TablePagination;