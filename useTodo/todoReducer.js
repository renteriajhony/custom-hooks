export const todoReducer = (initialState = [], action = {}) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...initialState, action.payload];
    case 'DELETE_TODO':
      return initialState.filter((todo) => todo.id !== action.payload.id);
    case 'TOGGLE_TODO':
      return initialState.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      });
    case 'FIN_TODO':
      throw new Error('delete todo not implemented');
    default:
      return initialState;
  }
};
