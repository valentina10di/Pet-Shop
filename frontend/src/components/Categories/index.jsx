import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants"; 
import styles from "./Categories.module.css";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/categories/all`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.slice(0, 4));
      })
      .catch((error) => console.error("Ошибка загрузки категорий:", error));
  }, []);

  return (
    <section className={styles.categoriesSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <div className={styles.line}></div>
        <Link to="/categories" className={styles.allCategoriesBtn}>
          All categories
        </Link>
      </div>

      <div className={styles.grid}>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className={styles.card}
          >
            
            <img
              src={`${BASE_URL}${category.image}`}
              alt={category.title}
              className={styles.image}
            />
            <p className={styles.cardTitle}>{category.title}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
