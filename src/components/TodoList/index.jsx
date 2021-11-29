import React, { useEffect, useState } from 'react'
import './todoList.css'

const TodoList = ({ todos, setShowAdd, showAdd, deleteTodo, setEditing, setNextLevel, setNewTodos, filter, setFilter, level, filterList, setFilterList }) => {

  const getColor = (level) => {
    if (level === "Làm ngay") return "danger"
    else if (level === "Phải làm") return "warning"
    else if (level === "Làm bao giờ cũng được") return "success"
    else if (level === "Không làm chẳng sao") return "primary"
  }
  const [sort, setSort] = useState(false)
  const [textSearch, setTextSearch] = useState("")
  const [filterLevel, setFilterLevel] = useState("Làm ngay")

  useEffect(() => {
    sorted()
  }, [todos.length])

  const sorted = () => {
    const newTodo = [...todos]
    if (sort === "Sắp xếp theo ID") {
      newTodo.sort((a, b) => {
        return a.id > b.id ? 1 : -1
      })
    }
    else if (sort === "Sắp xếp theo Tên") {
      newTodo.sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
    }
    else if (sort === "Sắp xếp theo mức độ") {
      newTodo.sort((a, b) => {
        const indexA = level.findIndex(item => item === a.level)
        const indexB = level.findIndex(item => item === b.level)
        return indexA > indexB ? 1 : -1
      })
    }
    setNewTodos(newTodo)
  }

  const onChangeSort = (e) => {
    setSort(e.target.value)
    console.log(sort);
  }

  const onChangeSearch = (e) => {
    setTextSearch(e.target.value)
  }

  const Search = () => {
    setFilterList(todos.filter(
      function (item) {
        return item.name.indexOf(textSearch) !== -1 || item.level.indexOf(textSearch) !== -1
      }

    ))
  }

  const onChangeFilterLevel = (e) => {
    setFilterLevel(e.target.value);
  }

  const solveFilterLevel = () => {
    if (filterLevel === 'Tất cả') setFilterList(todos)
    else setFilterList(todos.filter(item => item.level === filterLevel))
  }

  return (
    <div className="to-do-list">
      <div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-add" >ADD NEW TODOS</button>
        <button className="btn-search" onClick={Search}>SEARCH BY TEXT</button>
        <input type="text" className="search" onChange={onChangeSearch} />
        <br />
        <select name="sort" id="sort" onChange={onChangeSort} value={sort}>
          <option value="Sắp xếp theo ID">Sort by id</option>
          <option value="Sắp xếp theo Tên">Sort by name</option>
          <option value="Sắp xếp theo mức độ">Sort by level</option>
        </select>
        <button id="btn-sort" onClick={() => sorted()}>SORT</button>
        <button onClick={() => solveFilterLevel(filterLevel)} className="btn-search" >SEARCH BY LEVEL</button>
        <select onChange={onChangeFilterLevel} className="search">
          <option value="Tất cả">Tất cả</option>
          <option value="Làm ngay">Làm ngay</option>
          <option value="Phải làm">Phải làm</option>
          <option value="Làm bao giờ cũng được">Làm bao giờ cũng được</option>
          <option value="Không làm chẳng sao">Không làm chẳng sao </option>
        </select>
      </div>
      {
        todos.length === 0 ? <p>No todos</p> :
          <table>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Level</th>
              <th>Action</th>
            </tr>
            {
              filterList.map((todo, index) => {
                return (
                  <>
                    <tr key={`${todo.id}`}>
                      <td>{index + 1}</td>
                      <td>{todo.name}</td>
                      <td>
                        {/* <Badge bg = {getColor(todo.level) } onClick={() => setNextLevel(todo.id)} >{todo.level}</Badge> */}
                        <span className={getColor(todo.level)} onClick={() => setNextLevel(todo.id)} >
                          {todo.level}
                        </span>

                      </td>
                      <td>
                        <div className="btn-group">
                          <button onClick={() => setEditing(todo)} >FIX</button>
                          <button onClick={() => deleteTodo(todo.id)}>DELETE</button>
                        </div>
                      </td>
                    </tr>
                  </>
                )
              })
            }
          </table>
      }

    </div>
  )
}
export default TodoList;