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
      // handle alert
      console.log('here');
      showAlert(true, 'danger', 'Cannot add an empty item!');
    } else if (name.length > 0 && isEditing) {
      // handle editing
    } else {
      // handle alert
      const newItem = {
        id: uuidv4(),
        title: name,
      };
      setList((prevState) => [...prevState, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', message = '') => {
    setAlert(show, type, message);
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
          <List items={list} />
          <button className='clear-btn'>Clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
