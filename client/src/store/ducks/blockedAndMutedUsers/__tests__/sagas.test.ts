import {AxiosResponse} from "axios";

import {blockedAndMutedUsersSaga, fetchBlockedUsersRequest, fetchMutedUsersRequest} from "../sagas";
import {
    fetchBlockedUsers,
    fetchMutedUsers,
    setBlockedAndMutedUsersLoadingState,
    setBlockedUsers,
    setMutedUsers
} from "../actionCreators";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/testHelper";
import {UserApi} from "../../../../services/api/userApi";
import {BlockedUserResponse, MutedUserResponse} from "../../../types/user";
import {BlockedAndMutedUsersActionsType} from "../contracts/actionTypes";
import {LoadingStatus} from "../../../types/common";

describe("blockedAndMutedUsersSaga:", () => {

    describe("fetchBlockedUsersRequest:", () => {
        const mockBlockedUserResponse = {
            data: [{id: 1}, {id: 2}],
            headers: {"page-total-count": 1}
        } as AxiosResponse<BlockedUserResponse[]>;
        const worker = fetchBlockedUsersRequest(fetchBlockedUsers(1));

        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getBlockList, 1);
        testSetResponse(worker, mockBlockedUserResponse, setBlockedUsers, mockExpectedResponse(mockBlockedUserResponse), "BlockedUserResponse");
        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchMutedUsersRequest:", () => {
        const mockMutedUserResponse = {
            data: [{id: 1}, {id: 2}],
            headers: {"page-total-count": 1}
        } as AxiosResponse<MutedUserResponse[]>;
        const worker = fetchMutedUsersRequest(fetchMutedUsers(1));

        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getMutedList, 1);
        testSetResponse(worker, mockMutedUserResponse, setMutedUsers, mockExpectedResponse(mockMutedUserResponse), "BlockedUserResponse");
        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(blockedAndMutedUsersSaga, [
        {actionType: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS, workSaga: fetchBlockedUsersRequest},
        {actionType: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS, workSaga: fetchMutedUsersRequest},
    ]);
});
