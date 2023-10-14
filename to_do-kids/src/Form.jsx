import React, {useState, useEffect} from "react";
import './Form.scss'
import './firebase/index';
import {db} from "./firebase/index.js";
import {collection, addDoc} from "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import {doc, setDoc} from "firebase/firestore";
import {ListOfChildren} from "./List_of_children.jsx";
import {ToDoList} from "./To_do_list.jsx";

export const Form = ({onAddUser}) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState ("");
    const [age, setAge] = useState ("");
    const [sex, setSex] = useState ("");

    const handleButtonClick = () => {
        setIsFormVisible(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User submitted');

        if (name && age && sex) {
            onAddUser({name, age, sex});
            addDoc(collection(db, "kids"), {
                name: name,
            })
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Błąd podczas zapisywania dokumentu:", error);
                });

            setName("");
            setAge("");
            setSex("");
        }
        setIsFormVisible(false);

    };


    return (
        <div className="form_container">
             {!isFormVisible && (
                <button className="add_child" onClick={handleButtonClick}> + </button>
            )}
             {isFormVisible && (
                <form className="form overlay" onSubmit={handleSubmit}>
                    <p> Nowy użytkownik </p>
                    <div>
                        <label> Imię
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
                        </label>
                    </div>
                    <div>
                        <label> Wiek
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label> Płeć
                            <select value={sex} onChange={e => setSex(e.target.value)}>
                                <option> Wybierz </option>
                                <option value="Dziewczynka" > Dziewczynka </option>
                                <option value="Chłopiec"> Chłopiec </option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="submit_form" onClick={() => handleSubmit()}>Dodaj</button>
                    </div>
                </form>
             )}
         </div>
    )};







