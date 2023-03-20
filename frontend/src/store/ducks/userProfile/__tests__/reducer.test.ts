import { initialUserProfileState, userProfileReducer } from "../reducer";
import { UserProfileActions, UserProfileActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { UserProfileResponse } from "../../../../types/user";
import { TweetImageResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

describe("userProfileReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(userProfileReducer(undefined, {} as UserProfileActions)).toEqual(initialUserProfileState);
        });
    });

    describe("userProfile handlers:", () => {
        testActionDispatch(
            UserProfileActionsType.SET_USER,
            userProfileReducer(initialUserProfileState, {
                type: UserProfileActionsType.SET_USER,
                payload: { id: 1 } as UserProfileResponse
            }),
            {
                ...initialUserProfileState,
                user: { id: 1 } as UserProfileResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_IMAGES,
            userProfileReducer(initialUserProfileState, {
                type: UserProfileActionsType.SET_IMAGES,
                payload: [{ tweetId: 1, imageId: 1, src: "test" }] as TweetImageResponse[]
            }),
            {
                ...initialUserProfileState,
                images: [{ tweetId: 1, imageId: 1, src: "test" }] as TweetImageResponse[],
                imagesLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    user: { id: 1, isFollower: false, followingSize: 0 } as UserProfileResponse
                },
                {
                    type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE,
                    payload: { userId: 1, isFollower: true }
                }
            ),
            {
                ...initialUserProfileState,
                user: { id: 1, isFollower: true, followingSize: 1 } as UserProfileResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    user: { id: 1, isSubscriber: false } as UserProfileResponse
                },
                {
                    type: UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE,
                    payload: true
                }
            ),
            {
                ...initialUserProfileState,
                user: { id: 1, isSubscriber: true } as UserProfileResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    user: { id: 1, isWaitingForApprove: false } as UserProfileResponse
                },
                {
                    type: UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE,
                    payload: true
                }
            ),
            {
                ...initialUserProfileState,
                user: { id: 1, isWaitingForApprove: true } as UserProfileResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_BLOCKED,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    user: { id: 1, isUserBlocked: false } as UserProfileResponse
                },
                {
                    type: UserProfileActionsType.SET_BLOCKED,
                    payload: true
                }
            ),
            {
                ...initialUserProfileState,
                user: { id: 1, isUserBlocked: true } as UserProfileResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_MUTED,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    user: { id: 1, isUserMuted: false } as UserProfileResponse
                },
                {
                    type: UserProfileActionsType.SET_MUTED,
                    payload: true
                }
            ),
            {
                ...initialUserProfileState,
                user: { id: 1, isUserMuted: true } as UserProfileResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.RESET_USER_PROFILE_STATE,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    user: { id: 1 } as UserProfileResponse
                },
                {
                    type: UserProfileActionsType.RESET_USER_PROFILE_STATE
                }
            ),
            {
                ...initialUserProfileState,
                user: undefined,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_USER_LOADING_STATE,
            userProfileReducer(initialUserProfileState,
                {
                    type: UserProfileActionsType.SET_USER_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUserProfileState,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            UserProfileActionsType.RESET_IMAGES_STATE,
            userProfileReducer(
                {
                    ...initialUserProfileState,
                    images: [{ tweetId: 1, imageId: 1, src: "test" }] as TweetImageResponse[]
                },
                {
                    type: UserProfileActionsType.RESET_IMAGES_STATE
                }
            ),
            {
                ...initialUserProfileState,
                images: [],
                imagesLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserProfileActionsType.SET_IMAGES_LOADING_STATE,
            userProfileReducer(initialUserProfileState,
                {
                    type: UserProfileActionsType.SET_IMAGES_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUserProfileState,
                imagesLoadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
