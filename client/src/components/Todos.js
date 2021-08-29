import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [values, setValues] = useState({
    title: '',
    description: '',
  });
  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAccessTokenSilently, user?.sub]);

  const getTodos = async () => {
    try {
      const token = await getAccessTokenSilently();

      const res = await fetch('http://localhost:9000/api/v1/todos', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };
  const { title, description } = values;
  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const todo = { title, description };
      const token = await getAccessTokenSilently();

      const res = await axios.post('http://localhost:9000/api/v1/todos', todo, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      });
      const data = res.json();
      console.log(data);
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            onChange={handleChange('title')}
            value={title}
            name='title'
            type='text'
            placeholder='Add to do'
          />
        </div>
        <div>
          <input
            onChange={handleChange('description')}
            value={description}
            name='description'
            type='text'
            placeholder='Description'
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      <h4>Your todos</h4>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
