import { useState } from 'react';
import './App.css';
import ItemTable from './components/ItemTable';
import { itemsTable, columns } from './config/config';
import * as yup from 'yup';

function App() {
  const [items, setItems] = useState(itemsTable);
  const [selectedItems, setSelectedItems] = useState([]);

  const schema = yup.object().shape({
    quantity: yup
      .number()
      .typeError('Quantity must be a number')
      .required('Quantity is required')
      .min(0, 'Quantity must be a positive number'),
    received_quantity: yup
      .number()
      .typeError('Received quantity must be a number')
      .required('Received quantity is required')
      .min(0, 'Received quantity must be a positive number')
      .max(yup.ref('quantity'), 'Received quantity cannot exceed quantity'),
    damaged_quantity: yup
      .number()
      .typeError('Damaged quantity must be a number')
      .required('Damaged quantity is required')
      .min(0, 'Damaged quantity must be a positive number')
      .max(yup.ref('quantity'), 'Damaged quantity cannot exceed quantity'),
    comment: yup.string().when('damaged_quantity', {
      is: (val) => val > 0,
      then: (schema) =>
        schema.required('Comment is required when there is damaged quantity'),
      otherwise: (schema) => schema,
    }),
  });

  const handleSaveClick = (editedItem) => {
    console.log('values', editedItem);
    const updatedItems = items.map((item) =>
      item.id === editedItem.id ? editedItem : item
    );
    setItems(updatedItems);
  };
  console.log('hohoho');

  const handleDeleteClick = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleSelectChange = (selected) => {
    setSelectedItems(selected);
  };

  return (
    <div className='App'>
      <h1>Material-UI Table Example</h1>
      {console.log('selected', selectedItems)}
      <ItemTable
        items={items}
        onSaveClick={handleSaveClick}
        onDeleteClick={handleDeleteClick}
        columns={columns}
        schema={schema}
        selectedItems={selectedItems}
        onSelectChange={handleSelectChange}
      />
      <div>
        Selected Id:{' '}
        {selectedItems.map((id) => {
          return `${id},`;
        })}
      </div>
    </div>
  );
}

export default App;
