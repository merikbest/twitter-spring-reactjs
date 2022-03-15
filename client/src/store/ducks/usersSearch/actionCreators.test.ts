import {testAction} from "../../../util/testHelper";
import {
    fetchFollowers,
    fetchFollowings,
    fetchUsersSearch,
    fetchUsersSearchByUsername,
    resetUsersState,
    setBlockUsersSearchState,
    setFollowers,
    setFollowRequestToUsersSearchState,
    setFollowToUsersSearchState,
    setUsersSearch,
    setUsersSearchLoadingState
} from "./actionCreators";
import {UsersSearchActionsType} from "./contracts/actionTypes";
import {UserResponse} from "../../types/user";
import {LoadingStatus} from "../../types";

describe("usersSearch actions", () => {
    testAction(setUsersSearch, setUsersSearch([{id: 1}] as UserResponse[]), {
        type: UsersSearchActionsType.SET_USERS,
        payload: [{id: 1}] as UserResponse[]
    });

    testAction(setFollowers, setFollowers([{id: 1}] as UserResponse[]), {
        type: UsersSearchActionsType.SET_FOLLOWERS,
        payload: [{id: 1}] as UserResponse[]
    });

    testAction(setFollowToUsersSearchState, setFollowToUsersSearchState({userId: 1, isFollower: true}), {
        type: UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE,
        payload: {userId: 1, isFollower: true}
    });

    testAction(setFollowRequestToUsersSearchState, setFollowRequestToUsersSearchState({userId: 1, isWaitingForApprove: true}), {
        type: UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE,
        payload: {userId: 1, isWaitingForApprove: true}
    });

    testAction(setBlockUsersSearchState, setBlockUsersSearchState({userId: 1, isUserBlocked: true}), {
        type: UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE,
        payload: {userId: 1, isUserBlocked: true}
    });

    testAction(fetchUsersSearch, fetchUsersSearch(), {
        type: UsersSearchActionsType.FETCH_USERS,
    });

    testAction(fetchFollowers, fetchFollowers("test"), {
        type: UsersSearchActionsType.FETCH_FOLLOWERS,
        payload: "test"
    });

    testAction(fetchFollowings, fetchFollowings("test"), {
        type: UsersSearchActionsType.FETCH_FOLLOWINGS,
        payload: "test"
    });

    testAction(fetchUsersSearchByUsername, fetchUsersSearchByUsername("test"), {
        type: UsersSearchActionsType.FETCH_USERS_BY_NAME,
        payload: "test"
    });

    testAction(resetUsersState, resetUsersState(), {
        type: UsersSearchActionsType.RESET_USERS_STATE,
    });

    testAction(setUsersSearchLoadingState, setUsersSearchLoadingState(LoadingStatus.LOADING), {
        type: UsersSearchActionsType.SET_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
