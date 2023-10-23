import React, {useEffect, useState, useRef} from 'react';
import {Link, useParams} from "react-router-dom";
import './firebase/index'
import './App.jsx'
import './App.scss';
import './To_do_list.scss';
import './index.scss';
import './Form_task.scss';
import ReactConfetti from "react-confetti";
import {UserName} from "./User_name.jsx";
import {collection, getDocs, addDoc, doc, updateDoc, serverTimestamp} from "firebase/firestore";
import {db} from "./firebase/index.js";




export const ToDoList = () => {

    const [task, setTask] = useState("");
    const [isFormTaskVisible, setIsFormTaskVisible] = useState(false);

    const [confettiRun, setConfettiRun] = useState(false);
    const [isScoreWindowVisible, setIsScoreWindowVisible] = useState(false);
    const [data, setData] = useState([]);
    const [activeButtons, setActiveButtons] = useState([]);


    // const currentUrl = window.location.href;
    // const parts = currentUrl.split("/");
    // const id = parts[parts.length -1];

    const {name} = useParams()
    const id = name;


    const buttonConfetti = () => {
        setConfettiRun(true);
        setIsScoreWindowVisible(true);
    }
    const addTask = (task) => {
        setData([...data, {name: task}]);
    }
    const handleButtonClick = () => {
        setIsFormTaskVisible(true);
    };
    const formTaskClose = () => {
        setIsFormTaskVisible(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        addDoc(collection(db, "kids", id, "tasks"),{
            name: task,
            date: serverTimestamp(),
        })
            .then(() => {
                addTask(task);
                console.log("Dane zostały pomyślnie zapisane.");
            })
            .catch((error) => {
                console.error("Błąd podczas zapisywania danych:", error);
            });
        setTask("");
    }


     useEffect(() => {

         const storedActiveButtons = JSON.parse(localStorage.getItem("activeButtons")) || [];
         setActiveButtons(storedActiveButtons);

         const storedDate = localStorage.getItem("date");
         const currentDate = new Date().toLocaleDateString();

         if (storedDate !== currentDate) {
             setActiveButtons([]);
             localStorage.setItem("date", currentDate);
         }

         getDocs(collection(db, "kids", id, "tasks"))
                .then((querySnapshot) => {
                 const newData = [];
                    querySnapshot.forEach((task) => {
                        newData.push({
                         taskId: task.id,
                            ...task.data()
                    })
                    console.log(task.id, " => ", task.data());
                    setData(newData);
                    });
                 })
                 .catch((error) => {
                    console.error("Błąd podczas pobierania danych:", error);
                 });

     }, []);


     const buttonClick = (taskId) => {
         const updatedButtons = activeButtons.includes(taskId)
             ? activeButtons.filter(id => id !== taskId)
             : [...activeButtons, taskId];

         setActiveButtons(updatedButtons);

         const docRef = doc(db, "kids", id, "tasks", taskId);

         updateDoc(docRef, {
             date: serverTimestamp()
         })
             .then(() => {
                 localStorage.setItem("activeButtons", JSON.stringify(activeButtons));
                 console.log("Pole date zostało pomyślnie zaktualizowane.");
             })
             .catch((error) => {
                 console.error("Błąd podczas aktualizacji dokumentu:", error);
             });
     };


        return (
            <div className="to_do_component">
                {confettiRun && <ReactConfetti />}
                <section className="header">
                    <div className="logo_small"></div>
                    <UserName className="child_name_small"/>
                    <Link to="/" className="change_child"> Zmień </Link>
                </section>

                <section className="to_do_list">
                    {!isFormTaskVisible && (
                        <button className="add_task" onClick={handleButtonClick}> Dodaj nowe zadanie </button>
                    )}
                    {isFormTaskVisible && (

                        <form className="form_task"  onSubmit={handleSubmit} >
                            <input className="input_task" type="text" value={task} placeholder="Tutaj wpisz treść zadania" onChange={(e) => setTask(e.target.value)}/>
                            <button className="submit_task" type="submit"  > Dodaj </button>
                        </form>


                    )}
                    {isFormTaskVisible && (
                        <button className="close_form_task" onClick={formTaskClose}> ok </button>
                    )}

                    <div className="task_list">
                        {data.map((task) => (
                            <button
                                className={`task ${activeButtons.includes(task.taskId) ? 'active' : ''}`}
                                onClick={()=> buttonClick(task.taskId)}
                                key={task.taskId} >{task.name}
                            </button>
                        ))}
                    </div>

                </section>
                {!isScoreWindowVisible && (
                    <button onClick={buttonConfetti} className="end_day"> Koniec dnia</button>
                )}
                {isScoreWindowVisible && (
                    <div className="end_day_message"> Świetna robota! </div>
                )}
            </div>
        );
}
