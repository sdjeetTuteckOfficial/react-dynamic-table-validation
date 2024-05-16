import { useState } from 'react';
import PropTypes from 'prop-types';
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
  TextField,
  Tooltip,
  Box,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
  const [globalSearch, setGlobalSearch] = useState('');

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
  };

  const handleSaveClick = (data) => {
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

  const handleGlobalSearchChange = (event) => {
    setGlobalSearch(event.target.value);
  };

  const filteredItems = items.filter((item) =>
    columns.some((column) =>
      item[column.field]
        .toString()
        .toLowerCase()
        .includes(globalSearch.toLowerCase())
    )
  );

  return (
    <TableContainer component={Paper}>
      <Box sx={{ padding: '16px', justifyContent: 'right', display: 'flex' }}>
        <TextField
          label='Search'
          variant='outlined'
          value={globalSearch}
          onChange={handleGlobalSearchChange}
          size='small'
          width='400px'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
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
              <TableCell key={column.field} style={{ whiteSpace: 'nowrap' }}>
                <Tooltip title={column.headerName}>
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '150px', // adjust as needed
                    }}
                  >
                    {column.headerName}
                  </span>
                </Tooltip>
              </TableCell>
            ))}
            {editingId && <TableCell>Action</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => {
              const isItemSelected = selectedItems.indexOf(item.id) !== -1;
              const labelId = `enhanced-table-checkbox-${item.id}`;
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
        count={filteredItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

ItemTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  items: PropTypes.array.isRequired,
  onSaveClick: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired,
  selectedItems: PropTypes.array.isRequired,
  onSelectChange: PropTypes.func.isRequired,
};

export default ItemTable;
