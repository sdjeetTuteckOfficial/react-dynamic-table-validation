import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Checkbox,
  IconButton,
  TextField,
} from '@mui/material';
import ViewRow from './ViewRow';
import EditRow from './EditRow';

const ItemTable = ({
  columns,
  items,
  onSaveClick,
  schema,
  selectedItems,
  onSelectChange,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setEditedData(item);
    console.log('clicked');
  };

  const handleSaveClick = (data) => {
    console.log('ke jane', data);
    onSaveClick({
      ...editedData,
      ...data,
    });
    setEditingId(null);
    setEditedData({});
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = items.map((item) => item.id);
      onSelectChange(newSelected);
      return;
    }
    onSelectChange([]);
  };

  const handleCheckboxClick = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelected = newSelected.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    onSelectChange(newSelected);
  };

  // const handleInputChange = (e, field) => {
  //   setEditedData((prevData) => ({
  //     ...prevData,
  //     [field]: e.target.value,
  //   }));
  // };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'>
              <Checkbox
                indeterminate={
                  selectedItems.length > 0 &&
                  selectedItems.length < items.length
                }
                checked={
                  items.length > 0 && selectedItems.length === items.length
                }
                onChange={handleSelectAllClick}
                inputProps={{ 'aria-label': 'select all items' }}
              />
            </TableCell>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            {editingId && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              const isItemSelected = selectedItems.indexOf(item.id) !== -1;
              const labelId = `enhanced-table-checkbox-${item.id}`;
              console.log(editingId === item.id);
              return editingId === item.id ? (
                <EditRow
                  item={item}
                  key={item.id}
                  columns={columns}
                  handleSave={handleSaveClick}
                  schema={schema}
                  isItemSelected={isItemSelected}
                  labelId={labelId}
                  handleCheckboxClick={() => handleCheckboxClick(item.id)}
                />
              ) : (
                <ViewRow
                  item={item}
                  key={item.id}
                  columns={columns}
                  onRowClick={handleEditClick}
                  isItemSelected={isItemSelected}
                  editingId={editingId}
                  labelId={labelId}
                  handleCheckboxClick={() => handleCheckboxClick(item.id)}
                />
              );
            })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ItemTable;
