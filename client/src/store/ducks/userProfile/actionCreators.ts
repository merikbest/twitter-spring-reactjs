import {
    FetchChatParticipantActionInterface,
    FetchUserProfileActionInterface,
    ProcessSubscribeActionInterface,
    ResetUserProfileStateActionInterface,
    SetBlockedActionInterface,
    SetFollowRequestToUserProfileActionInterface,
    SetFollowToUserProfileActionInterface,
    SetMutedActionInterface,
    SetSubscribeToUserProfileActionInterface,
    SetUserProfileActionInterface,
    SetUserProfileLoadingStatusActionInterface,
    UserProfileActionsType,
} from './contracts/actionTypes';
import {UserProfileState} from "./contracts/state";
import {UserProfileResponse} from "../../types/user";

export const setBlocked = (payload: boolean): SetBlockedActionInterface => ({ // +
    type: UserProfileActionsType.SET_BLOCKED,
    payload,
});

export const setMuted = (payload: boolean): SetMutedActionInterface => ({ // +
    type: UserProfileActionsType.SET_MUTED,
    payload,
});

export const setFollowToUserProfile = (payload: boolean): SetFollowToUserProfileActionInterface => ({ // +
    type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE,
    payload,
});

export const setSubscribeToUserProfile = (payload: boolean): SetSubscribeToUserProfileActionInterface => ({ // +
    type: UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE,
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

export const fetchChatParticipant = (payload: { participantId: number, chatId: number }): FetchChatParticipantActionInterface => ({ // +
    type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT,
    payload
});

export const processSubscribe = (payload: number): ProcessSubscribeActionInterface => ({ // +
    type: UserProfileActionsType.PROCESS_SUBSCRIBE,
    payload
});

export const setFollowRequestToUserProfile = (payload: boolean): SetFollowRequestToUserProfileActionInterface => ({ // +
    type: UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE,
    payload,
});

export const resetUserProfileState = (): ResetUserProfileStateActionInterface => ({ // +
    type: UserProfileActionsType.RESET_USER_PROFILE_STATE
});

export const setUserProfileLoadingState = (payload: UserProfileState["loadingState"]): SetUserProfileLoadingStatusActionInterface => ({ // +
    type: UserProfileActionsType.SET_USER_LOADING_STATE,
    payload
});
