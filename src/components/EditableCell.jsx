// EditableCell.js

import React from 'react';
import { TableCell, TextField } from '@mui/material';

const EditableCell = ({
  column,
  item,
  editingId,
  editedData,
  handleInputChange,
}) => {
  return (
    <TableCell>
      {editingId === item.id ? (
        <TextField
          fullWidth
          variant='outlined'
          value={editedData[column.field] || ''}
          onChange={() => handleInputChange(item)}
        />
      ) : (
        item[column.field]
      )}
    </TableCell>
  );
};

export default EditableCell;
