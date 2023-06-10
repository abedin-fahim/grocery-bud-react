import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    message: '',
  });

  const groceryFormHandler = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      showAlert(true, 'danger', 'Empty item cannot be added!');
    } else if (name.length > 0 && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'Item successfully updated!');
    } else {
      showAlert(true, 'success', 'Item successfully added!');

      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList((prevState) => [...prevState, newItem]);
      setName('');
    }
  };

  const clearListHandler = () => {
    showAlert(true, 'danger', 'All the items removed!');
    setList([]);
  };

  const editItem = (id, title) => {
    setEditId(id);
    setIsEditing(true);
    setName(title);
  };

  const removeItem = (id) => {
    showAlert(true, 'danger', 'Item removed');
    setList(list.filter((item) => item.id !== id));
  };

  const showAlert = (show = false, type = '', message = '') => {
    setAlert({ show, type, message });
  };

  return (
    <section className='section-center'>
      <form
        className='grocery-form'
        onSubmit={groceryFormHandler}
      >
        {alert.show && (
          <Alert
            {...alert}
            removeAlert={showAlert}
            list={list}
          />
        )}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type='submit'
            className='submit-btn'
          >
            {isEditing ? 'edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List
            items={list}
            editItem={editItem}
            removeItem={removeItem}
          />
          <button
            onClick={clearListHandler}
            className='clear-btn'
          >
            Clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
