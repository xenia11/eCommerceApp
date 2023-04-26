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

export const addToCart = async (userId, productId, quantity = 1, size) => {
    try {
        const cartItem = {
            userId: userId,
            productId: productId,
            quantity: quantity,
            size: size,
        };
        const docRef = await addDoc(collection(db, "cartItems"), cartItem);
        return "Successfully added to the cart";
    } catch (err) {
        throw new Error("We weren't able to add this product to the cart");
    }
};

export const updateCartItem = async (cartItemId, quantity) => {
    try {
        const docRef = doc(db, "cartItems", cartItemId);

        await updateDoc(docRef, {
            quantity: quantity,
        });
    } catch (err) {
        console.error("Error updating cart item: ", err);
    }
};

export const getCartContentForUser = async (userId) => {
    try {
        const cartContent = await getCartItems(userId);

        const cleanedCartContent = [];
        cartContent.forEach((cartItem) => {
            const foundCartItemIndex = cleanedCartContent.findIndex(
                (cleanedCartItem) =>
                    cleanedCartItem.productId === cartItem.productId &&
                    cleanedCartItem.size === cartItem.size
            );
            if (foundCartItemIndex !== -1) {
                cleanedCartContent[foundCartItemIndex].quantity +=
                    cartItem.quantity;
            } else {
                cleanedCartContent.push(cartItem);
            }
        });

        const cartItemsWithProducts = await Promise.all(
            cleanedCartContent.map(async (cartItem) => {
                const productDoc = await getDoc(
                    doc(db, "products", cartItem.productId)
                );

                if (productDoc.exists()) {
                    const product = productDoc.data();

                    return { ...cartItem, product };
                } else {
                    console.error(
                        `Product not found for ID: ${cartItem.productId}`
                    );
                    return cartItem;
                }
            })
        );
        return cartItemsWithProducts;
    } catch (error) {
        console.error("Error retrieving data: ", error);
    }
};

const getCartItems = async (userId) => {
    const cartRef = collection(db, "cartItems");
    const q = query(cartRef, where("userId", "==", userId));

    const cardSnapshot = await getDocs(q);
    let result = [];
    cardSnapshot.forEach(async (doc) => {
        const cartItem = doc.data();
        cartItem.id = doc.id;
        result.push(cartItem);
    });

    return result;
};

export const deleteCartItem = async (id) => {
    await deleteDoc(doc(db, "cartItems", id));
};
