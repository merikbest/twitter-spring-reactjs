import {AxiosResponse} from "axios";

import {fetchRelevantUsersRequest, fetchUsersRequest, usersSaga} from "../sagas";
import {fetchUsers, setPageableUsers, setUsers, setUsersLoadingState} from "../actionCreators";
import {LoadingStatus} from "../../../types";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/testHelper";
import {UserResponse} from "../../../types/user";
import {UserApi} from "../../../../services/api/userApi";
import {UsersActionsType} from "../contracts/actionTypes";

describe("usersSaga:", () => {
    const mockUserResponse = {
        data: [{id: 1}, {id: 1}],
        headers: {"page-total-count": 1}
    } as AxiosResponse<UserResponse[]>;

    describe("fetchUsersRequest:", () => {
        const worker = fetchUsersRequest(fetchUsers(1));

        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUsers, 1);
        testSetResponse(worker, mockUserResponse, setPageableUsers, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchRelevantUsersRequest:", () => {
        const worker = fetchRelevantUsersRequest();

        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getRelevantUsers);
        testSetResponse(worker, mockUserResponse, setUsers, mockUserResponse.data, "UserResponse");
        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(usersSaga, [
        {actionType: UsersActionsType.FETCH_USERS, workSaga: fetchUsersRequest},
        {actionType: UsersActionsType.FETCH_RELEVANT_USERS, workSaga: fetchRelevantUsersRequest},
    ]);
});
