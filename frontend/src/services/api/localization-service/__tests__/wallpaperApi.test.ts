import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_LOCALIZATION_WALLPAPERS } from "../../../../constants/endpoint-constants";
import { wallpapers } from "../../../../util/test-utils/mock-test-data";
import { WallpaperApi } from "../wallpaperApi";

describe("WallpaperApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch WallpaperApi.getWallpapers", () => {
        it("[200] should get wallpapers Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_LOCALIZATION_WALLPAPERS, 200, wallpapers, WallpaperApi.getWallpapers);
        });
    });
});
