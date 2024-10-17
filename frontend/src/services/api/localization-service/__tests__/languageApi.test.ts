import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_LOCALIZATION_LANGUAGES } from "../../../../constants/endpoint-constants";
import { languages } from "../../../../util/test-utils/mock-test-data";
import { LanguageApi } from "../languageApi";

describe("LanguageApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch LanguageApi.getLanguages", () => {
        it("[200] should get languages Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_LOCALIZATION_LANGUAGES, 200, languages, LanguageApi.getLanguages);
        });
    });
});
