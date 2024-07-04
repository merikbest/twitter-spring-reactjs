import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_USER_COUNTRY_CODES, UI_V1_USER_LANGUAGES } from "../../../../constants/endpoint-constants";
import { countryCodes, languages } from "../../../../util/test-utils/mock-test-data";
import { LocalizationApi } from "../localizationApi";

describe("LocalizationApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch LocalizationApi.getCountryCodes", () => {
        it("[200] should get country codes Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_USER_COUNTRY_CODES, 200, countryCodes, LocalizationApi.getCountryCodes);
        });
    });

    describe("should fetch LocalizationApi.getLanguages", () => {
        it("[200] should get languages Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_USER_LANGUAGES, 200, languages, LocalizationApi.getLanguages);
        });
    });
});
