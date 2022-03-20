import {
    fetchFollowersRequest,
    fetchFollowingsRequest,
    fetchUsersSearchByUsernameRequest,
    fetchUsersSearchRequest,
    usersSearchSaga
} from "./sagas";
import {
    fetchFollowers,
    fetchFollowings,
    fetchUsersSearchByUsername,
    setFollowers,
    setUsersSearch,
    setUsersSearchLoadingState
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {UserResponse} from "../../types/user";
import {UserApi} from "../../../services/api/userApi";
import {UsersSearchActionsType} from "./contracts/actionTypes";

describe("usersSearchSaga:", () => {
    const mockUserResponse = [{id: 1}, {id: 1}] as UserResponse[];

    describe("fetchUsersSearchRequest:", () => {
        const worker = fetchUsersSearchRequest();

        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUsers);
        testSetResponse(worker, mockUserResponse, setUsersSearch, mockUserResponse, "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchUsersSearchByUsernameRequest:", () => {
        const worker = fetchUsersSearchByUsernameRequest(fetchUsersSearchByUsername("test"));

        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.searchUsersByUsername, "test");
        testSetResponse(worker, mockUserResponse, setUsersSearch, mockUserResponse, "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchFollowersRequest:", () => {
        const worker = fetchFollowersRequest(fetchFollowers("1"));

        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getFollowers, "1");
        testSetResponse(worker, mockUserResponse, setFollowers, mockUserResponse, "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchFollowingsRequest:", () => {
        const worker = fetchFollowingsRequest(fetchFollowings("1"));

        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getFollowing, "1");
        testSetResponse(worker, mockUserResponse, setFollowers, mockUserResponse, "UserResponse");
        testLoadingStatus(worker, setUsersSearchLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(usersSearchSaga, [
        {actionType: UsersSearchActionsType.FETCH_USERS, workSaga: fetchUsersSearchRequest},
        {actionType: UsersSearchActionsType.FETCH_USERS_BY_NAME, workSaga: fetchUsersSearchByUsernameRequest},
        {actionType: UsersSearchActionsType.FETCH_FOLLOWERS, workSaga: fetchFollowersRequest},
        {actionType: UsersSearchActionsType.FETCH_FOLLOWINGS, workSaga: fetchFollowingsRequest},
    ]);
});
