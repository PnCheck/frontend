import styles from '@/css/OurAPI.module.css';
import DefaultLayout from '@/containers/DefaultLayout';

function OurAPI() {
  return (
    <DefaultLayout title="Our API">
      <h3 className={styles.title}>Coming Soon!</h3>
      <p className={styles.description}>
        We're currently working on bringing API integration...
      </p>
    </DefaultLayout>
  );
}

export default OurAPI;
