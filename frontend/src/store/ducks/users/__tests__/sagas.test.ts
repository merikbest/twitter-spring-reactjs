import { AxiosResponse } from "axios";

import { fetchRelevantUsersRequest, fetchUsersRequest, usersSaga } from "../sagas";
import { fetchUsers, setPageableUsers, setUsers, setUsersLoadingState } from "../actionCreators";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/test-utils/test-helper";
import { UserResponse } from "../../../../types/user";
import { UserApi } from "../../../../services/api/user-service/userApi";
import { UsersActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("usersSaga:", () => {
    const mockUserResponse = {
        data: [{ id: 1 }, { id: 1 }],
        headers: { PAGE_TOTAL_COUNT: 1 }
    } as AxiosResponse<UserResponse[]>;

    describe("fetchUsersRequest:", () => {
        const worker = fetchUsersRequest(fetchUsers(1));

        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUsers, 1);
        testSetResponse(worker, mockUserResponse, setPageableUsers, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRelevantUsersRequest:", () => {
        const worker = fetchRelevantUsersRequest();

        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getRelevantUsers);
        testSetResponse(worker, mockUserResponse, setUsers, mockUserResponse.data, "UserResponse");
        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(usersSaga, [
        { actionType: UsersActionsType.FETCH_USERS, workSaga: fetchUsersRequest },
        { actionType: UsersActionsType.FETCH_RELEVANT_USERS, workSaga: fetchRelevantUsersRequest }
    ]);
});
