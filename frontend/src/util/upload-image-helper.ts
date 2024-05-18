import axios from "axios";
import { UI_V1_IMAGE_UPLOAD } from "../constants/endpoint-constants";

export const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", image);

    const { data } = await axios.post(UI_V1_IMAGE_UPLOAD, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return data;
};
