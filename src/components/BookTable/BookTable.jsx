import React, {useEffect, useMemo, useState} from 'react';
import { Form, Table } from "react-bootstrap";
import { PencilFill, Save, Trash, XSquare } from 'react-bootstrap-icons';
import './BookTable.styles.scss';
import TablePagination from "../TablePagination";
// import EnitableTable from '.';

const BookTable = ({ columns, rows, actions }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [rowIDToEdit, setRowIDToEdit] = useState(undefined);
  const [rowsState, setRowsState] = useState(rows);
  const [editedRow, setEditedRow] = useState();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (currentPage >= rows.length / pageSize)
      setCurrentPage(1);
  }, [pageSize])

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    const newData = rows.slice(firstPageIndex, lastPageIndex);

    setRowsState(newData);
  }, [currentPage, pageSize]);

  const handleEdit = (rowID) => {
    setIsEditMode(true);
    setEditedRow(undefined);
    setRowIDToEdit(rowID);
  }

  const handleRemoveRow = (rowID) => {
    const newData = rowsState.filter(row => {
      return row.id !== rowID ? row : null
    });

    setRowsState(newData);
  }

  const handleOnChangeField = (e, rowID) => {
    const { name: fieldName, value } = e.target;

    setEditedRow({
      id: rowID,
      [fieldName]: value
    })
  }

  const handleCancelEditing = () => {
    setIsEditMode(false);
    setEditedRow(undefined);
  }

  const handleSaveRowChanges = () => {
    setTimeout(() => {
      setIsEditMode(false);

      const newData = rowsState.map(row => {
        if (row.id === editedRow.id) {
          if (editedRow.title) row.title = editedRow.title;
          if (editedRow.author) row.author = editedRow.author;
          if (editedRow.place) row.place = editedRow.place;
        }

        return row;
      })

      setRowsState(newData);
      setEditedRow(undefined)
    }, 1000)
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
        <tr>
          {columns.map((column) => {
            return <th key={column.field}>{ column.fieldName }</th>
          })}
        </tr>
        </thead>
        <tbody>
        {rowsState.map((row, index) => {
          if (index < pageSize) {
            return <tr key={row.id}>
              <td>
                {row.id}
              </td>
              <td>
                { isEditMode && rowIDToEdit === row.id
                  ? <Form.Control
                    type='text'
                    defaultValue={editedRow ? editedRow.title : row.title}
                    id={row.id}
                    name='title'
                    onChange={ (e) => handleOnChangeField(e, row.id) }
                  />
                  : row.title
                }
              </td>
              <td>
                { isEditMode && rowIDToEdit === row.id
                  ? <Form.Control
                    type='text'
                    defaultValue={editedRow ? editedRow.author : row.author}
                    id={row.id}
                    name='author'
                    onChange={ (e) => handleOnChangeField(e, row.id) }
                  />
                  : row.author
                }
              </td>
              <td>
                { isEditMode && rowIDToEdit === row.id
                  ? <Form.Select onChange={e => handleOnChangeField(e, row.id)} name="place" defaultValue={row.place}>
                    <option value='Аргентина'>Аргентина</option>
                    <option value='Бразилия'>Бразилия</option>
                    <option value='Вьетнам'>Вьетнам</option>
                    <option value='Греция'>Греция</option>
                    <option value='Дания'>Дания</option>
                    <option value='Египет'>Египет</option>
                    <option value='Индонезия'>Индонезия</option>
                    <option value='Китай'>Китай</option>
                    <option value='Латвия'>Латвия</option>
                    <option value='Мексика'>Мексика</option>
                  </Form.Select>
                  : row.place
                }
              </td>
              {actions &&
              <td>
                { isEditMode && rowIDToEdit === row.id
                  ? <button onClick={ () => handleSaveRowChanges() } className='custom-table__action-btn' disabled={!editedRow}>
                    <Save />
                  </button>
                  : <button  onClick={ () => handleEdit(row.id) } className='custom-table__action-btn'>
                    <PencilFill />
                  </button>
                }

                { isEditMode && rowIDToEdit === row.id
                  ? <button onClick={() => handleCancelEditing()} className='custom-table__action-btn'>
                    <XSquare />
                  </button>
                  : <button onClick={() => handleRemoveRow(row.id)} className='custom-table__action-btn'>
                    <Trash />
                  </button>
                }
              </td>
              }
            </tr>
          }
        })}
        </tbody>
      </Table>
      <TablePagination
        totalCount={rows.length}
        pageSize={pageSize}
        changeItemsPerPage={page => setPageSize(page)}
        onPageChange={page => setCurrentPage(page)}
        currentPage={currentPage}
      />
    </>
  );
};

export default BookTable;