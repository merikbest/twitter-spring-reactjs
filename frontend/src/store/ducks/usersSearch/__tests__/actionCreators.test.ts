import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchFollowers,
    fetchFollowings,
    fetchParticipantsByUsername,
    fetchUsersSearch,
    fetchUsersSearchByUsername,
    resetUsersState,
    setBlockUsersSearchState,
    setFollowRequestToUsersSearchState,
    setFollowToUsersSearchState,
    setPageableFollowers,
    setPageableUsersSearch,
    setUsersSearch,
    setUsersSearchLoadingState
} from "../actionCreators";
import { UsersSearchActionsType } from "../contracts/actionTypes";
import { UserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("usersSearch actions", () => {
    testAction(setUsersSearch, setUsersSearch([{ id: 1 }] as UserResponse[]), {
        type: UsersSearchActionsType.SET_USERS,
        payload: [{ id: 1 }] as UserResponse[]
    });

    testAction(setPageableUsersSearch, setPageableUsersSearch({
        items: [{ id: 1 }] as UserResponse[],
        pagesCount: 1
    }), {
        type: UsersSearchActionsType.SET_PAGEABLE_USERS,
        payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 1 }
    });

    testAction(setPageableFollowers, setPageableFollowers({ items: [{ id: 1 }] as UserResponse[], pagesCount: 1 }), {
        type: UsersSearchActionsType.SET_PAGEABLE_FOLLOWERS,
        payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 1 }
    });

    testAction(setFollowToUsersSearchState, setFollowToUsersSearchState({ userId: 1, isFollower: true }), {
        type: UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE,
        payload: { userId: 1, isFollower: true }
    });

    testAction(setFollowRequestToUsersSearchState, setFollowRequestToUsersSearchState({
        userId: 1,
        isWaitingForApprove: true
    }), {
        type: UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE,
        payload: { userId: 1, isWaitingForApprove: true }
    });

    testAction(setBlockUsersSearchState, setBlockUsersSearchState({ userId: 1, isUserBlocked: true }), {
        type: UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE,
        payload: { userId: 1, isUserBlocked: true }
    });

    testAction(fetchUsersSearch, fetchUsersSearch(0), {
        type: UsersSearchActionsType.FETCH_USERS,
        payload: 0
    });

    testAction(fetchFollowers, fetchFollowers({ userId: 1, page: 1 }), {
        type: UsersSearchActionsType.FETCH_FOLLOWERS,
        payload: { userId: 1, page: 1 }
    });

    testAction(fetchFollowings, fetchFollowings({ userId: 1, page: 1 }), {
        type: UsersSearchActionsType.FETCH_FOLLOWINGS,
        payload: { userId: 1, page: 1 }
    });

    testAction(fetchUsersSearchByUsername, fetchUsersSearchByUsername({ username: "test", pageNumber: 1 }), {
        type: UsersSearchActionsType.FETCH_USERS_BY_NAME,
        payload: { username: "test", pageNumber: 1 }
    });

    testAction(fetchParticipantsByUsername, fetchParticipantsByUsername({ username: "test", pageNumber: 1 }), {
        type: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME,
        payload: { username: "test", pageNumber: 1 }
    });

    testAction(resetUsersState, resetUsersState(), {
        type: UsersSearchActionsType.RESET_USERS_STATE
    });

    testAction(setUsersSearchLoadingState, setUsersSearchLoadingState(LoadingStatus.LOADING), {
        type: UsersSearchActionsType.SET_USERS_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
