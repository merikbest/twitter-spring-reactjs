import {blockedAndMutedUsersSaga, fetchBlockedUsersRequest, fetchMutedUsersRequest} from "./sagas";
import {setBlockedAndMutedUsersLoadingState, setBlockedUsers, setMutedUsers} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {UserApi} from "../../../services/api/userApi";
import {BlockedUserResponse, MutedUserResponse} from "../../types/user";
import {BlockedAndMutedUsersActionsType} from "./contracts/actionTypes";

describe("blockedAndMutedUsersSaga:", () => {
    
    describe("fetchBlockedUsersRequest:", () => {
        const mockBlockedUserResponse = [{id: 1}, {id: 2}] as BlockedUserResponse[];
        const worker = fetchBlockedUsersRequest();

        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getBlockList);
        testSetResponse(worker, mockBlockedUserResponse, setBlockedUsers, mockBlockedUserResponse, "BlockedUserResponse");
        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchMutedUsersRequest:", () => {
        const mockMutedUserResponse = [{id: 1}, {id: 2}] as MutedUserResponse[];
        const worker = fetchMutedUsersRequest();

        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getMutedList);
        testSetResponse(worker, mockMutedUserResponse, setMutedUsers, mockMutedUserResponse, "BlockedUserResponse");
        testLoadingStatus(worker, setBlockedAndMutedUsersLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(blockedAndMutedUsersSaga, [
        {actionType: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS, workSaga: fetchBlockedUsersRequest},
        {actionType: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS, workSaga: fetchMutedUsersRequest},
    ]);
});
