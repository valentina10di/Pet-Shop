import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./CatigoriesAll.module.css";
import { BASE_URL } from "../../utils/constants";

function CatigoriesAll() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/all`)
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <div className={styles.loading}>Loading categories...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContainer}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.crumbBtn}>
            Main page
          </Link>
          <span className={styles.line}></span>
          <Link
            to="/categories"
            className={`${styles.crumbBtn} ${styles.activeCrumb}`}
          >
            Categories
          </Link>
        </div>

        <h1 className={styles.title}>Categories</h1>

        <div className={styles.categoriesGrid}>
          {categories.map((category) => (
            <Link
              to={`/categories/${category.id}`}
              key={category.id}
              className={styles.categoryCard}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={`${BASE_URL}${category.image}`}
                  alt={category.title}
                  className={styles.image}
                />
              </div>
              <h3 className={styles.categoryTitle}>{category.title}</h3>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CatigoriesAll;
