import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const groceryFormHandler = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      // handle alert
    }
  };

  return (
    <section className='section-center'>
      <form
        className='grocery-form'
        onSubmit={groceryFormHandler}
      >
        {alert.show && <Alert />}
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
      <div className='grocery-container'>
        <list />
        <button className='clear-btn'>Clear items</button>
      </div>
    </section>
  );
}

export default App;
