import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// const counter = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1;
//     case 'DECREMENT':
//       return state - 1;
//     default:
//       return state;
//   }
// }

// const Counter = ({
//   value,
//   onIncrement,
//   onDecrement
// }) => (
//   <div>
//     <h1>{value}</h1>
//     <button onClick={onIncrement}>+</button>
//     <button onClick={onDecrement}>-</button>
//   </div>
// )

// const store = createStore(counter);

const todo = (state = {}, action) => {
  switch (action.type) {
    case ('ADD_TODO'):
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case ('TOGGLE_TODO'):
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default: 
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case ('ADD_TODO'):
      return [
        ...state,
        todo(undefined, action)
      ];
    case ('TOGGLE_TODO'):
      return state.map(t => todo(t, action));
    default:
      return state;
  }
}

const visibilityFilter = (
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case ('SET_VISIBILITY_FILTER'):
      return action.filter;
    default:
      return state;
  }
};

const getVisibleTodos = (
  todos, filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(
        t => !t.completed
      );
    case 'SHOW_COMPLETED':
      return todos.filter(
        t => t.completed
      );
  }
}

const addTodo = (idx, text) => {
  return {
    type: 'ADD_TODO',
    id: idx,
    text
  };
}

const toggleTodo = (idx) => {
  return {
    type: 'TOGGLE_TODO',
    id: idx
  };
}

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   }
// }
const store = createStore(todoApp);
// console.log(store.getState());
// store.dispatch(addTodo(0, 'learning redux'));
// console.log(store.getState());
// store.dispatch(toggleTodo(0));
// console.log(store.getState());
// store.dispatch({
//   type: 'SET_VISIBILITY_FILTER',
//   filter: 'SHOW_COMPLETED'
// })
// console.log(store.getState());
const AddTodo = ({
  onAddClick
}) => {
  let input;
  return (
    <div>
      <p>This is my first React Redux Web App.</p>
      <input
        ref={ node => {
          input = node;
        }} 
      />
      <button
        onClick={ () => {
          onAddClick(input.value);
          input.value = '';
        }}
      >Add Todo</button>
    </div>
  )
}

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li onClick={onClick} style={{
    textDecoration: completed ? 'line-through' : 'none'
  }}>{ text }</li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo => 
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
      />
    )}
  </ul>
)

const FilterLink = ({
  filter,
  currentFilter,
  children,
  onClick
}) => {
  if (filter === currentFilter) {
    return <span>{children}</span>
  }
  return (
    <a href='#'
      onClick={ (e) => {
        e.preventDefault();
        onClick(filter)
      }}
    > {children}
    </a>
  )
}

const Footer = ({
  visibilityFilter,
  onFilterClick
}) => {
  return (
    <p>
      Show:
      {' '} <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>
      {' '} <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Completed</FilterLink>
      {' '} <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
    </p>
  )
}

let nextIdxId = 0;
const App = ({
  todos,
  visibilityFilter
}) => (
  <div>
    <AddTodo
      onAddClick={(text) => {store.dispatch(addTodo(nextIdxId++, text))}}
    />
    <TodoList 
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={ id => 
        store.dispatch({
          type: 'TOGGLE_TODO',
          id
        })
      }
    />
    <Footer
      visibilityFilter={visibilityFilter}
      onFilterClick={filter => 
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          filter
        })
      }
    />
  </div>
)

// const App = () => ( 
//   <div>
//     <p>This is my first React Redux Web App.</p>
//     <input />
//   </div>
// )

const render = () => {
  ReactDOM.render(<App {...store.getState()} />, document.getElementById('root'));
  console.log(store.getState())
}

store.subscribe(render);
render();
registerServiceWorker();