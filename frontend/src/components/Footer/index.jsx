import styles from "./Footer.module.css";
import instagramIcon from "../../assets/icons/instagram.svg";
import whatsappIcon from "../../assets/icons/WhatsApp.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Contact</h2>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.phoneCard}`}>
            <span className={styles.label}>Phone</span>
            <a href="tel:+493091588492" className={styles.valueLink}>
              +49 30 915-88492
            </a>
          </div>

          <div className={`${styles.card} ${styles.socialsCard}`}>
            <span className={styles.label}>Socials</span>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/itcareerhub/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <img
                  src={instagramIcon}
                  alt="Instagram"
                  className={styles.socialIcon}
                />
              </a>
              <a
                href="https://wa.me/493091588492"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={styles.socialLink}
              >
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                  className={styles.socialIcon}
                />
              </a>
            </div>
          </div>

        
          <div className={`${styles.card} ${styles.addressCard}`}>
            <span className={styles.label}>Address</span>
            <p className={styles.valueText}>
              Wallstraße 9-13, 10179 Berlin, Deutschland
            </p>
          </div>

          <div className={`${styles.card} ${styles.hoursCard}`}>
            <span className={styles.label}>Working Hours</span>
            <p className={styles.valueText}>24 hours a day</p>
          </div>
        </div>

        <div className={styles.mapContainer}>
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.997237894954!2d13.40237747688326!3d52.51138993685653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84e2182b811a7%3A0x6b24d77567840b2b!2sWallstra%C3%9Fe%209-13%2C%2010179%20Berlin%2C%20Germany!5e0!3m2!1sru!2sde!4v1710000000000!5m2!1sru!2sde"
            width="1360"
            height="350"
            className={styles.iframe}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
