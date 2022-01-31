import styles from '@/css/Info.module.css';
import DefaultLayout from '@/containers/DefaultLayout';

function Info() {
  return (
    <DefaultLayout title="Info">
      <p className={styles.description}>
        A web app that uses a pretrained Convolution Neural Network model to be
        able to make client-side predictions for the classification of chest
        X-ray images to having or not having Pneumonia
      </p>
    </DefaultLayout>
  );
}

async function getStaticProps() {}

export default Info;
