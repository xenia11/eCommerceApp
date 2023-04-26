import ProductsPage from "../ProductsPage/ProductsPage";

export const WomenClothingPageContainer = ({ products, categories }) => {
    const womenClothingProducts = products.filter(
        (product) => product.category === "women's clothing"
    );

    return (
        <ProductsPage
            products={womenClothingProducts}
            categories={categories}
        />
    );
};
export const MenClothingPageContainer = ({ products, categories }) => {
    const menClothingProducts = products.filter(
        (product) => product.category === "men's clothing"
    );

    return (
        <ProductsPage products={menClothingProducts} categories={categories} />
    );
};

export const JeweleryPageContainer = ({ products, categories }) => {
    const jeweleryProducts = products.filter(
        (product) => product.category === "jewelery"
    );

    return <ProductsPage products={jeweleryProducts} categories={categories} />;
};

export const ElectronicsPageContainer = ({ products, categories }) => {
    const electronicsProducts = products.filter(
        (product) => product.category === "electronics"
    );

    return (
        <ProductsPage products={electronicsProducts} categories={categories} />
    );
};
