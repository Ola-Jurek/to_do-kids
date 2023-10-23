import React, { useState, useEffect } from 'react';
import {collection, getDocs, addDoc} from "firebase/firestore";
import {db} from "./firebase";
import {Link} from "react-router-dom";
import './firebase/index';
import './App.scss';
import './Form.scss';


export const App = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState ("");
    const [age, setAge] = useState ("");
    const [sex, setSex] = useState ("");
    const [data, setData] = useState([]);

    const addUser = (name) => { //dodanie imienia do List-of-chlidren
        setData([...data, {name:name}]);
    };
    const handleButtonClick = () => { //przycisk pokazujący formularz
        setIsFormVisible(true);
    };
    const handleSubmit = (e) => { //obsługa formularza
        e.preventDefault();
        console.log('User submitted');

        if (name && age && sex) {
            addDoc(collection(db, "kids"), {
                name: name,
            })
                .then((docRef) => {
                    addUser(name);
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    console.error("Error getting doc:", error);
                });
            setName("");
            setAge("");
            setSex("");
            setIsFormVisible(false);
        }
    };

    useEffect(()=> { //pobranie kolekcji 'kids' z Firebase
        getDocs(collection(db, "kids"))
            .then((querySnapshot) => {
                const newData = [];
                querySnapshot.forEach((doc) => {
                    newData.push({
                        id: doc.id,
                        ...doc.data()
                    })
                });
                setData(newData)
            })
            .catch((error) => {
                console.log("Error", error)
            })
    },[]);

  return (
    <>
            <div className="logo"></div>
            <h1> Wybierz użytkownika </h1>
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
                        <button type="submit" className="submit_form">Dodaj</button>
                    </div>
                </form>
            )}
        </div>
        <div className="list_of_children">

            {data.map((user, id) => (
                <Link to={`/to-do-list/${user.id}`} key= {id}  className="child_name" > {user.name} </Link>
            ))}
        </div>
    </>
  )
}

