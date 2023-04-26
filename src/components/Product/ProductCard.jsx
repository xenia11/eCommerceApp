import { NavLink, useParams } from "react-router-dom";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ children, productId }) => {
    return (
        <NavLink className={styles.NavLink} to={`/${productId}`}>
            {children}
        </NavLink>
    );
};

export default ProductCard;
