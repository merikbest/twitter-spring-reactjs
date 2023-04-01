import axios, { AxiosResponse } from "axios";
import { call } from "redux-saga/effects";

import { fetchUserDetailRequest, userDetailSaga } from "../sagas";
import { fetchUserDetail, setUserDetail, setUserDetailLoadingState } from "../actionCreators";
import { testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { UserDetailResponse } from "../../../../types/user";
import { UserApi } from "../../../../services/api/user-service/userApi";
import { UserDetailActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("userDetailSaga:", () => {
    describe("fetchUserDetailRequest:", () => {
        const mockUserDetailResponse = { data: { id: 1 } } as AxiosResponse<UserDetailResponse>;
        const cancelTokenSource = axios.CancelToken.source();
        const worker = fetchUserDetailRequest(fetchUserDetail({ userId: 1, cancelTokenSource: cancelTokenSource }));

        testLoadingStatus(worker, setUserDetailLoadingState, LoadingStatus.LOADING);

        it("should call getUserDetails", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(UserApi.getUserDetails, 1, cancelTokenSource);

            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockUserDetailResponse, setUserDetail, mockUserDetailResponse.data, "UserDetailResponse");
        testLoadingStatus(worker, setUserDetailLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(userDetailSaga, [
        { actionType: UserDetailActionsType.FETCH_USER_DETAIL, workSaga: fetchUserDetailRequest }
    ]);
});
