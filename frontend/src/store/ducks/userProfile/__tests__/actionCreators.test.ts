import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchChatParticipant,
    fetchImages,
    fetchUserProfile,
    processSubscribe,
    resetImagesState,
    resetUserProfileState,
    setBlocked,
    setFollowRequestToUserProfile,
    setFollowToUserProfile,
    setImages,
    setImagesLoadingStatus,
    setMuted,
    setSubscribeToUserProfile,
    setUserProfile,
    setUserProfileLoadingState
} from "../actionCreators";
import { UserProfileActionsType } from "../contracts/actionTypes";
import { UserProfileResponse } from "../../../../types/user";
import { TweetImageResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

describe("userProfile actions", () => {
    testAction(setBlocked, setBlocked(true), {
        type: UserProfileActionsType.SET_BLOCKED,
        payload: true
    });

    testAction(setMuted, setMuted(true), {
        type: UserProfileActionsType.SET_MUTED,
        payload: true
    });

    testAction(setFollowToUserProfile, setFollowToUserProfile({ userId: 1, isFollower: true }), {
        type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE,
        payload: { userId: 1, isFollower: true }
    });

    testAction(setSubscribeToUserProfile, setSubscribeToUserProfile(true), {
        type: UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE,
        payload: true
    });

    testAction(setUserProfile, setUserProfile({ id: 1 } as UserProfileResponse), {
        type: UserProfileActionsType.SET_USER,
        payload: { id: 1 } as UserProfileResponse
    });

    testAction(fetchUserProfile, fetchUserProfile(1), {
        type: UserProfileActionsType.FETCH_USER,
        payload: 1
    });

    testAction(fetchImages, fetchImages(1), {
        type: UserProfileActionsType.FETCH_IMAGES,
        payload: 1
    });

    testAction(setImages, setImages([{ tweetId: 1, imageId: 1, src: "test" }] as TweetImageResponse[]), {
        type: UserProfileActionsType.SET_IMAGES,
        payload: [{ tweetId: 1, imageId: 1, src: "test" }] as TweetImageResponse[]
    });

    testAction(resetImagesState, resetImagesState(), {
        type: UserProfileActionsType.RESET_IMAGES_STATE
    });

    testAction(setImagesLoadingStatus, setImagesLoadingStatus(LoadingStatus.LOADING), {
        type: UserProfileActionsType.SET_IMAGES_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(fetchChatParticipant, fetchChatParticipant({ participantId: 1, chatId: 1 }), {
        type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT,
        payload: { participantId: 1, chatId: 1 }
    });

    testAction(processSubscribe, processSubscribe(1), {
        type: UserProfileActionsType.PROCESS_SUBSCRIBE,
        payload: 1
    });

    testAction(setFollowRequestToUserProfile, setFollowRequestToUserProfile(true), {
        type: UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE,
        payload: true
    });

    testAction(resetUserProfileState, resetUserProfileState(), {
        type: UserProfileActionsType.RESET_USER_PROFILE_STATE
    });

    testAction(setUserProfileLoadingState, setUserProfileLoadingState(LoadingStatus.LOADING), {
        type: UserProfileActionsType.SET_USER_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
