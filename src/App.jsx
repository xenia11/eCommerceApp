import { useEffect, useState } from "react";
import "./App.css";
import { getAllProducts } from "./services/products.services";
import Nav from "./containers/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./containers/HomePage/HomePage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import CartPage from "./containers/CartPage/CartPage";
import ProductsPage from "./containers/ProductsPage/ProductsPage";
import ProductCard from "./components/Product/ProductCard";
import ProductPage from "./containers/ProductPage/ProductPage";
import Favourites from "./containers/Favourites/Favourites";
import { getCartContentForUser } from "./services/addToCart.services";
import {
    WomenClothingPageContainer,
    MenClothingPageContainer,
    ElectronicsPageContainer,
    JeweleryPageContainer,
} from "./containers/CategoriesContainer/CategoriesContainer";

function App() {
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState(["All products"]);

    useEffect(() => {
        const allCategories = async () => {
            const categoriesArr = [...categories];
            const items = await getAllProducts();
            const data = await items;
            data &&
                data.map(
                    (product) =>
                        !categoriesArr.includes(product.category) &&
                        categoriesArr.push(product.category)
                );

            setCategories(categoriesArr);
        };
        allCategories();
    }, []);

    useEffect(() => {
        const wrapper = async () => {
            const items = await getAllProducts();
            const result = await items;
            const data = result;
            setProducts(data);
        };
        wrapper();
    }, []);

    return (
        <BrowserRouter>
            <div className="App">
                <Nav />

                <Routes>
                    <Route
                        path="/"
                        element={<HomePage products={products} />}
                    ></Route>
                    <Route
                        path="/products/all-products"
                        element={
                            <ProductsPage
                                products={products}
                                categories={categories}
                            />
                        }
                    ></Route>
                    <Route
                        path="/products/womens-clothing"
                        element={
                            <WomenClothingPageContainer
                                products={products}
                                categories={categories}
                            />
                        }
                    ></Route>
                    <Route
                        path="/products/mens-clothing"
                        element={
                            <MenClothingPageContainer
                                products={products}
                                categories={categories}
                            />
                        }
                    ></Route>
                    <Route
                        path="/products/electronics"
                        element={
                            <ElectronicsPageContainer
                                products={products}
                                categories={categories}
                            />
                        }
                    ></Route>
                    <Route
                        path="/products/jewelery"
                        element={
                            <JeweleryPageContainer
                                products={products}
                                categories={categories}
                            />
                        }
                    ></Route>
                    <Route
                        path="/:uid"
                        element={<ProductPage products={products} />}
                    ></Route>
                    <Route path="/products/cart" element={<CartPage />}></Route>
                    <Route
                        path="/favorites"
                        element={<Favourites products={products} />}
                    ></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
