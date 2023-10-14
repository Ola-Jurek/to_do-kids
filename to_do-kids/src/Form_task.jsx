import React, {useState} from "react";
import {Link} from "react-router-dom";
import './Form_task.scss';
import {doc, addDoc, collection, setDoc} from "firebase/firestore";
import {db} from "./firebase/index.js";

export const Form_task = ({onAddTask}) => {
    const [task, setTask] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(task);
        addDoc(collection(db, "tasks"),{
            name: task,
        })
            .then(() => {
                console.log("Dane zostały pomyślnie zapisane.");
            })
            .catch((error) => {
                console.error("Błąd podczas zapisywania danych:", error);
            });
        setTask("");
    }

    return (
                <form className="form_task" onSubmit={handleSubmit} >
                    <input className="input_task" type="text" value={task} placeholder="Tutaj wpisz treść zadania" onChange={(e) => setTask(e.target.value)}/>
                    <button className="submit_task" type="submit"  > Dodaj </button>
                </form>
    );
}