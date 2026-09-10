import { Link } from 'react-router-dom';
import styles from './Banner.module.css';


function Banner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Amazing Discounts<br />
          on Pets Products!
        </h1>
        <Link to="/all-sales" className={styles.button}>
          Check out
        </Link>
      </div>
    </section>
  );
};

export default Banner;