import { AxiosResponse } from "axios";

import { WallpaperResponse } from "../../../types/localization";
import { axios } from "../../../core/axios";
import { UI_V1_LOCALIZATION_WALLPAPERS } from "../../../constants/endpoint-constants";

export const WallpaperApi = {
    async getWallpapers(): Promise<AxiosResponse<WallpaperResponse[]>> {
        return await axios.get<WallpaperResponse[]>(UI_V1_LOCALIZATION_WALLPAPERS);
    }
};
