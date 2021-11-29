import React, { useState, useEffect } from 'react';
import './addNewTodo.css'

let uudi = 1;
export default function AddNewTodo({ todos, setTodos, setNewTodos, setShowAdd, editing, setEditing }) {
  const [newTodo, setNewTodo] = useState({
    id: 0,
    name: '',
    level: 'Làm ngay'
  })
  const [isEdit, setIsEdit] = useState(false)
  const [showAlert, setShowAlert] = useState(true)

  useEffect(() => {
    if (editing !== null) {
      setNewTodo(editing)
      setIsEdit(true)
    }
  }, [editing])

  const onChangeTodo = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    })
  }

  const addNewTodo = () => {
    if (newTodo.name.trim() === '') {
      setShowAlert(false)
      return
    }
    newTodo.id = uudi
    setNewTodos([...todos, newTodo])
    uudi += 1
    setNewTodo({
      id: 0,
      name: '',
      level: 'Làm ngay'
    })
    setShowAlert(true)
  }

  const handleEdit = () => {
    if (newTodo.name.trim() === '') {
      setShowAlert(false)
      return
    }
    const index = todos.findIndex(todo => todo.id === newTodo.id)
    todos[index] = newTodo
    setNewTodo({
      id: 0,
      name: '',
      level: 'Làm ngay'
    })
    setIsEdit(false)
    setEditing(null)
    setNewTodos([...todos])
    setShowAlert(true)
  }

  return (
    <div>
      <div className="add-new-todo">
        <span onClick={() => setShowAdd(false)} className="close">X</span>
        <h5 className="edit-text">{isEdit ? 'Fix todos:' : 'Add new todos:'}</h5>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="level" value={newTodo.name} onChange={onChangeTodo} />
        <span hidden={showAlert} className="alert">Not Empty!</span>
        <label htmlFor="level">Level:</label>
        <select name="level" id="level" value={newTodo.level} onChange={onChangeTodo}>
          <option value="Làm ngay">Làm ngay</option>
          <option value="Phải làm">Phải làm</option>
          <option value="Làm bao giờ cũng được">Làm bao giờ cũng được</option>
          <option value="Không làm chẳng sao">Không làm chẳng sao</option>
        </select>
        <div className="btn-group">
          <button onClick={isEdit ? handleEdit : addNewTodo} className="ahover">
            {isEdit ? 'FIX' : 'ADD'}
          </button>
          <button onClick={() => setShowAdd(false)} className="ahover">DELETE</button>
        </div>
      </div>
    </div>
  )
}
