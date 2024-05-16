import React from 'react';
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

export default function EditRow({
  handleSave,
  columns,
  item,
  key,
  schema,
  isItemSelected,
  labelId,
  handleCheckboxClick,
}) {
  const defaultValues = {};

  // Constructing defaultValues object dynamically
  columns.forEach((column) => {
    defaultValues[column.field] = item[column.field];
  });

  console.log('lele', defaultValues);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    handleSave(data);
  };

  return (
    <TableRow key={key}>
      <TableCell padding='checkbox'>
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
          onClick={handleCheckboxClick}
        />
      </TableCell>
      {console.log(errors)}
      {columns.map((column, index) => (
        <TableCell key={index}>
          {column.isEdit ? (
            <Controller
              name={column.field}
              control={control}
              //   defaultValue={item[column.field]}
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
}
