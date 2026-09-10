import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import fourSvg from '../../assets/4.svg';
import petImgSvg from '../../assets/pet-img.svg';

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={fourSvg} alt="4" className={styles.digit} />
        <img src={petImgSvg} alt="Cat and Dog" className={styles.petImage} />
        <img src={fourSvg} alt="4" className={styles.digit} />
      </div>

      <div className={styles.infoBlock}>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.subtitle}>
          We’re sorry, the page you requested could not be found.<br />
          Please go back to the homepage.
        </p>
        <Link to="/" className={styles.homeButton}>
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;