import { useState } from 'react'
import './App.scss'
import {Form} from "./Form.jsx";
import {ToDoList} from "./To_do_list.jsx";

export const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="logo"></div>
      <h1> Wybierz użytkownika </h1>
      <Form className="form"/>
      <button className="add_child"> + </button>

      <div className="list_of_children">
      <button className="child_name"> {name}  Ola </button>
      {/*<ToDoList className="to_to_list"/>*/}
      </div>
    </>
  )
}

