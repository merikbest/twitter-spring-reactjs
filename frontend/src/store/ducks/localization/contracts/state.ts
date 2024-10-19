import { LoadingStatus } from "../../../../types/common";
import {
    CountryCodeResponse,
    GifImageResponse,
    LanguagesResponse,
    WallpaperResponse
} from "../../../../types/localization";

export interface LocalizationState {
    countryCodes: CountryCodeResponse[];
    gifImages: GifImageResponse[];
    languages: LanguagesResponse[];
    wallpapers: WallpaperResponse[];
    loadingState: LoadingStatus;
}
