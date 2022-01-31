import styles from '@/css/Footer.module.css';

type Props = {
  hasDisclaimer?: boolean;
};

function Footer({ hasDisclaimer }: Props) {
  return (
    <footer className={styles.footer}>
      {hasDisclaimer && (
        <section className={styles.start}>
          <h3>Medical Advice Disclaimer</h3>
          <h4>DISCLAIMER: THIS WEBSITE DOES NOT PROVIDE MEDICAL ADVICE</h4>
          <p>
            The information, including but not limited to, text, graphics,
            images and other material contained on this website are for
            informational purposes only. No material on this site is intended to
            be a substitute for professional medical advice, diagnosis or
            treatment. Always seek the advice of your physician or other
            qualified health care provider with any questions you may have
            regarding a medical condition or treatment and before undertaking a
            new health care regimen, and never disregard professional medical
            advice or delay in seeking it because of something you have read on
            this website.
          </p>
        </section>
      )}
      <p className={styles.copyright}>&copy; 2022. PnCheck</p>
    </footer>
  );
}

export default Footer;
