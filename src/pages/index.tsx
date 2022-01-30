import styles from '@/css/Home.module.css';
import { useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { __BASE_URL__, __MODEL_URL__ } from '@/constants';
import Head from 'next/head';
import * as tf from '@tensorflow/tfjs';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState();
  const uploaderRef = useRef<HTMLInputElement>(null);

  let model;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
      setFile(fileURL);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      if (!model) model = await tf.loadLayersModel(__MODEL_URL__);

      const response = await axios.post(`${__BASE_URL__}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;

      const processedImage = tf.tensor2d(data);
      const result = model.predict(tf.reshape(processedImage, [1, 28, 28, 1]));
      setPrediction(result);
      // const label = prediction.argMax(1).get([0]);

      alert(response.data.message);
    } catch (error) {
      console.log('File Upload Error', error);
    }
  };

  const handleClick = () => {
    if (uploaderRef?.current) {
      uploaderRef.current.click();
    }
  };

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
          <section className={styles.start}>
            <form method="POST" className={styles.form}>
              <input
                accept="image/*"
                type="file"
                onChange={handleFileUpload}
                style={{ visibility: 'hidden' }}
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
                  <Image
                    src={{
                      src: file,
                      width: 300,
                      height: 300,
                    }}
                    alt="xray of a human thorax"
                    objectFit="cover"
                  />
                )}
              </section>
              {prediction && <h3 className="result">{prediction}</h3>}
            </form>
          </section>
        </section>
      </main>
    </>
  );
}

export default HomePage;
