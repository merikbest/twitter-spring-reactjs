import axios from 'axios';
import {Image} from "../store/types/common";
import {API_URL} from "./url";

export const uploadImage = async (image: File): Promise<Image> => {
  const formData = new FormData();
  formData.append('file', image);

  const { data } = await axios.post(`${API_URL}/user/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
