import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { UI_V1_USER_MUTED, UI_V1_USER_MUTED_USER_ID } from "../../../../constants/endpoint-constants";
import { mockMutedUsers } from "../../../../util/test-utils/mock-test-data";
import { MuteUserApi } from "../muteUserApi";

describe("MuteUserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch MuteUserApi.getMutedList", () => {
        it("[200] should get muted list Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_USER_MUTED, 200, mockMutedUsers, MuteUserApi.getMutedList, 1);
        });
    });

    describe("should fetch MuteUserApi.processMutedList", () => {
        it("[200] should process muted list Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_USER_MUTED_USER_ID(1), 200, true, MuteUserApi.processMutedList, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_USER_MUTED_USER_ID(1), 404, mockUserErrorResponse, MuteUserApi.processMutedList, 1);
        });
    });
});
