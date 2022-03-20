import axios from "axios";
import {fetchUserDetailRequest, userDetailSaga} from "./sagas";
import {fetchUserDetail, setUserDetail, setUserDetailLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {UserDetailResponse} from "../../types/user";
import {UserApi} from "../../../services/api/userApi";
import {call} from "redux-saga/effects";
import {UserDetailActionsType} from "./contracts/actionTypes";

describe("userDetailSaga:", () => {
    describe("fetchUserDetailRequest:", () => {
        const mockUserDetailResponse = {id: 1} as UserDetailResponse;
        const cancelTokenSource = axios.CancelToken.source();
        const worker = fetchUserDetailRequest(fetchUserDetail({userId: 1, cancelTokenSource: cancelTokenSource}));
        
        testLoadingStatus(worker, setUserDetailLoadingState, LoadingStatus.LOADING);

        it("should call getUserDetails", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(UserApi.getUserDetails, 1, cancelTokenSource);

            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockUserDetailResponse, setUserDetail, mockUserDetailResponse, "UserDetailResponse");
        testLoadingStatus(worker, setUserDetailLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(userDetailSaga, [
        {actionType: UserDetailActionsType.FETCH_USER_DETAIL, workSaga: fetchUserDetailRequest},
    ]);
});
