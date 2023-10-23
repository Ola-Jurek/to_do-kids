import React, {useEffect, useState} from 'react';
import {doc, getDoc} from "firebase/firestore";
import {db} from "./firebase/index.js";
import {useParams} from "react-router-dom";

export const UserName = () => {
    const [data, setData] = useState("");

    const {name} = useParams()
    const id = name;

    useEffect(() => {
        const docRef = doc(db, "kids", id);

        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    setData(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });
    }, [id]);

    return (
        <div> {data.name} </div>
    )
}
