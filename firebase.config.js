import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDt3LZbrQldxtItQwPUoyCv-AuV5N0KyHg",
    authDomain: "e-commerce-426a4.firebaseapp.com",
    projectId: "e-commerce-426a4",
    storageBucket: "e-commerce-426a4.appspot.com",
    messagingSenderId: "730220615906",
    appId: "1:730220615906:web:d050c53186cd8320ee26bb",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
