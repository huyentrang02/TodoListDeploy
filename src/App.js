import React, { useState, useEffect } from 'react';
import AddNewTodo from './components/AddNewTodo'
import TodoList from './components/TodoList'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  let localStorageData = JSON.parse(localStorage.getItem('todos'))
  const [todos, setTodos] = useState(localStorageData === null ? [] : localStorageData)
  const [showAdd, setShowAdd] = useState(false)
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState('all')
  const [filterList, setFilterList] = useState(todos)

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
    setFilterList(todos)
  }, [todos])

  const level = [
    "Làm ngay",
    "Phải làm",
    "Làm bao giờ cũng được",
    "Không làm chẳng sao"
  ]

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }
  
  const setNextLevel = (id) => {
    const newTodo = [...todos]
    const index = newTodo.findIndex(todo => todo.id === id)
    if (newTodo[index].level === "Làm ngay") newTodo[index].level = "Phải làm"
    else if (newTodo[index].level === "Phải làm") newTodo[index].level = "Làm bao giờ cũng được"
    else if (newTodo[index].level  === "Làm bao giờ cũng được") newTodo[index].level = "Không làm chẳng sao"
    else if (newTodo[index].level  === "Không làm chẳng sao") newTodo[index].level = "Làm ngay"
    setTodos(newTodo)
  }
  
  return (
    <div>
      <div class="box">
        <p class="decoration">To Do List - Team Web D19</p>
        <div class="de-table">
          {showAdd ? <AddNewTodo setNewTodos={setTodos} todos={todos} setShowAdd={setShowAdd} setEditing={setEditing} editing={editing}/> : null}  
          <div class="show-add"> 
          <TodoList filterList={filterList} setFilterList={setFilterList} level={level} filter={filter} setFilter={setFilter} setNewTodos={setTodos} 
              todos={todos} setShowAdd={setShowAdd} showAdd={showAdd} deleteTodo={deleteTodo} setEditing={setEditing} setNextLevel={setNextLevel}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
