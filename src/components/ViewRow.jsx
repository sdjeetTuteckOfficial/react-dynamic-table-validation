import React from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';

export default function ViewRow({
  item,
  columns,
  key,
  onRowClick,
  editingId,
  isItemSelected,
  labelId,
  handleCheckboxClick,
}) {
  return (
    <TableRow key={key}>
      <TableCell padding='checkbox'>
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      {columns.map((column, index) => (
        <TableCell key={index} onClick={() => onRowClick(item)}>
          {item[column.field]}
        </TableCell>
      ))}
      {editingId && <TableCell></TableCell>}
    </TableRow>
  );
}
