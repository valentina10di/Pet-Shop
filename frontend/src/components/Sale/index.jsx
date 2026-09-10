import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchSaleProducts } from "../../redux/thunks/thunkSale";
import { calculateDiscountPercent } from "../../utils/calculations";
import { BASE_URL } from "../../utils/constants";
import styles from "./Sale.module.css";
import { useEffect } from "react";

function Sale() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.sale);

  useEffect(() => {
    dispatch(fetchSaleProducts());
  }, [dispatch]);

 

  if (status === "loading")
    return <div className={styles.loading}>Loading sales...</div>;
  if (status === "failed")
    return <div className={styles.error}>Error: {error}</div>;

  return (
    <section className={styles.saleSection}>
      <div className={styles.headerWrapper}>
        <h2 className={styles.title}>Sale</h2>
        <div className={styles.line}></div>
        <Link to="/all-sales" className={styles.allSalesBtn}>
          All sales
        </Link>
      </div>

      <div className={styles.cardsContainer}>
        {list.map((product) => {
          const discountPercent = calculateDiscountPercent(
            product.price,
            product.discont_price,
          );

          return (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={styles.card}
            >
              <div className={styles.imageWrapper}>
                {discountPercent && (
                  <span className={styles.discountBadge}>
                    -{discountPercent}%
                  </span>
                )}
                <img
                  src={`${BASE_URL}${product.image}`}
                  alt={product.title}
                  className={styles.image}
                />
              </div>

              <div className={styles.infoWrapper}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>
                    ${product.discont_price ?? product.price}
                  </span>
                  {product.discont_price && (
                    <span className={styles.oldPrice}>${product.price}</span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default Sale;
