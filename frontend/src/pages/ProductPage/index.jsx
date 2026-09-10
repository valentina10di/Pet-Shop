import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/thunks/productThunks";
import { fetchCategoryProducts } from "../../redux/thunks/categoryProductsThunks";
import { addToCart } from "../../redux/slices/cartSlice";
import { BASE_URL } from "../../utils/constants";
import {
  calculateDiscountPercent,
  getProductImages,
} from "../../utils/calculations";
import styles from "./ProductPage.module.css";
import minusSvg from "../../assets/icons/minus.svg";
import plusSvg from "../../assets/icons/plus.svg";

function ProductPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    item: product,
    status,
    error,
  } = useSelector((state) => state.product);
  const categoryTitleFromStore = useSelector(
    (state) => state.categoryProducts.categoryTitle,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && product.categoryId) {
      dispatch(fetchCategoryProducts(product.categoryId));
    }
  }, [dispatch, product]);

  const [count, setCount] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showReadMore, setShowReadMore] = useState(false);
  const descRef = useRef(null);

  useEffect(() => {
    if (descRef.current && product?.description) {
      const element = descRef.current;
      if (element.scrollHeight > 180) {
        setShowReadMore(true);
      } else {
        setShowReadMore(false);
      }
    }
  }, [product?.description, isExpanded]);

  if (status === "loading")
    return <div className={styles.loading}>Loading...</div>;
  if (status === "failed")
    return <div className={styles.error}>Error: {error}</div>;
  if (!product) return null;

  const discountPercent = calculateDiscountPercent(
    product.price,
    product.discont_price,
  );

  let images = getProductImages(product);
  if (images.length === 1) {
    images = [images[0], images[0], images[0]];
  }

  const handleIncrement = () => setCount((prev) => prev + 1);
  const handleDecrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < count; i++) {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className={styles.productContentContainer}>
      <div className={styles.breadcrumbs}>
        <Link to="/" className={styles.crumbBtn}>
          Main page
        </Link>
        <span className={styles.line}></span>

        <Link to="/categories" className={styles.crumbBtn}>
          Categories
        </Link>
        <span className={styles.line}></span>

        {product.categoryId && (
          <>
            <Link
              to={`/categories/${product.categoryId}`}
              className={styles.crumbBtn}
            >
              {categoryTitleFromStore || "Category"}
            </Link>
            <span className={styles.line}></span>
          </>
        )}

        <span className={`${styles.crumbBtn} ${styles.activeCrumb}`}>
          {product.title}
        </span>
      </div>

      <div className={styles.productDetailsContainer}>
        <div className={styles.imagesSection}>
          <div className={styles.thumbnailsList}>
            {images.map((img, index) => (
              <div
                key={index}
                className={`${styles.thumbnailWrapper} ${selectedImageIndex === index ? styles.activeThumbnail : ""}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={`${BASE_URL}${img}`}
                  alt={`${product.title} ${index}`}
                  className={styles.thumbnailImage}
                />
              </div>
            ))}
          </div>
          <div className={styles.mainImageWrapper}>
            <img
              src={`${BASE_URL}${images[selectedImageIndex] || images[0]}`}
              alt={product.title}
              className={styles.mainImage}
            />
          </div>
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.productTitle}>{product.title}</h1>

          <div className={styles.priceAndCartRow}>
            <div className={styles.priceContainer}>
              <span className={styles.currentPrice}>
                ${product.discont_price ?? product.price}
              </span>
              {product.discont_price && (
                <div className={styles.oldPriceWrapper}>
                  <span className={styles.oldPrice}>${product.price}</span>
                  <span className={styles.discountBadge}>
                    -{discountPercent}%
                  </span>
                </div>
              )}
            </div>

            <div className={styles.counterAndCart}>
              <div className={styles.counter}>
                <button className={styles.counterBtn} onClick={handleDecrement}>
                  <img src={minusSvg} alt="minus" />
                </button>
                <span className={styles.counterValue}>{count}</span>
                <button className={styles.counterBtn} onClick={handleIncrement}>
                  <img src={plusSvg} alt="plus" />
                </button>
              </div>
              <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                Add to cart
              </button>
            </div>
          </div>

          <div className={styles.descriptionSection}>
            <h3 className={styles.descTitle}>Description</h3>
            <p
              ref={descRef}
              className={`${styles.descText} ${isExpanded ? styles.expanded : ""}`}
            >
              {product.description}
            </p>
            {showReadMore && (
              <button
                className={styles.readMoreBtn}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
