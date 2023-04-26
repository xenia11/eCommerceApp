import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss";

const Nav = () => {
    const activeStyle = ({ isActive }) =>
        isActive
            ? `${styles.NavBar_Box} ${styles["NavBar_Box-Active"]}`
            : `${styles.NavBar_Box}`;
    return (
        <nav className={styles.NavBar}>
            <NavLink className={activeStyle} to="/">
                Home
            </NavLink>
            <NavLink className={activeStyle} to="/products/all-products">
                Products
            </NavLink>
            <NavLink className={activeStyle} to="/favorites">
                Favorites
            </NavLink>
            <NavLink className={activeStyle} to="/products/cart">
                Cart
            </NavLink>
        </nav>
    );
};

export default Nav;
