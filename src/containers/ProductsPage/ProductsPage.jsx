import { useEffect, useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import styles from "./ProductsPage.module.scss";
import { NavLink } from "react-router-dom";

const ProductsPage = ({ products, categories }) => {
    return (
        <div className={styles.ProductsContainer}>
            <div
                className={`${styles.ProductsContainer} ${styles.ProductsContainer_FirstChildDiv}`}
            >
                {categories && (
                    <ul
                        className={`${styles.ProductsContainer} ${styles.ProductsContainer_FirstChildDiv} ${styles["ProductsContainer_FirstChildDiv-List"]}`}
                    >
                        {categories.map((category, index) => {
                            const categoryURL = category
                                .replace(/\s+/g, "-")
                                .replace(/[^\w-]+/g, "")
                                .toLowerCase();
                            return category ? (
                                <NavLink
                                    className={`${styles.ProductsContainer} ${styles.ProductsContainer_FirstChildDiv} ${styles["ProductsContainer_FirstChildDiv-List"]} ${styles["ProductsContainer_FirstChildDiv-List-Link"]}`}
                                    key={index}
                                    to={`/products/${categoryURL}`}
                                >
                                    <li
                                        className={`${styles.ProductsContainer} ${styles.ProductsContainer_FirstChildDiv} ${styles["ProductsContainer_FirstChildDiv-List"]} ${styles["ProductsContainer_FirstChildDiv-List-Link"]}`}
                                        key={index}
                                    >
                                        {category}
                                    </li>
                                </NavLink>
                            ) : null;
                        })}
                    </ul>
                )}
            </div>
            <div
                className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv}`}
            >
                {products &&
                    products.map((product) => (
                        <ProductCard
                            productId={product.uid}
                            key={product.uid}
                            products={products}
                        >
                            <div
                                className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv} ${styles["ProductsContainer_SecondChildDiv-Div"]}`}
                            >
                                <img
                                    className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv} ${styles["ProductsContainer_SecondChildDiv-Div"]} ${styles["ProductsContainer_SecondChildDiv-Div-Img"]}`}
                                    src={product.image}
                                    alt={product.title}
                                ></img>
                                <h1
                                    className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv} ${styles["ProductsContainer_SecondChildDiv-Div"]} ${styles["ProductsContainer_SecondChildDiv-Div-Title"]}`}
                                >
                                    {product.title}
                                </h1>
                                <p
                                    className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv} ${styles["ProductsContainer_SecondChildDiv-Div"]} ${styles["ProductsContainer_SecondChildDiv-Div-Category"]}`}
                                >
                                    {product.category}
                                </p>
                                <p
                                    className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv} ${styles["ProductsContainer_SecondChildDiv-Div"]} ${styles["ProductsContainer_SecondChildDiv-Div-Price"]}`}
                                >
                                    au${product.price}
                                </p>
                            </div>
                        </ProductCard>
                    ))}
            </div>
        </div>
    );
};

export default ProductsPage;
