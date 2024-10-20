import { localizationReducer, initialLocalizationState } from "../reducer";
import { LocalizationActions, LocalizationActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { CountryCodeResponse, LanguagesResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";
import { GifImageResponse, WallpaperResponse } from "../../../../types/localization";

describe("localizationReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(localizationReducer(undefined, {} as LocalizationActions)).toEqual(initialLocalizationState);
        });
    });

    describe("localization handlers:", () => {
        testActionDispatch(
            LocalizationActionsType.SET_COUNTRY_CODES,
            localizationReducer(initialLocalizationState, {
                type: LocalizationActionsType.SET_COUNTRY_CODES,
                payload: [{ id: 1 }] as CountryCodeResponse[]
            }),
            {
                ...initialLocalizationState,
                countryCodes: [{ id: 1 }] as CountryCodeResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            LocalizationActionsType.SET_GIF_IMAGES,
            localizationReducer(initialLocalizationState, {
                type: LocalizationActionsType.SET_GIF_IMAGES,
                payload: [{ id: 1 }] as GifImageResponse[]
            }),
            {
                ...initialLocalizationState,
                gifImages: [{ id: 1 }] as GifImageResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            LocalizationActionsType.SET_LANGUAGES,
            localizationReducer(initialLocalizationState, {
                type: LocalizationActionsType.SET_LANGUAGES,
                payload: [{ id: 1 }] as LanguagesResponse[]
            }),
            {
                ...initialLocalizationState,
                languages: [{ id: 1 }] as LanguagesResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            LocalizationActionsType.SET_WALLPAPERS,
            localizationReducer(initialLocalizationState, {
                type: LocalizationActionsType.SET_WALLPAPERS,
                payload: [{ id: 1 }] as WallpaperResponse[]
            }),
            {
                ...initialLocalizationState,
                wallpapers: [{ id: 1 }] as WallpaperResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            LocalizationActionsType.RESET_LOCALIZATION_STATE,
            localizationReducer(initialLocalizationState, {
                type: LocalizationActionsType.RESET_LOCALIZATION_STATE
            }),
            {
                ...initialLocalizationState,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            LocalizationActionsType.SET_LOADING_STATE,
            localizationReducer(initialLocalizationState, {
                type: LocalizationActionsType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialLocalizationState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
