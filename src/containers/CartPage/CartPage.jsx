import {
    getCartContentForUser,
    updateCartItem,
    deleteCartItem,
} from "../../services/addToCart.services";
import { useState, useEffect } from "react";
import styles from "./CartPage.module.scss";
import ProductCard from "../../components/Product/ProductCard";
import { addToFav } from "../../services/addToFav.services";

const CardPage = () => {
    const [itemsInCart, setItemsInCart] = useState([]);
    const [update, setUpdate] = useState(false);
    const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //TODO: limit to quantity func cleanup to throw error

    const totalPrice = itemsInCart.reduce((acc, product) => {
        const price = parseFloat(product.product.price);
        const total = acc + price * product.quantity;
        return total;
    }, 0);

    const formatter = new Intl.NumberFormat(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const formattedTotalPrice = formatter.format(totalPrice);

    const handleQuantityChange = () => {
        const newQty = event.target.value;
        const cartId = event.target.parentNode.parentNode.id;
        const wrapper = async () => {
            const updateFunc = await updateCartItem(cartId, newQty);
            setUpdate(!update);
        };
        wrapper();
    };

    const handleRemoveItem = async () => {
        const cartId = event.target.parentNode.parentNode.parentNode.id;
        deleteCartItem(cartId);
        setUpdate(!update);
    };

    const handleAddToFav = async () => {
        const productId =
            event.target.parentNode.parentNode.parentNode.getAttribute(
                "productid"
            );
        addToFav("4yBcTXppQNWHjtUaFghT", productId);
    };

    useEffect(() => {
        const wrapper = async () => {
            const items = await getCartContentForUser("4yBcTXppQNWHjtUaFghT");
            const result = await items;
            const data = result;

            setItemsInCart(data);
        };
        wrapper();
    }, [update]);
    return (
        <div className={styles.CartContainer}>
            <h1
                className={`${styles.CartContainer} ${styles.CartContainer_Header}`}
            >
                Cart ({itemsInCart.length} items)
            </h1>
            <div
                className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv}`}
            >
                <p
                    className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-ShippingInfo"]}`}
                >
                    Order by 4 PM for{" "}
                    <span
                        style={{
                            width: "100%",
                            backgroundColor: "#e5f4ec",
                            fontWeight: "bold",
                        }}
                    >
                        SAME DAY DISPATCH
                    </span>
                </p>
                <div
                    className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-LeftDiv"]}`}
                >
                    <p
                        className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-LeftDiv"]} ${styles["CartContainer_FirstChildDiv-LeftDiv-Para"]}`}
                    >
                        SUBTOTAL
                    </p>
                    <p
                        className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-LeftDiv"]} ${styles["CartContainer_FirstChildDiv-LeftDiv-Para"]}`}
                    >
                        STANDARD SHIPPING
                    </p>
                    <p
                        style={{ fontWeight: "bold" }}
                        className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-LeftDiv"]} ${styles["CartContainer_FirstChildDiv-LeftDiv-Para"]}`}
                    >
                        TOTAL
                    </p>
                </div>
                <div
                    className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-RightDiv"]}`}
                >
                    <p
                        className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-RightDiv"]} ${styles["CartContainer_FirstChildDiv-RightDiv-Para"]}`}
                    >
                        AU${itemsInCart && formattedTotalPrice}
                    </p>
                    <p
                        className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-RightDiv"]} ${styles["CartContainer_FirstChildDiv-RightDiv-Para"]}`}
                    >
                        FREE
                    </p>
                    <p
                        style={{ fontWeight: "bold" }}
                        className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-RightDiv"]} ${styles["CartContainer_FirstChildDiv-RightDiv-Para"]}`}
                    >
                        AU${itemsInCart && formattedTotalPrice}
                    </p>
                </div>
                <div
                    className={`${styles.CartContainer} ${styles.CartContainer_FirstChildDiv} ${styles["CartContainer_FirstChildDiv-OrderBtn"]}`}
                >
                    ORDER
                </div>
            </div>

            {itemsInCart.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                <div
                    className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv}`}
                >
                    {itemsInCart &&
                        itemsInCart.map((cartItem) => (
                            <div
                                className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]}`}
                                key={cartItem.id}
                                id={cartItem.id}
                                productid={cartItem.productId}
                            >
                                <div
                                    className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Left"]}`}
                                >
                                    <img
                                        className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Left"]} ${styles["CartContainer_SecondChildDiv-Card-Left-Img"]}`}
                                        src={cartItem.product.image}
                                        alt={cartItem.product.title}
                                    ></img>
                                </div>
                                <div
                                    className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]}`}
                                >
                                    <h1
                                        className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-Title"]}`}
                                    >
                                        {cartItem.product.title}
                                    </h1>
                                    <p
                                        className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-Price"]}`}
                                    >
                                        AU${cartItem.product.price}
                                    </p>
                                    {cartItem.product.category ==
                                        "women's clothing" ||
                                        (cartItem.product.category ==
                                            "men's clothing" && (
                                            <p
                                                className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-Size"]}`}
                                            >
                                                {cartItem.size}
                                            </p>
                                        ))}
                                    <select
                                        className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-Qty"]}`}
                                        value={cartItem.quantity}
                                        onChange={handleQuantityChange}
                                    >
                                        {qty.map((quantity) => (
                                            <option
                                                key={quantity}
                                                value={quantity}
                                            >
                                                {quantity}
                                            </option>
                                        ))}
                                    </select>
                                    <div
                                        className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-BtnDiv"]}`}
                                    >
                                        <button
                                            className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-BtnDiv"]} ${styles["CartContainer_SecondChildDiv-Card-Right-BtnDiv-RemoveBtn"]}`}
                                            onClick={handleRemoveItem}
                                        >
                                            X REMOVE
                                        </button>
                                        <button
                                            className={`${styles.CartContainer} ${styles.CartContainer_SecondChildDiv} ${styles["CartContainer_SecondChildDiv-Card"]} ${styles["CartContainer_SecondChildDiv-Card-Right"]} ${styles["CartContainer_SecondChildDiv-Card-Right-BtnDiv"]} ${styles["CartContainer_SecondChildDiv-Card-Right-BtnDiv-FavBtn"]}`}
                                            onClick={handleAddToFav}
                                        >
                                            ADD TO FAVORITES
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default CardPage;
