import './App.css';
import { useState, useEffect } from 'react';
import Todo from './components/Todo';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [task, setTask] = useState('');
  const [todo, setTodo] = useState([]);

  const url = '/api/todo/';

  useEffect(() =>{
    axios.get(url).then((response) =>{
      setTodo(response.data)
      }
    )
  }, [])

  const handleSaveTask = () =>{
    axios.post(url, {'name':task}).then((response) =>{
      setTodo([...todo, response.data])
    })
    setTask('')
  }

  const deleteTodo = (id) => {
    axios.delete(`${url}${id}/`)
    setTodo(todo.filter(t => t.id !== id))
  }

  const updateStatus = (id, isCompleted) => {
    console.log(id, isCompleted)
    axios.patch(`${url}${id}/`, {'isCompleted': !isCompleted})
    const newTodo = [...todo];
    newTodo.map((t) => t.id === id ? t.isCompleted = !t.isCompleted : t)

    setTodo(newTodo)
  }


  return (
    <div className="App">
        <input type='text' className='todo-input' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Add your task here'></input>
        <button type='submit' className='todo-btn-save' onClick={handleSaveTask} ><FontAwesomeIcon className="plus-icon" icon={faPlus} /></button>

      <div className="flex-container">
        <Todo todos={todo} deleteTodo={deleteTodo} updateStatus={updateStatus}/>
      </div>
    </div>
    
  );
}

export default App;
