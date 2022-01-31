import styles from '@/css/Home.module.css';
import { useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { __BASE_URL__, __MODEL_URL__ } from '@/constants';
import Head from 'next/head';
import * as tf from '@tensorflow/tfjs';
import { useFileUpload } from '@/hooks/useFileUpload';
import Footer from '@/components/Footer';

function HomePage() {
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState();
  const uploaderRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { resizeImage } = useFileUpload();

  let model;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const resizedImage = await resizeImage(e.target.files[0]);
      const fileURL = URL.createObjectURL(resizedImage as Blob);
      setFile(fileURL);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      if (!model) model = await tf.loadLayersModel(__MODEL_URL__);

      const response = await axios.post(`${__BASE_URL__}/prepare`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;
      const image = data?.image;
      const imageSize = [1, 128, 128, 1];

      const processedImage = tf.tensor2d(image);
      const predict = model.predict(tf.reshape(processedImage, imageSize));
      // const label = predict.argMax(1).get([0]);

      const predictionValue = predict?.dataSync()[0];
      setPrediction(predictionValue);
      setLoading(false);
    } catch (error) {
      console.log('File Upload Error', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (uploaderRef?.current) {
      uploaderRef.current.click();
    }
  };

  const predictionNum = prediction as number;

  return (
    <>
      <Head>
        <title>PnCheck | Home</title>
      </Head>
      <main className={styles.wrapper}>
        {loading && (
          <section className={styles.overlay}>
            <div className={styles.spinner} />
          </section>
        )}
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
          <section className={styles.start}>
            <form method="POST" className={styles.form}>
              <input
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                ref={uploaderRef}
              />
              <button
                className={styles.uploader}
                onClick={handleClick}
                type="button"
              >
                Click to Upload File
              </button>
              <section className={styles.view}>
                {file && (
                  <Image src={file} alt="xray of a human chest" layout="fill" />
                )}
              </section>
              {prediction && (
                <section className={styles.result}>
                  <h4>
                    Classification:{' '}
                    <span>
                      {predictionNum > 0.5 ? 'Pneumonia' : 'No Pneumonia'}
                    </span>
                  </h4>
                  <h4>
                    Pneumonia Probability:{' '}
                    <span>{(prediction * 100).toFixed(2)}%</span>
                  </h4>
                </section>
              )}
            </form>
          </section>
        </section>
        <Footer />
      </main>
    </>
  );
}

export default HomePage;
