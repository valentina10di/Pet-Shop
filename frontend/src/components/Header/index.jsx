import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { calculateTotalItemsCount } from '../../utils/cartCounter';
import styles from './Header.module.css';
import logo from '../../assets/icons/logo.svg';
import cartIcon from '../../assets/icons/cart.svg';

function Header() {
  const items = useSelector((state) => state.cart.items);
  const totalCount = calculateTotalItemsCount(items);

  const setActiveClass = ({ isActive }) => 
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logoLink}>
          <img src={logo} alt="Логотип" className={styles.logo} />
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={setActiveClass} end>Main Page</NavLink>
          <NavLink to="/categories" className={setActiveClass}>Categories</NavLink>
          <NavLink to="/all-products" className={setActiveClass}>All products</NavLink>
          <NavLink to="/all-sales" className={setActiveClass}>All sales</NavLink>
        </nav>

        <div className={styles.actions}>
          <NavLink to="/cart" className={({ isActive }) => isActive ? `${styles.cartLink} ${styles.active}` : styles.cartLink} aria-label="Cart">
            <img src={cartIcon} alt="Cart" className={styles.cartIcon} />
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;