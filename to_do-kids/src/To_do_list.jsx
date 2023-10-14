import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './firebase/index'
import './App.jsx'
import './App.scss';
import './To_do_list.scss';
import './index.scss';
import {Form} from "./Form.jsx";
import {Form_task} from "./Form_task.jsx";
import {App} from "./App.jsx";
import ReactConfetti from "react-confetti";
import {UserName} from "./User_name.jsx";
import {doc, getDoc, collection, getDocs, updateDoc, addDoc, query} from "firebase/firestore";
import {db} from "./firebase/index.js";


export const ToDoList = (user) => {
    const [tasks, setTasks] = useState([]);
    const [isFormTaskVisible, setIsFormTaskVisible] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [confettiRun, setConfettiRun] = useState(false);
    const [isScoreWindowVisible, setIsScoreWindowVisible] = useState(false);

        const buttonClick = () => {
            setIsButtonClicked(!isButtonClicked);
        };
        const buttonConfetti = () => {
            setConfettiRun(true);
            setIsScoreWindowVisible(true);
        }
        const addTask = (task) => {
            setTasks([...tasks, task]);
        }
        const handleButtonClick = () => {
            setIsFormTaskVisible(true);
        };
        const formTaskClose = () => {
            setIsFormTaskVisible(false);
        };

        const currentUrl = window.location.href;
        const parts = currentUrl.split("/");
        const id = parts[parts.length -1];
        console.log("id:", id);


    // useEffect(() => {  //wyciągnięcie jednego dziecka po id- powielony kod, to samo w User_name
    //
    //     const docRef = doc(db, "kids", id);
    //
    //     getDoc(docRef)
    //         .then((docSnap) => {
    //             if (docSnap.exists()) {
    //                 console.log("Document data:", docSnap.data());
                // } else {
                //     docSnap.data()
                //     console.log("No such document!");
                // }
            // })
            // .catch((error) => {
            //     console.log("Error getting document:", error);
            // });
    // }, []);


     // useEffect(() => {
     //     const kidDoc = doc(db,'kids', id);
     //     const tasksCollection = collection(kidDoc, 'tasks');
     //     const q = query(tasksCollection);
     //
     //     getDocs(q)
     //         .then((querySnapshot) => {
     //             querySnapshot.forEach((doc) => {
     //                 addTask({
     //                     id: doc.id,
     //                     ...doc.data()
     //                 })
     //                 console.log(doc.id, "=>", doc.data);
     //             });
     //         })
     //         .catch((error) => {
     //             console.error("Error getting documents: ", error);
     //         });
     // }, []);


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
                        <Form_task onAddTask={addTask}/>
                    )}
                    {isFormTaskVisible && (
                        <button className="close_form_task" onClick={formTaskClose}> ok </button>
                    )}

                    <div className="task_list">
                        {tasks.map((task, index) => (
                            <button className={`task ${isButtonClicked ? 'clicked' : ''}`} onClick={buttonClick}
                                    key={index}> {index} {task} </button>
                        ))}
                    </div>

                </section>
                {!isScoreWindowVisible && (
                    <button onClick={buttonConfetti} className="end_day"> Koniec dnia</button>
                )}
                {isScoreWindowVisible && (
                    <div className="end_day_message"> Świetna robota! Udało Ci się wykonać ... zadań.</div>
                )}
            </div>
        );
}
