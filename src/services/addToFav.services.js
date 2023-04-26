import { async } from "@firebase/util";
import {
    addDoc,
    collection,
    query,
    where,
    deleteDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    increment,
    arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase.config.js";

export const getAllFavProducts = async (userId) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    return docSnap.data().favoriteItems;
};

export const addToFav = async (userId, productId) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    const userFavs = docSnap.data().favoriteItems;

    if (userFavs.includes(productId)) {
        return "You've already added this product to your favourites";
    } else {
        userFavs.push(productId);

        await updateDoc(userRef, {
            favoriteItems: userFavs,
        });
        return "You've successfully added this product to your favourites";
    }
};

export const deleteFromFavorites = async (userId, productId) => {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    const userFavs = docSnap.data().favoriteItems;

    const updatedFavs = userFavs.filter((id) => id !== productId);

    await updateDoc(userRef, { favoriteItems: updatedFavs });
    return "Successfully removed from favorites";
};
