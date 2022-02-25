import React, { useContext, useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import './MainPage.scss';
import cx from 'classnames';

const MainPage = () => {
  const [text, setText] = useState('');
  const { userId } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  const getTodo = useCallback(async () => {
    try {
      await axios
        .get('https://mern-todo-auth.herokuapp.com/api/todo', {
          headers: {
            'Content-Type': 'application/json',
          },
          params: { userId },
        })
        .then((res) => setTodos(res.data));
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  const createTodo = useCallback(async () => {
    if (!text) return null;
    try {
      await axios
        .post(
          'https://mern-todo-auth.herokuapp.com/api/todo/add',
          { text, userId },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then((res) => {
          setTodos([...todos], res.data);
          setText('');
          getTodo();
        });
    } catch (error) {
      console.log(error);
    }
  }, [text, userId, todos, getTodo]);

  const removeTodos = useCallback(
    async (id) => {
      try {
        await axios
          .delete(
            `https://mern-todo-auth.herokuapp.com/api/todo/delete/${id}`,
            { id },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then(() => getTodo());
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo],
  );

  const completedTodo = useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `https://mern-todo-auth.herokuapp.com/api/todo/complete/${id}`,
            { id },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            setTodos([...todos], res.data);
            getTodo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todos],
  );
  const importantTodo = useCallback(
    async (id) => {
      try {
        await axios
          .put(
            `https://mern-todo-auth.herokuapp.com/api/todo/important/${id}`,
            { id },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          .then((res) => {
            setTodos([...todos], res.data);
            getTodo();
          });
      } catch (error) {
        console.log(error);
      }
    },
    [getTodo, todos],
  );

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  return (
    <div className="container">
      <div className="main-page">
        <h1>Добавить задачу</h1>
        <form className="form form-login" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                type="text"
                id="text"
                name="input"
                className="validate"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <label htmlFor="input">Задача:</label>
            </div>
          </div>
          <div className="row">
            <button className="waves-effect waves-light btn blue" onClick={createTodo}>
              Добавить
            </button>
          </div>

          <h3>Активные задачи:</h3>
          <div className="todos">
            {todos.map((todo, index) => {
              console.log(todo);
              let className = cx({
                'row flex todos-item': true,
                important: todo.important,
                completed: todo.completed,
              });
              return (
                <div className={className} key={index}>
                  <div className="col todos-num">{index + 1}</div>
                  <div className="col todos-text">{todo.text}</div>
                  <div className="col todos-buttons">
                    <i className="material-icons blue-text" onClick={() => completedTodo(todo._id)}>
                      check
                    </i>
                    <i
                      className="material-icons orange-text"
                      onClick={() => importantTodo(todo._id)}>
                      warning
                    </i>
                    <i className="material-icons red-text" onClick={() => removeTodos(todo._id)}>
                      delete
                    </i>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
