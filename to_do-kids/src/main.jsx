import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import './index.scss'
import {BrowserRouter, HashRouter, Link, Route, Routes} from "react-router-dom";
import {ToDoList} from "./To_do_list.jsx";




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <HashRouter>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path="/to-do-list/:name" element={<ToDoList className="to_do_list"/>}/>
          </Routes>
      </HashRouter>
  </React.StrictMode>,
)
