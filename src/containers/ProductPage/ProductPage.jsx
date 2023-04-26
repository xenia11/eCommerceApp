import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./ProductPage.module.scss";
import klarna from "../../assets/klarna.png";
import paypal from "../../assets/paypal-logo.png";
import favTrue from "../../assets/fav-true.png";
import favFalse from "../../assets/fav-false.png";
import { addToFav } from "../../services/addToFav.services";
import { addToCart } from "../../services/addToCart.services";
import { getProductById } from "../../services/products.services";

const ProductPage = ({ products }) => {
    const { uid } = useParams();
    const [product, setProduct] = useState({});
    const [isFavorited, setIsFavorited] = useState(false);
    const [selectedSize, setSelectedSize] = useState("XS");
    const [addedToCartMsg, setAddedToCartMsg] = useState("");
    const [error, setError] = useState(null);

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleAddToBag = async () => {
        const addToCartFunc = await addToCart(
            "4yBcTXppQNWHjtUaFghT",
            product.id,
            1,
            selectedSize
        );
        const response = await addToCartFunc;
        const showResponse = response;

        setAddedToCartMsg(showResponse);

        setTimeout(() => {
            setAddedToCartMsg(false);
        }, 3000);
    };

    useEffect(() => {
        const wrapper = async () => {
            try {
                const items = await getProductById(uid);
                const result = await items;
                const data = result;
                setProduct(data);
            } catch (error) {
                setError(error.message);
            }
        };
        wrapper();
    }, [uid, products]);

    const priceDividedByFour = (price) => {
        return (price / 4).toFixed(2);
    };

    const handleAddToFav = async () => {
        const fav = await addToFav("4yBcTXppQNWHjtUaFghT", product.id);
        setIsFavorited(fav);

        setTimeout(() => {
            setIsFavorited(false);
        }, 3000);
    };

    return (
        <>
            {error && <p>{error}</p>}
            {product && (
                <div className={styles.Container}>
                    <div
                        className={`${styles.Container} ${styles.Container_FirstChild}`}
                    >
                        <img
                            className={`${styles.Container} ${styles.Container_FirstChild} ${styles["Container_FirstChild-Img"]}`}
                            src={product.image ?? ""}
                            alt={product.title ?? "item picture"}
                        ></img>
                    </div>
                    <div
                        className={`${styles.Container} ${styles.Container_SecondChild}`}
                    >
                        <h1
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Title"]}`}
                        >
                            {product.title}
                        </h1>
                        <p
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Price"]}`}
                        >
                            AU${product.price}
                        </p>
                        <p
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-PaymentOptionPara"]}`}
                        >
                            or 4 payments of AU${" "}
                            {priceDividedByFour(product.price)} with{" "}
                            <img
                                className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-PaymentOptionPara"]}  ${styles["Container_SecondChild-PaymentOptionPara-Logo"]}`}
                                src={klarna}
                                alt="klarna"
                            />{" "}
                            or{" "}
                            <img
                                className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-PaymentOptionPara"]}  ${styles["Container_SecondChild-PaymentOptionPara-Logo"]} ${styles["Container_SecondChild-PaymentOptionPara-Logo-Bigger"]} `}
                                src={paypal}
                                alt="paypal"
                            />
                        </p>
                        {product.size && (
                            <select
                                className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Select"]}`}
                                value={selectedSize}
                                onChange={handleSizeChange}
                                required
                            >
                                {" "}
                                {product.size.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        )}
                        <div
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Div"]}`}
                        >
                            <button
                                onClick={handleAddToBag}
                                className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Div"]} ${styles["Container_SecondChild-Div-Btn"]}`}
                            >
                                ADD TO BAG
                            </button>
                            <img
                                onClick={handleAddToFav}
                                className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Div"]} ${styles["Container_SecondChild-Div-FavBtn"]}`}
                                src={favFalse}
                                alt="fav button"
                            />
                        </div>
                        {isFavorited && <p>{isFavorited}</p>}
                        {addedToCartMsg && <p>{addedToCartMsg}</p>}

                        <p
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-ShippingPara"]}`}
                        >
                            Order by 4 PM for{" "}
                            <span
                                style={{
                                    backgroundColor: "#e5f4ec",
                                    fontWeight: "bold",
                                }}
                            >
                                SAME DAY DISPATCH
                            </span>
                        </p>
                        <p
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Description"]}`}
                        >
                            Description
                        </p>
                        <p
                            className={`${styles.Container} ${styles.Container_SecondChild} ${styles["Container_SecondChild-Description-Para"]}`}
                        >
                            {product.description ?? "No description provided"}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductPage;
