import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_LOCALIZATION_GIF_IMAGES } from "../../../../constants/endpoint-constants";
import { gifImage } from "../../../../util/test-utils/mock-test-data";
import { GifImageApi } from "../gifImageApi";

describe("GifImageApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch GifImageApi.getGifImages", () => {
        it("[200] should get gif images Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_LOCALIZATION_GIF_IMAGES, 200, gifImage, GifImageApi.getGifImages);
        });
    });
});
