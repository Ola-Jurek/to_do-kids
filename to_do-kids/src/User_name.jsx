import React, {useEffect, useState} from 'react';
import {doc, getDoc} from "firebase/firestore";
import {db} from "./firebase/index.js";

export const UserName = () => {
    const [data, setData] = useState("");

    const currentUrl = window.location.href;
    const parts = currentUrl.split("/");
    const id = parts[parts.length - 1];
    console.log("id:", id);

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
