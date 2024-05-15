import { useState } from 'react';
import './App.css';
import ItemTable from './components/ItemTable';
import { itemsTable, columns } from './config/config';
import * as yup from 'yup';

function App() {
  const [items, setItems] = useState(itemsTable);

  const schema = yup.object().shape({
    quantity: yup.number(),
    received_quantity: yup
      .number()
      .typeError('Received quantity must be a number')
      .required('Received quantity is required')
      .max(yup.ref('quantity'), 'Received quantity cannot exceed quantity'),
    damaged_quantity: yup
      .number()
      .typeError('Damaged quantity must be a number')
      .required('Damaged quantity is required')
      .max(yup.ref('quantity'), 'Damaged quantity cannot exceed quantity'),
    comment: yup.string().required('Comment is required'),
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

  return (
    <div className='App'>
      <h1>Material-UI Table Example</h1>
      <ItemTable
        items={items}
        onSaveClick={handleSaveClick}
        onDeleteClick={handleDeleteClick}
        columns={columns}
        schema={schema}
      />
    </div>
  );
}

export default App;
