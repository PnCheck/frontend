import styles from '@/css/Home.module.css';
import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { __BASE_URL } from '@/constants';

function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [file, setFile] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
      setFile(fileURL);

      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      const response = await axios.post(`${__BASE_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert(response.data.message);
    } catch (error) {
      console.log('File Upload Error', error);
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.inner}>
        <section className={styles.start}>
          <form method="POST" className={styles.form}>
            <input accept="image/*" type="file" onChange={handleFileUpload} />
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
          </form>
        </section>
        {/* <section className={styles.end}></section> */}
      </section>
    </main>
  );
}

export default HomePage;
