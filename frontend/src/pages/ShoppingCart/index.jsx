import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  incrementCount,
  decrementCount,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";
import { BASE_URL } from "../../utils/constants";
import { sendCartOrder } from "../../redux/thunks/cartThunks";
import {
  calculateTotalItemsCount,
  calculateTotalPrice,
} from "../../utils/cartCounter";
import styles from "./ShoppingCart.module.css";
import minusSvg from "../../assets/icons/minus.svg";
import plusSvg from "../../assets/icons/plus.svg";
import closeSvg from "../../assets/icons/close.svg";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const totalItemsCount = calculateTotalItemsCount(items);
  const totalPrice = calculateTotalPrice(items);

  const onSubmitOrder = (data) => {
    const orderData = {
      client: data,
      items: items.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.discont_price ?? item.price,
        count: item.count,
      })),
      totalPrice,
    };

    dispatch(sendCartOrder(orderData))
      .unwrap()
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((err) => {
        alert(`Failed to send order: ${err}`);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearCart());
    reset();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.mainContainer}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>Shopping cart</h1>
          <div className={styles.line}></div>
          <Link to="/all-products" className={styles.backToStoreBtn}>
            Back to the store
          </Link>
        </div>

        {items.length === 0 ? (
          <div className={styles.emptyContainer}>
            <p className={styles.emptyText}>
              Looks like you have no items in your shopping cart currently.
            </p>
            <Link to="/all-products" className={styles.continueShoppingBtn}>
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className={styles.contentGrid}>
            <div className={styles.cartList}>
              {items.map((item) => {
                const currentPrice = item.discont_price ?? item.price;
                const images = item.images
                  ? Array.isArray(item.images)
                    ? item.images[0]
                    : item.images
                  : item.image;

                return (
                  <div key={item.id} className={styles.cartCard}>
                    <Link
                      to={`/products/${item.id}`}
                      className={styles.imageLink}
                    >
                      <img
                        src={`${BASE_URL}${images}`}
                        alt={item.title}
                        className={styles.cardImage}
                      />
                    </Link>
                    <div className={styles.cardInfo}>
                      <div className={styles.cardTopRow}>
                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <button
                          className={styles.removeBtn}
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <img src={closeSvg} alt="close" />
                        </button>
                      </div>

                      <div className={styles.cardBottomRow}>
                        <div className={styles.counter}>
                          <button
                            className={styles.counterBtn}
                            onClick={() => dispatch(decrementCount(item.id))}
                          >
                            <img src={minusSvg} alt="minus" />
                          </button>
                          <span className={styles.counterValue}>
                            {item.count}
                          </span>
                          <button
                            className={styles.counterBtn}
                            onClick={() => dispatch(incrementCount(item.id))}
                          >
                            <img src={plusSvg} alt="plus" />
                          </button>
                        </div>
                        <div className={styles.priceWrapper}>
                          <span className={styles.currentPrice}>
                            ${currentPrice * item.count}
                          </span>
                          {item.discont_price && (
                            <span className={styles.oldPrice}>
                              ${item.price * item.count}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className={styles.orderDetails}>
              <h2 className={styles.orderTitle}>Order details</h2>
              <div className={styles.orderSummary}>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    {totalItemsCount} items
                  </span>
                </div>
                <div className={styles.summaryTotalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalSum}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitOrder)}
                className={styles.orderForm}
              >
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    placeholder="Name"
                    className={`${styles.formInput} ${errors.name ? styles.errorInput : ""}`}
                    {...register("name", {
                      required: "Please enter your name",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long",
                      },
                      pattern: {
                        value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                        message: "Name should contain only letters",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className={styles.errorText}>
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className={`${styles.formInput} ${errors.phone ? styles.errorInput : ""}`}
                    {...register("phone", {
                      required: "Please enter your phone number",
                      pattern: {
                        value: /^\+?[0-9\s\-()]{7,15}$/,
                        message: "Invalid phone number format",
                      },
                    })}
                  />
                  {errors.phone && (
                    <span className={styles.errorText}>
                      {errors.phone.message}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <input
                    type="email"
                    placeholder="Email"
                    className={`${styles.formInput} ${errors.email ? styles.inputError : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className={styles.errorText}>
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className={styles.orderSubmitBtn}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Processing..." : "Order"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>Congratulations!</h3>
              <div className={styles.modalTextContainer}>
                <p className={styles.modalText}>
                  Your order has been successfully placed on the website.
                </p>
                <p className={styles.modalText}>
                  A manager will contact you shortly to confirm your order.
                </p>
              </div>
            </div>
            <button className={styles.modalCloseBtn} onClick={handleCloseModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
