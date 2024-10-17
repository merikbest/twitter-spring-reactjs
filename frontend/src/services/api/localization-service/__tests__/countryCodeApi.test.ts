import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_LOCALIZATION_COUNTRY_CODES } from "../../../../constants/endpoint-constants";
import { countryCodes } from "../../../../util/test-utils/mock-test-data";
import { CountryCodeApi } from "../countryCodeApi";

describe("CountryCodeApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch CountryCodeApi.getCountryCodes", () => {
        it("[200] should get country codes Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_LOCALIZATION_COUNTRY_CODES, 200, countryCodes, CountryCodeApi.getCountryCodes);
        });
    });
});
