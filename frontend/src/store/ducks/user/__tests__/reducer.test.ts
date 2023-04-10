import { initialUserState, userReducer } from "../reducer";
import { UserActions, UserActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { AuthUserResponse } from "../../../../types/user";
import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";
import { mockUser } from "../../../../util/test-utils/mock-test-data";

describe("userReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(userReducer(undefined, {} as UserActions)).toEqual(initialUserState);
        });
    });

    describe("user handlers:", () => {
        testActionDispatch(
            UserActionsType.SET_USER_DATA,
            userReducer(initialUserState, {
                type: UserActionsType.SET_USER_DATA,
                payload: { id: 1 } as AuthUserResponse
            }),
            {
                ...initialUserState,
                data: { id: 1 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SIGN_OUT,
            userReducer(initialUserState, {
                type: UserActionsType.SIGN_OUT
            }),
            {
                ...initialUserState,
                data: undefined,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_UNREAD_MESSAGE,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, unreadMessagesCount: 0 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_UNREAD_MESSAGE,
                    payload: { id: 1 } as ChatMessageResponse
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, unreadMessagesCount: 1 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_USERNAME,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, username: "test" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_USERNAME,
                    payload: "test name"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, username: "test name" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_EMAIL,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, email: "test123@test.test" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_EMAIL,
                    payload: "test@test.test"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, email: "test@test.test" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_PHONE,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, countryCode: "US", phone: 12345 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_PHONE,
                    payload: { countryCode: "FR", phone: 54321 }
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, countryCode: "FR", phone: 54321 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_COUNTRY,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, country: "China" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_COUNTRY,
                    payload: "USA"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, country: "USA" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_GENDER,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, gender: "Male" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_GENDER,
                    payload: "test"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, gender: "test" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_LANGUAGE,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, language: "eng" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_LANGUAGE,
                    payload: "test"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, language: "test" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_DIRECT,
            userReducer(
                {
                    ...initialUserState,
                    data: { ...mockUser, isMutedDirectMessages: false }
                },
                {
                    type: UserActionsType.SET_DIRECT,
                    payload: true
                }
            ),
            {
                ...initialUserState,
                data: { ...mockUser, isMutedDirectMessages: true },
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_PRIVATE_PROFILE,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, isPrivateProfile: false } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_PRIVATE_PROFILE,
                    payload: true
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, isPrivateProfile: true } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_COLOR_SCHEME,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, colorScheme: "BLUE" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_COLOR_SCHEME,
                    payload: "GREEN"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, colorScheme: "GREEN" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_BACKGROUND_COLOR,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, backgroundColor: "DEFAULT" } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_BACKGROUND_COLOR,
                    payload: "DIM"
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, backgroundColor: "DIM" } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_NEW_NOTIFICATION,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, notificationsCount: 0 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_NEW_NOTIFICATION
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, notificationsCount: 1 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.RESET_NOTIFICATIONS,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, notificationsCount: 111 } as AuthUserResponse
                },
                {
                    type: UserActionsType.RESET_NOTIFICATIONS
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, notificationsCount: 0 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_NEW_MENTION,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, mentionsCount: 0 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_NEW_MENTION
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, mentionsCount: 1 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.RESET_MENTIONS,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, mentionsCount: 111 } as AuthUserResponse
                },
                {
                    type: UserActionsType.RESET_MENTIONS
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, mentionsCount: 0 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_FOLLOWERS_SIZE,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, followersSize: 0 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_FOLLOWERS_SIZE
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, followersSize: 1 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_PROFILE_STARTED,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, profileStarted: false } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_PROFILE_STARTED,
                    payload: true
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, profileStarted: true } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_PIN_TWEET_ID,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, pinnedTweetId: 1 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_PIN_TWEET_ID,
                    payload: 2
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, pinnedTweetId: 2 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_USER_FOLLOWING,
            userReducer(
                {
                    ...initialUserState,
                    data: { id: 1, followersSize: 1 } as AuthUserResponse
                },
                {
                    type: UserActionsType.SET_USER_FOLLOWING,
                    payload: true
                }
            ),
            {
                ...initialUserState,
                data: { id: 1, followersSize: 2 } as AuthUserResponse,
                status: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserActionsType.SET_USER_LOADING_STATE,
            userReducer(initialUserState,
                {
                    type: UserActionsType.SET_USER_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUserState,
                status: LoadingStatus.SUCCESS
            }
        );
    });
});
