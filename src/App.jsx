import { useState } from 'react';
import './App.css';
import ItemTable from './components/ItemTable';
import { itemsTable, columns } from './config/config';
import * as yup from 'yup';

function App() {
  const [items, setItems] = useState(itemsTable);

  const schema = yup.object().shape({
    received_quantity: yup.string().required('Received quantity is required'),
    damaged_quantity: yup.string().required('Received quantity is required'),
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
