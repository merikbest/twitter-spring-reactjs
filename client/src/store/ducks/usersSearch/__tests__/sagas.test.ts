import {AxiosResponse} from "axios";

import {
    fetchFollowersRequest,
    fetchFollowingsRequest,
    fetchParticipantsByUsernameRequest,
    fetchUsersSearchByUsernameRequest,
    fetchUsersSearchRequest,
    usersSearchSaga
} from "../sagas";
import {
    fetchFollowers,
    fetchFollowings,
    fetchParticipantsByUsername,
    fetchUsersSearch,
    fetchUsersSearchByUsername,
    setPageableFollowers,
    setPageableUsersSearch,
    setUsersSearchLoadingState
} from "../actionCreators";
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
import {UsersSearchActionsType} from "../contracts/actionTypes";
import {ChatApi} from "../../../../services/api/chatApi";

describe("usersSearchSaga:", () => {
    const mockUserResponse = {
        data: [{id: 1}, {id: 1}],
        headers: {"page-total-count": 1}
    } as AxiosResponse<UserResponse[]>;

    describe("fetchUsersSearchRequest:", () => {
        const worker = fetchUsersSearchRequest(fetchUsersSearch(1));
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUsers, 1);
        testSetResponse(worker, mockUserResponse, setPageableUsersSearch, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchUsersSearchByUsernameRequest:", () => {
        const worker = fetchUsersSearchByUsernameRequest(fetchUsersSearchByUsername({username: "test", page: 1}));
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.searchUsersByUsername, {username: "test", page: 1});
        testSetResponse(worker, mockUserResponse, setPageableUsersSearch, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchParticipantsByUsernameRequest:", () => {
        const worker = fetchParticipantsByUsernameRequest(fetchParticipantsByUsername({username: "test", page: 1}));
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.searchParticipantsByUsername, {username: "test", page: 1});
        testSetResponse(worker, mockUserResponse, setPageableUsersSearch, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchFollowersRequest:", () => {
        const worker = fetchFollowersRequest(fetchFollowers({userId: 1, page: 1}));
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getFollowers, {userId: 1, page: 1});
        testSetResponse(worker, mockUserResponse, setPageableFollowers, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchFollowingsRequest:", () => {
        const worker = fetchFollowingsRequest(fetchFollowings({userId: 1, page: 1}));
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getFollowing, {userId: 1, page: 1});
        testSetResponse(worker, mockUserResponse, setPageableFollowers, mockExpectedResponse(mockUserResponse), "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(usersSearchSaga, [
        {actionType: UsersSearchActionsType.FETCH_USERS, workSaga: fetchUsersSearchRequest},
        {actionType: UsersSearchActionsType.FETCH_USERS_BY_NAME, workSaga: fetchUsersSearchByUsernameRequest},
        {actionType: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME, workSaga: fetchParticipantsByUsernameRequest},
        {actionType: UsersSearchActionsType.FETCH_FOLLOWERS, workSaga: fetchFollowersRequest},
        {actionType: UsersSearchActionsType.FETCH_FOLLOWINGS, workSaga: fetchFollowingsRequest},
    ]);
});
