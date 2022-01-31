import styles from '@/css/Info.module.css';
import DefaultLayout from '@/containers/DefaultLayout';
import Image from 'next/image';

function Info() {
  return (
    <DefaultLayout title="Info">
      <p className={styles.description}>
        A web app that uses a pretrained Convolution Neural Network model to be
        able to make client-side predictions for the classification of chest
        X-ray images to having or not having Pneumonia
      </p>
      <h3 className={styles.title}>Examples</h3>
      <section className={styles.display}>
        <section className={styles.box}>
          <Image
            src="/images/normal1.jpeg"
            alt="normal chest x-ray"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </section>
        <section className={styles.box}>
          <Image
            src="/images/pneumonia2.jpeg"
            alt="pneumonic chest x-ray"
            layout="fill"
            placeholder="blur"
            blurDataURL="/images/placeholder.png"
          />
        </section>
      </section>
    </DefaultLayout>
  );
}

export default Info;
