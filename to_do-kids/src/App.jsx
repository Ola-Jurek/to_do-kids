import { useState, useEffect } from 'react'
import {db} from "./firebase"
import './firebase/index';
import { collection, query, where, getDocs } from "firebase/firestore"
import './App.scss'
import {Form} from "./Form.jsx";
// import './Form.scss'
import {ToDoList} from "./To_do_list.jsx";
import {ListOfChildren} from "./List_of_children.jsx";

export const App = () => {
    const [users, setUsers] = useState([]);

    const addUser = (user) => {
        setUsers([...users,user]);
    };

  return (
    <>
            <div className="logo"></div>
            <h1> Wybierz użytkownika </h1>
            <Form className="form" onAddUser={addUser}/>
            <ListOfChildren className="list_of_children" users={users}/>
    </>
  )
}

