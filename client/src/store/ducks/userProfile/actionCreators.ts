import {User} from "../user/contracts/state";
import {
    AddUserToBlocklistActionInterface,
    AddUserToMuteListActionInterface,
    FetchChatParticipantActionInterface,
    FetchUserProfileActionInterface,
    // FollowProfileActionInterface,
    // FollowUserProfileActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessSubscribeActionInterface,
    ResetUserProfileStateActionInterface, SeFollowToUserProfileActionInterface,
    SetBlockedActionInterface,
    SetMutedActionInterface,
    SetUserProfileActionInterface,
    SetUserProfileLoadingStatusActionInterface,
    // UnfollowProfileActionInterface,
    // UnfollowUserProfileActionInterface,
    UserProfileActionsType,
} from './contracts/actionTypes';
import {UserProfileState} from "./contracts/state";
import {AuthUserResponse, UserProfileResponse} from "../../types/user";

export const addUserToBlocklist = (payload: number): AddUserToBlocklistActionInterface => ({ // +
    type: UserProfileActionsType.ADD_USER_TO_BLOCKLIST,
    payload,
});

export const addUserToMuteList = (payload: number): AddUserToMuteListActionInterface => ({ // +
    type: UserProfileActionsType.ADD_USER_TO_MUTELIST,
    payload,
});

export const setBlocked = (payload: boolean): SetBlockedActionInterface => ({ // +
    type: UserProfileActionsType.SET_BLOCKED,
    payload,
});

export const setMuted = (payload: boolean): SetMutedActionInterface => ({ // +
    type: UserProfileActionsType.SET_MUTED,
    payload,
});

export const seFollowToUserProfile = (payload: boolean): SeFollowToUserProfileActionInterface => ({ // +
    type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE,
    payload,
});


export const setUserProfile = (payload: UserProfileResponse): SetUserProfileActionInterface => ({ // +
    type: UserProfileActionsType.SET_USER,
    payload
});

export const fetchUserProfile = (payload: number): FetchUserProfileActionInterface => ({ // +
    type: UserProfileActionsType.FETCH_USER,
    payload
});

export const fetchChatParticipant = (payload: { participantId: number, chatId: number }): FetchChatParticipantActionInterface => ({
    type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT,
    payload
});

// export const followProfile = (payload: User): FollowProfileActionInterface => ({
//     type: UserProfileActionsType.FOLLOW,
//     payload
// });

// export const unfollowProfile = (payload: User): UnfollowProfileActionInterface => ({
//     type: UserProfileActionsType.UNFOLLOW,
//     payload
// });

// export const followUserProfile = (payload: User): FollowUserProfileActionInterface => ({
//     type: UserProfileActionsType.FOLLOW_USER,
//     payload
// });

// export const unfollowUserProfile = (payload: User): UnfollowUserProfileActionInterface => ({
//     type: UserProfileActionsType.UNFOLLOW_USER,
//     payload
// });

export const processSubscribe = (payload: number): ProcessSubscribeActionInterface => ({
    type: UserProfileActionsType.PROCESS_SUBSCRIBE,
    payload
});

export const processFollowRequest = (payload: number): ProcessFollowRequestActionInterface => ({
    type: UserProfileActionsType.PROCESS_FOLLOW_REQUEST,
    payload,
});

export const resetUserProfileStateAction = (): ResetUserProfileStateActionInterface => ({ // +
    type: UserProfileActionsType.RESET_USER_PROFILE_STATE
});

export const setUserProfileLoadingState = (payload: UserProfileState["loadingState"]): SetUserProfileLoadingStatusActionInterface => ({ // +
    type: UserProfileActionsType.SET_USER_LOADING_STATE,
    payload
});
