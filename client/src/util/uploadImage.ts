import axios from 'axios';
import {Image} from "../store/ducks/tweets/contracts/state";

export const uploadImage = async (image: File): Promise<Image> => {
  const formData = new FormData();
  formData.append('file', image);

  const { data } = await axios.post('http://localhost:8080/api/v1/user/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
