import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';

import './App.css';

export default class App extends React.Component {
  state = {
    todoData: [
      { label: 'drink coffee', important: false, id: 1 },
      { label: 'drink', important: true, id: 2 },
      { label: 'coffee', important: false, id: 3 },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      // получаю индекс удаляещего элемента, ищу индекс элемента у которого такое же ид которое получил
      const idx = todoData.findIndex((el) => el.id === id);
      // удаляю выбранный элемент
      // копирую элементы до выбранного элемента и после
      // и создаю новый массив
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  render() {
    return (
      <div className='todo-app'>
        <AppHeader toDo={1} done={3} />
        <div className='top-panel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList todos={this.state.todoData} onDeleted={this.deleteItem} />
      </div>
    );
  }
}
