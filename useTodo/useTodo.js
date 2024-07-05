import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodo = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  const handleNewTodo = (todo) => {
    const action = {
      type: 'ADD_TODO',
      payload: todo,
    };
    dispatch(action);
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos) || []);
  }, [todos]);

  const handleDeleteTodo = (todo) => {
    const action = {
      type: 'DELETE_TODO',
      payload: todo,
    };
    dispatch(action);
  };

  const handleToggleTodo = (todo) => {
    const action = {
      type: 'TOGGLE_TODO',
      payload: todo,
    };
    dispatch(action);
  };

  const todosCount = todos.length;
  const pendingTodosCount = todos.filter((todo) => !todo.done).length;

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount,
    pendingTodosCount,
  };
};
