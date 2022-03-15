import {testAction} from "../../../util/testHelper";
import {
    fetchRelevantUsers,
    fetchUsers,
    resetUsersState,
    setBlockedUsersState,
    setFollowRequestToUsers,
    setFollowToUsersState,
    setMutedUsersState,
    setSubscribedUsersState,
    setUsers,
    setUsersLoadingState
} from "./actionCreators";
import {UsersActionsType} from "./contracts/actionTypes";
import {UserResponse} from "../../types/user";
import {LoadingStatus} from "../../types";

describe("tags actions", () => {
    testAction(setUsers, setUsers([{id: 1}] as UserResponse[]), {
        type: UsersActionsType.SET_USERS,
        payload: [{id: 1}] as UserResponse[]
    });

    testAction(setFollowToUsersState, setFollowToUsersState({userId: 1, isFollower: true}), {
        type: UsersActionsType.SET_FOLLOW_TO_USERS_STATE,
        payload: {userId: 1, isFollower: true}
    });
    
    testAction(setFollowRequestToUsers, setFollowRequestToUsers({userId: 1, isWaitingForApprove: true}), {
        type: UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE,
        payload: {userId: 1, isWaitingForApprove: true}
    });
    
    testAction(setBlockedUsersState, setBlockedUsersState({userId: 1, isUserBlocked: true}), {
        type: UsersActionsType.SET_BLOCKED_USERS_STATE,
        payload: {userId: 1, isUserBlocked: true}
    });

    testAction(setMutedUsersState, setMutedUsersState({userId: 1, isUserMuted: true}), {
        type: UsersActionsType.SET_MUTED_USERS_STATE,
        payload: {userId: 1, isUserMuted: true}
    });

    testAction(setSubscribedUsersState, setSubscribedUsersState({userId: 1, isSubscriber: true}), {
        type: UsersActionsType.SET_SUBSCRIBED_USERS_STATE,
        payload: {userId: 1, isSubscriber: true}
    });

    testAction(fetchUsers, fetchUsers(), {
        type: UsersActionsType.FETCH_USERS,
    });

    testAction(fetchRelevantUsers, fetchRelevantUsers(), {
        type: UsersActionsType.FETCH_RELEVANT_USERS,
    });

    testAction(resetUsersState, resetUsersState(), {
        type: UsersActionsType.RESET_USERS_STATE,
    });

    testAction(setUsersLoadingState, setUsersLoadingState(LoadingStatus.LOADING), {
        type: UsersActionsType.SET_USER_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
