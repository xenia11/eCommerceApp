import { useState, useEffect } from "react";
import { getAllFavProducts } from "../../services/addToFav.services";
import ProductCard from "../../components/Product/ProductCard";
import styles from "./Favourites.module.scss";
import favTrue from "../../assets/fav-true.png";
import { deleteFromFavorites } from "../../services/addToFav.services";
import { useNavigate } from "react-router-dom";

const Favourites = ({ products }) => {
    const [favProductsId, setFavProductsId] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [removeFavResponse, setRemoveFavResponse] = useState(false);
    const navigate = useNavigate();

    const removeFromFavorites = (event) => {
        const wrapper = async () => {
            const productId = event.target.getAttribute("data-id");
            const removeFunc = deleteFromFavorites(
                "4yBcTXppQNWHjtUaFghT",
                productId
            );
            const result = await removeFunc;

            setRemoveFavResponse(true);
        };
        wrapper();
        navigate("/favorites");
    };

    const handleAddToBag = async () => {};

    useEffect(() => {
        const wrapper = async () => {
            const items = await getAllFavProducts("4yBcTXppQNWHjtUaFghT");
            const result = await items;
            const data = result;
            setFavProductsId(data);
        };
        wrapper();
    }, []);

    useEffect(() => {
        const wrapper = async () => {
            const arr = [];
            products &&
                products.map(
                    (product) =>
                        favProductsId.includes(product.uid) && arr.push(product)
                );
            setFavorites(arr);
        };
        wrapper();
    }, [favProductsId]);

    return (
        <div className={styles.Container}>
            {favorites &&
                favorites.map((product) => (
                    <ProductCard productId={product.uid} key={product.uid}>
                        <div
                            className={`${styles.Container} ${styles.Container_Div}`}
                        >
                            <img
                                className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-Img"]}`}
                                src={product.image}
                                alt={product.title}
                            ></img>
                            <h1
                                className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-Title"]}`}
                            >
                                {product.title}
                            </h1>
                            <p
                                className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-Category"]}`}
                            >
                                {product.category}
                            </p>
                            <p
                                className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-Price"]} `}
                            >
                                au${product.price}
                            </p>
                            <div
                                className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-ChildDiv"]}`}
                            >
                                <button
                                    onClick={handleAddToBag}
                                    className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-ChildDiv"]} ${styles["Container_Div-ChildDiv-Btn"]}`}
                                >
                                    ADD TO BAG
                                </button>

                                <img
                                    data-id={product.uid}
                                    onClick={removeFromFavorites}
                                    className={`${styles.Container} ${styles.Container_Div} ${styles["Container_Div-ChildDiv"]} ${styles["Container_Div-ChildDiv-FavBtn"]}`}
                                    src={favTrue}
                                    alt="fav button"
                                />
                            </div>
                        </div>
                    </ProductCard>
                ))}
        </div>
    );
};

export default Favourites;
