import { AxiosResponse } from "axios";

import { GifImageResponse } from "../../../types/localization";
import { axios } from "../../../core/axios";
import { UI_V1_LOCALIZATION_GIF_IMAGES } from "../../../constants/endpoint-constants";

export const GifImageApi = {
    async getGifImages(): Promise<AxiosResponse<GifImageResponse[]>> {
        return await axios.get<GifImageResponse[]>(UI_V1_LOCALIZATION_GIF_IMAGES);
    }
};
