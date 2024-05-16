import PropTypes from 'prop-types';
import {
  TableCell,
  TableRow,
  TextField,
  IconButton,
  Checkbox,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const EditRow = ({
  handleSave,
  columns,
  item,
  schema,
  isItemSelected,
  labelId,
  handleCheckboxClick,
  index,
}) => {
  const defaultValues = {};

  // Constructing defaultValues object dynamically
  columns.forEach((column) => {
    defaultValues[column.field] = item[column.field];
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    handleSave(data);
  };

  const idRow = item.id;

  return (
    <TableRow key={idRow}>
      <TableCell padding='checkbox'>
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      {columns.map((column, index) => (
        <TableCell key={index}>
          {column.isEdit ? (
            <Controller
              name={column.field}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors[column.field]}
                  helperText={errors[column.field]?.message}
                  type={column.type ? column.type : 'string'}
                  size='small'
                />
              )}
            />
          ) : (
            item[column.field]
          )}
        </TableCell>
      ))}
      <TableCell>
        <IconButton onClick={handleSubmit(onSubmit)}>
          <SaveIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

EditRow.propTypes = {
  handleSave: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  labelId: PropTypes.string.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default EditRow;
