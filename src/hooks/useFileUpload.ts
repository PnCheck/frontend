import { useState } from 'react';
import axios from 'axios';
import { __BASE_URL__ } from '@/constants';

export function useFileUpload() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [file, setFile] = useState('');

  const uploadFile = async (fileInput: File) => {
    try {
      const fileURL = URL.createObjectURL(fileInput);
      setSelectedFile(fileInput);
      setFile(fileURL);

      const formData = new FormData();
      formData.append('file', fileInput);

      // if (!model) model = await tf.loadLayersModel(__MODEL_URL__);

      const response = await axios.post(`${__BASE_URL__}/prepare`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const data = response.data;

      return {
        file,
        selectedFile,
        data,
      };
    } catch (error) {
      console.log('File Upload Error', error);
    }
  };

  return {
    uploadFile,
  };
}
