import './App.css';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Todo from './components/Todo';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
      <div className='save-task'> 
        <input type='text' className='todo-input' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Add your task here'></input>
        <button type='submit' className='todo-btn' onClick={handleSaveTask} >Add Task</button>
      </div>
      <div>
      </div>
      <Table striped bordered hoever>
        <thead>
          <tr>
            <th>Status</th>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

         {todo.map(t =>{
          return (
            <tr key={t.id}> 
            
              <td >
                <input type='checkbox' checked={t.isCompleted} onClick={() => updateStatus(t.id, t.isCompleted)}></input></td>
              <td >{t.name}</td>
              <td >{t.isCompleted ? 'Done' : 'To do'}</td>
              <td><Button onClick={() => deleteTodo(t.id)}><FontAwesomeIcon icon={faPenToSquare} /></Button ><FontAwesomeIcon icon={faTrash} /></td>
          </tr>)
          })}
        </tbody>
      </Table>
      <div className="flex-container">
        <div className="flex-item">
          <h3>To do</h3>
          <Todo todos={todo} deleteTodo={deleteTodo} updateStatus={updateStatus}/>
          </div>
        <div className="flex-item">
          <h3>Doing</h3>
          
          <Todo todos={todo} deleteTodo={deleteTodo} updateStatus={updateStatus}/>
          </div>
        <div className="flex-item">
        <h3>Done</h3>
        
        <Todo todos={todo} deleteTodo={deleteTodo} updateStatus={updateStatus}/>
        </div>
      </div>


          

    </div>
    
  );
}

export default App;
