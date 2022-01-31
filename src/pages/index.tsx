import { __BASE_URL__, __MODEL_URL__ } from '@/constants';
import DefaultLayout from '@/containers/DefaultLayout';
import styles from '@/css/Home.module.css';
import { useFileUpload } from '@/hooks/useFileUpload';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { Notyf } from 'notyf';

function HomePage() {
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState();
  const [notyf, setNotyf] = useState<Notyf>();

  const uploaderRef = useRef<HTMLInputElement>(null);

  const { resizeImage } = useFileUpload();

  let model;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const selectedFile = e.target.files?.[0];
      const resizedImage = await resizeImage(selectedFile);
      const fileURL = URL.createObjectURL(resizedImage as Blob);
      setFile(fileURL);

      const formData = new FormData();
      formData.append('file', selectedFile);

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

      const predictionValue = predict?.dataSync()?.[0];
      setPrediction(predictionValue);
      setLoading(false);
    } catch (error) {
      // console.log('File Upload Error', error?.message);
      notyf?.error(error.message);
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (uploaderRef?.current) {
      uploaderRef.current.click();
    }
  };

  const predictionNum = prediction as number;

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setNotyf(new Notyf());
    }

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DefaultLayout loading={loading} hasDisclaimer>
      <form method="POST" className={styles.form}>
        <input
          accept="image/*"
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          ref={uploaderRef}
        />
        <button className={styles.uploader} onClick={handleClick} type="button">
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
              <span>{predictionNum > 0.5 ? 'Pneumonia' : 'No Pneumonia'}</span>
            </h4>
            <h4>
              Pneumonia Probability:{' '}
              <span>{(prediction * 100).toFixed(2)}%</span>
            </h4>
          </section>
        )}
      </form>
    </DefaultLayout>
  );
}

export default HomePage;
