import React from 'react';
import './TodoListItem.css';

export default class TodoListItem extends React.Component {
  state = {
    done: false,
    important: false,
  };

  // зачеркивает
  onLabelClick = () => {
    this.setState(({ done }) => {
      return { done: !done };
    });
  };

  // выделяет
  onMarkImportant = () => {
    this.setState((state) => {
      return {
        important: !state.important,
      };
    });
  };

  render() {
    const { label, onDeleted } = this.props;
    const { done, important } = this.state;

    let className = 'todo-list-item';
    // зачеркивает строку
    if (done) {
      className += ' done';
    }
    // выделяет строку
    if (important) {
      className += ' important';
    }

    return (
      <span className={className}>
        <span className='todo-list-item-label' onClick={this.onLabelClick}>
          {label}
        </span>
        <div>
          <button
            type='button'
            className='btn btn-outline-success btn-sm float-right'
            onClick={this.onMarkImportant}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-lightning-charge-fill'
              viewBox='0 0 16 16'
            >
              <path d='M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z' />
            </svg>
          </button>

          <button
            type='button'
            className='btn btn-outline-danger btn-sm float-right'
            onClick={onDeleted}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-trash'
              viewBox='0 0 16 16'
            >
              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
              <path
                fillRule='evenodd'
                d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
              />
            </svg>
          </button>
        </div>
      </span>
    );
  }
}
