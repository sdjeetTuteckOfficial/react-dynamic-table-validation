import PropTypes from 'prop-types';
import { TableRow, TableCell, Checkbox } from '@mui/material';

const ViewRow = ({
  item,
  columns,
  onRowClick,
  editingId,
  isItemSelected,
  labelId,
  handleCheckboxClick,
  index,
}) => {
  const idRow = item.id;
  return (
    <TableRow key={idRow}>
      {console.log(item.id)}
      <TableCell padding='checkbox'>
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      {columns.map((column, index) => (
        <TableCell key={index} onClick={() => onRowClick(item)}>
          {item[column.field]}
        </TableCell>
      ))}
      {editingId && <TableCell></TableCell>}
    </TableRow>
  );
};

ViewRow.propTypes = {
  item: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
  editingId: PropTypes.string,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default ViewRow;
