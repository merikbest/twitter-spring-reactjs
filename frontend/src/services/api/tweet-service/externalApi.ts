import { AxiosResponse } from "axios";

import { GiphyDataProps } from "../../../types/tweet";
import { axios } from "../../../core/axios";
import { GIPHY_API_URL } from "../../../constants/url-constants";

export const ExternalApi = {
    async searchGif(text: string): Promise<AxiosResponse<GiphyDataProps[]>> {
        return await axios.get<GiphyDataProps[]>(`${GIPHY_API_URL}${text}`);
    }
};
