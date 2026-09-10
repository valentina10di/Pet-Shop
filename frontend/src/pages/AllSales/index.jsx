import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllSales } from "../../redux/thunks/allSalesThunks";
import { useChangeColorButton } from "../../hooks/useChangeColorButton";
import { BASE_URL } from "../../utils/constants";
import { calculateDiscountPercent } from "../../utils/calculations";
import { useFilterAndSort } from "../../hooks/useFilterAndSort";
import styles from "./AllSales.module.css";
import { useDispatch, useSelector } from "react-redux";

function AllSales() {
  const dispatch = useDispatch();
  const {
    list: products,
    loading,
    error,
  } = useSelector((state) => state.allSales);

  const { handleAddToCart, addedProductIds, hiddenProductIds } =
    useChangeColorButton();

  const {
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    sortOption,
    setSortOption,
    filteredAndSortedProducts: filteredProducts,
  } = useFilterAndSort(products, { forceDiscounted: true });

  useEffect(() => {
    dispatch(fetchAllSales());
  }, [dispatch]);

  if (loading) return <div className={styles.loading}>Loading sales...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumbBtn}>
            Main page
          </Link>
          <span className={styles.line}></span>
          <span className={`${styles.crumbBtn} ${styles.activeCrumb}`}>
            All sales
          </span>
        </div>

        <h1 className={styles.title}>Discounted items</h1>

        <div className={styles.filterSortContainer}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Price</span>
            <input
              type="number"
              placeholder="from"
              value={priceFrom}
              onChange={(e) => setPriceFrom(e.target.value)}
              className={styles.inputPrice}
            />
            <input
              type="number"
              placeholder="to"
              value={priceTo}
              onChange={(e) => setPriceTo(e.target.value)}
              className={styles.inputPrice}
            />
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Sorted</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className={styles.selectSort}
            >
              <option value="default">by default</option>
              <option value="newest">newest</option>
              <option value="price-high-low">price: high-low</option>
              <option value="price-low-high">price: low-high</option>
            </select>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const discountPercent = calculateDiscountPercent(
                product.price,
                product.discont_price,
              );
              const isAdded = addedProductIds.includes(product.id);
              const isHidden = hiddenProductIds.includes(product.id);

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
                    <button
                      className={`${styles.addToCartBtn} ${isAdded ? styles.added : ""} ${isHidden ? styles.forceHide : ""}`}
                      onClick={(e) => handleAddToCart(product, e)}
                    >
                      {isAdded ? "Added" : "Add to cart"}
                    </button>
                  </div>

                  <div className={styles.infoWrapper}>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <div className={styles.priceContainer}>
                      <span className={styles.currentPrice}>
                        ${product.discont_price ?? product.price}
                      </span>
                      {product.discont_price && (
                        <span className={styles.oldPrice}>
                          ${product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <p className={styles.noProducts}>No discounted items found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllSales;
