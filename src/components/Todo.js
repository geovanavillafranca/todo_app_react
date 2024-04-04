import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ todos, deleteTodo, updateStatus }) => {
  return (
    <div>
      {todos.map(task => {
            return (
                <div className='todo-list'>
                  <input type='checkbox' checked={task.isCompleted} onClick={() => updateStatus(task.id, task.isCompleted)}></input>
                  <p>{task.name}</p>
                  <div className='todo-icons'> 
                    {/* <FontAwesomeIcon className="edit-icon" icon={faPenToSquare} /> */}
                    <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => deleteTodo(task.id)} />
                  </div>
                </div>

            )
          }
        )
      }
    </div>
  )
}

export default Todo