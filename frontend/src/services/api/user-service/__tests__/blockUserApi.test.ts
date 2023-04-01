import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { mockBlockedUsers } from "../../../../util/test-utils/mock-test-data";
import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { API_USER_BLOCKED } from "../../../../constants/endpoint-constants";
import { BlockUserApi } from "../blockUserApi";

describe("BlockUserApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "User not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch BlockUserApi.getBlockList", () => {
        it("[200] should get block list Success", () => {
            testApiCall(mockAdapter, "onGet", API_USER_BLOCKED, 200, mockBlockedUsers, BlockUserApi.getBlockList, 1);
        });
    });

    describe("should fetch BlockUserApi.processBlockList", () => {
        it("[200] should process block list Success", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_BLOCKED}/1`, 200, true, BlockUserApi.processBlockList, 1);
        });

        it("[404] should user not found", () => {
            testApiCall(mockAdapter, "onGet", `${API_USER_BLOCKED}/1`, 404, mockUserErrorResponse, BlockUserApi.processBlockList, 1);
        });
    });
});
