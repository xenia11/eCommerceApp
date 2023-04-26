import { useState, useEffect } from "react";
import styles from "./HomePage.module.scss";
import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import ProductCard from "../../components/Product/ProductCard";
import { useNavigate } from "react-router-dom";

const HomePage = ({ products }) => {
    const texts = [
        "pay later with with klarna & paypal",
        "free shipping & free returns",
        "same & next day delivery available",
    ];
    const [carouselImgs, setCarouselImgs] = useState([]);
    const [text, setText] = useState(texts[0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [randomCards, setRandomCards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const imgArray = products
            ?.slice(0, 4)
            .map((product) => product.image)
            .filter(Boolean);
        setCarouselImgs(imgArray);

        const randomCardsArr = products?.slice(4, 12).map((product) => product);
        setRandomCards(randomCardsArr);
    }, [products]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setText(texts[currentIndex]);
    }, [currentIndex]);

    return (
        <div className={styles.Home}>
            <p className={`${styles.Home} ${styles.Home_InfoPara}`}>{text}</p>
            <h1 className={`${styles.Home} ${styles.Home_Header}`}>
                Universal Store{" "}
                <span className={`${styles["Home_Header-SpanStyle"]}`}>©</span>
            </h1>

            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={90}
                totalSlides={4}
            >
                <div className={styles.CarouselDiv}>
                    <ButtonBack>Back</ButtonBack>

                    <Slider className={styles.Slider}>
                        {carouselImgs &&
                            carouselImgs.map((img, index) => (
                                <Slide key={index} index={index}>
                                    <img
                                        className={styles.Carousel}
                                        src={img}
                                        alt={`carousel image ${index}`}
                                    ></img>
                                </Slide>
                            ))}
                    </Slider>
                    <ButtonNext>Next</ButtonNext>
                </div>
            </CarouselProvider>
            <h1 className={styles.SubTitle}>TRENDING NOW</h1>
            <div className={styles.ProductsContainer}>
                {randomCards &&
                    randomCards.map((product) => (
                        <ProductCard productId={product.uid} key={product.uid}>
                            {" "}
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
            <button
                onClick={() => navigate("/products/all-products")}
                className={`${styles.ProductsContainer} ${styles.ProductsContainer_SecondChildDiv} ${styles.ProductsContainer_SecondChildDiv_Btn}`}
            >
                SHOP NOW
            </button>
        </div>
    );
};

export default HomePage;
