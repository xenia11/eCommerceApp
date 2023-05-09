import { useState, useEffect } from "react";
import { getAllFavProducts } from "../../services/addToFav.services";
import ProductCard from "../../components/Product/ProductCard";
import styles from "./Favourites.module.scss";
import favTrue from "../../assets/fav-true.png";
import { deleteFromFavorites } from "../../services/addToFav.services";
import { useNavigate } from "react-router-dom";
import { getProductById } from "../../services/products.services";

const Favourites = ({ products }) => {
    const [favProductsId, setFavProductsId] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [removeFavResponse, setRemoveFavResponse] = useState(false);

    const populateFavourites = async () => {
        const ids = await getAllFavProducts("4yBcTXppQNWHjtUaFghT");
        const promises = ids.map((id) => getProductById(id));
        const products = await Promise.all(promises);

        setFavorites(products);
    };
    const removeFromFavorites = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const wrapper = async () => {
            const productId = event.target.getAttribute("data-id");
            const removeFunc = await deleteFromFavorites(
                "4yBcTXppQNWHjtUaFghT",
                productId
            );
            const result = await removeFunc;

            setRemoveFavResponse(true);
        };
        wrapper();
        populateFavourites();
    };

    const handleAddToBag = async () => {};

    useEffect(() => {
        populateFavourites();
    }, []);

    return (
        <div className={styles.Container}>
            {favorites &&
                favorites.map((product) => (
                    <ProductCard productId={product.id} key={product.id}>
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
                                    data-id={product.id}
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
