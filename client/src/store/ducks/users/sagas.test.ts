import {fetchRelevantUsersRequest, fetchUsersRequest, usersSaga} from "./sagas";
import {setUsers, setUsersLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {UserResponse} from "../../types/user";
import {UserApi} from "../../../services/api/userApi";
import {UsersActionsType} from "./contracts/actionTypes";

describe("usersSaga:", () => {
    const mockUserResponse = [{id: 1}, {id: 1}] as UserResponse[];

    describe("fetchUsersRequest:", () => {
        const worker = fetchUsersRequest();

        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUsers);
        testSetResponse(worker, mockUserResponse, setUsers, mockUserResponse, "UserResponse");
        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchRelevantUsersRequest:", () => {
        const worker = fetchRelevantUsersRequest();

        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getRelevantUsers);
        testSetResponse(worker, mockUserResponse, setUsers, mockUserResponse, "UserResponse");
        testLoadingStatus(worker, setUsersLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(usersSaga, [
        {actionType: UsersActionsType.FETCH_USERS, workSaga: fetchUsersRequest},
        {actionType: UsersActionsType.FETCH_RELEVANT_USERS, workSaga: fetchRelevantUsersRequest},
    ]);
});
