import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB-whK-lP527hujpAAMOJ9NOk7VNJrJNL0",
    authDomain: "projekt-koncowy-b4c84.firebaseapp.com",
    projectId: "projekt-koncowy-b4c84",
    storageBucket: "projekt-koncowy-b4c84.appspot.com",
    messagingSenderId: "288587840013",
    appId: "1:288587840013:web:c87372fefb26d8262c3344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 export const db = getFirestore(app);