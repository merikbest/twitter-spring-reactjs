import axios from "axios";
import { API_USER_UPLOAD_IMAGE } from "../constants/endpoint-constants";

export const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);

    const { data } = await axios.post(API_USER_UPLOAD_IMAGE, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return data;
};
