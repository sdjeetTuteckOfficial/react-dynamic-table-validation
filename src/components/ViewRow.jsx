import React from 'react';
import { TableRow, TableCell } from '@mui/material';

export default function ViewRow({ item, columns, key, onRowClick }) {
  return (
    <TableRow key={key} onClick={() => onRowClick(item)}>
      {columns.map((column, index) => (
        <TableCell key={index}>{item[column.field]}</TableCell>
      ))}
    </TableRow>
  );
}
