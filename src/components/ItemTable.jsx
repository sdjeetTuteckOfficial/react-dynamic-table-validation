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
  IconButton,
  TextField,
} from '@mui/material';
import ViewRow from './ViewRow';
import EditRow from './EditRow';

const ItemTable = ({ columns, items, onSaveClick, schema }) => {
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

  const handleInputChange = (e, field) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
            {editingId && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {console.log('editid', editingId)}
          {items
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item) => {
              console.log(editingId === item.id);
              return editingId === item.id ? ( // Ensure to return JSX here
                <EditRow
                  item={item}
                  key={item.id}
                  columns={columns}
                  handleSave={handleSaveClick}
                  schema={schema}
                />
              ) : (
                <ViewRow
                  item={item}
                  key={item.id}
                  columns={columns}
                  onRowClick={handleEditClick}
                  editingId={editingId}
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
