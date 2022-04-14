import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import SearchPanel from '../SearchPanel/SearchPanel';
import TodoList from '../TodoList/TodoList';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import ItemAddForm from '../ItemAddForm/ItemAddForm';

import './App.css';

export default class App extends React.Component {
  state = {
    todoData: [
      { label: 'Drink Coffee', important: false, done: false, id: 1 },
      { label: 'Make Awesome App', important: true, done: false, id: 2 },
      { label: 'Have a lunch', important: false, done: true, id: 3 },
    ],
  };

  // метод создания постов
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: Date.now(),
    };
  }

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

  // добавление задачи в список
  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }
  // зачеркивает задачу
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      };
    });
  };
  // выделяет задачу
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important'),
      };
    });
  };

  render() {
    const { todoData } = this.state;
    // записываю в конст. все done у кого true и получаю длину нового массива
    const doneCount = todoData.filter((el) => el.done).length;
    // количество задач которое еще необходимо сделать
    const todoCount = todoData.length - doneCount;

    return (
      <div className='todo-app'>
        <AppHeader toDo={doneCount} done={todoCount} />
        <div className='top-panel d-flex'>
          <SearchPanel />
          <ItemStatusFilter />
        </div>

        <TodoList
          todos={todoData}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem} />
      </div>
    );
  }
}
