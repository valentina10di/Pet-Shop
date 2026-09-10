import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/thunks/allProductsThunk";
import { calculateDiscountPercent } from "../../utils/calculations";
import { useFilterAndSort } from "../../hooks/useFilterAndSort";
import { useChangeColorButton } from "../../hooks/useChangeColorButton";
import { BASE_URL } from "../../utils/constants";
import styles from "./AllProdukts.module.css";

function AllProducts() {
  const dispatch = useDispatch();
  
  const {
    list: products,
    loading,
    error,
  } = useSelector((state) => state.allProducts);

  const { handleAddToCart, addedProductIds, hiddenProductIds } =
    useChangeColorButton();

 
  const {
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    onlyDiscounted,
    setOnlyDiscounted,
    sortOption,
    setSortOption,
    filteredAndSortedProducts: filteredProducts
  } = useFilterAndSort(products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (loading) return <div className={styles.loading}>Loading products...</div>;
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
            All products
          </span>
        </div>

        <h1 className={styles.title}>All products</h1>

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
            <span className={styles.filterLabel}>Discounted items</span>
            <input
              type="checkbox"
              checked={onlyDiscounted}
              onChange={(e) => setOnlyDiscounted(e.target.checked)}
              className={styles.checkboxInput}
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
            <p className={styles.noProducts}>
              No products found matching your criteria.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}

export default AllProducts;
