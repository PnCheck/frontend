import styles from '@/css/Default.module.css';
import Head from 'next/head';
import React, { useState } from 'react';
import Footer from '@/components/Footer';

type Props = {
  title?: string;
  children: React.ReactNode;
  loading?: boolean;
};

function DefaultLayout({ title, children, loading }: Props) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <React.Fragment>
      <Head>
        <title>
          PnCheck | {title || 'Web app to detect Pneumonia in Chest X-rays'}
        </title>
      </Head>
      {loading && (
        <section className={styles.overlay}>
          <div className={styles.spinner} />
        </section>
      )}
      <main className={styles.wrapper}>
        <section className={styles.inner}>
          <h3 className={styles.title}>PnCheck</h3>
          <section style={{ position: 'relative' }}>
            <h6 className={styles.subtitle}>
              Web app to detect Pneumonia in Chest X-rays.
              <button
                type="button"
                className={styles.info}
                onMouseOut={() => setShowTooltip(false)}
                onMouseOver={() => setShowTooltip(true)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                &#9432;
              </button>
            </h6>
            {showTooltip && (
              <div className={styles.tooltip}>
                <p>
                  A web app that uses a pretrained Convolution Neural Network
                  model to be able to make client-side predictions for the
                  classification of chest X-ray images to having or not having
                  Pneumonia
                </p>
              </div>
            )}
          </section>
          <section className={styles.start}>{children}</section>
          <Footer />
        </section>
      </main>
    </React.Fragment>
  );
}

export default DefaultLayout;
