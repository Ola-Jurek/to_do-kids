import './App.scss';
import './index.scss';
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ToDoList} from "./To_do_list.jsx";
import {doc, getDocs, collection} from "firebase/firestore";
import {db} from "./firebase/index.js";

export const ListOfChildren = () => {
    const [data, setData] = useState([]);

useEffect(() =>{
    //
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
            console.log("Błąd", error)
        })
})
    return (
        <div className="list_of_children">

                {data.map((user) => (
                    <Link to={`/to-do-list/${user.id}`} key={user.id} className="child_name" > {user.name} </Link>
                ))}
        </div>
    );
}

