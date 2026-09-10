import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import styles from './OrderForm.module.css';
import orderImage from '../../assets/order.svg';
import { BASE_URL } from "../../utils/constants";

function OrderForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmittedState, setIsSubmittedState] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('');

  const formRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } 
  = useForm({
    mode: 'onBlur',
    defaultValues: { name: '', phone: '', email: '' },
  });

const onSubmit = async (data) => {
  setServerError('');
  setCurrentUserName(data.name);

  try {
    await axios.post(`${BASE_URL}/sale/send`, data);

    setIsSubmittedState(true);

    setTimeout(() => {
      setIsSubmittedState(false);
    }, 1000);

    setIsModalOpen(true);
    reset();
  } catch {
    setServerError('Failed to submit the request. Please try again later.');
  }
};

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <section className={styles.discountSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>5% off on the first order</h2>

        <div className={styles.contentWrapper}>
          <div className={styles.imageWrapper}>
            <img src={orderImage} alt="Animals" className={styles.image} />
          </div>

          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Name"
                className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
                {...register('name', {
                  required: 'Please enter your name',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters long',
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                    message: 'Name should contain only letters',
                  },
                })}
              />
              {errors.name && <span className={styles.errorText}>{errors.name.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="tel"
                placeholder="Phone number"
                className={`${styles.input} ${errors.phone ? styles.errorInput : ''}`}
                {...register('phone', {
                  required: 'Please enter your phone number',
                  pattern: {
                    value: /^\+?[0-9\s\-()]{7,15}$/,
                    message: 'Invalid phone number format',
                  },
                })}
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <input
                type="email"
                placeholder="Email"
                className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
                {...register('email', {
                  required: 'Please fill in the email field',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
            </div>

            {serverError && <p className={styles.serverError}>{serverError}</p>}

            <button 
              type="submit" 
              className={`${styles.submitBtn} ${isSubmittedState ? styles.submitted : ''}`} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : isSubmittedState ? 'Request Submitted' : 'Get a discount'}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleOverlayClick}>
          <div className={styles.modalContent}>
            <h3>Congratulations, {currentUserName || 'User'}!</h3>
            <p>You have received a 5% discount</p>
            <button className={styles.closeModalBtn} onClick={() => setIsModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderForm;