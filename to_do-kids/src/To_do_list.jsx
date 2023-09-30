import React from 'react';

export const ToDoList = (props) => {
    return (
        <div className="to_to_component">
        <section className="header">
          <div className="logo"></div>
          <div className="child_name"> {props.name} </div>
          <button className="change_child"></button>
        </section>
        <input className="add_task"> Dodaj nowe zadanie </input>
        <section className="to_do_list">
          <div className="task"> Ścielenie łóżka </div>
          <div className="task"> Ubranie się </div>
          <div className="task"> Mycie zębów </div>
          <div className="task"> Porządkowanie zabawek </div>
        </section>
            <input className="end_day"> Koniec dnia </input>
        </div>
    );
}
