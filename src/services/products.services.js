import { async } from "@firebase/util";
import {
    addDoc,
    collection,
    deleteDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment,
} from "firebase/firestore";
import { db } from "../../firebase.config.js";

export const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => {
        const uid = doc.id;
        const restOfData = doc.data();

        return { uid, ...restOfData };
    });
    return data;
};

getAllProducts();

export const getProductById = async (id) => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Product not found");
    }
};
