import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { initialNotificationsState, notificationsReducer } from "../reducer";
import { NotificationsActions, NotificationsActionsType } from "../contracts/actionTypes";
import {
    NotificationInfoResponse,
    NotificationReplyResponse,
    NotificationResponse,
    NotificationUserResponse
} from "../../../../types/notification";
import { LoadingStatus, NotificationType } from "../../../../types/common";

describe("notificationsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(notificationsReducer(undefined, {} as NotificationsActions)).toEqual(initialNotificationsState);
        });
    });

    describe("notifications handlers:", () => {
        testActionDispatch(
            NotificationsActionsType.SET_NOTIFICATIONS,
            notificationsReducer(initialNotificationsState, {
                type: NotificationsActionsType.SET_NOTIFICATIONS,
                payload: { items: [{ id: 1 }] as NotificationResponse[], pagesCount: 2 }
            }),
            {
                ...initialNotificationsState,
                notificationsList: [{ id: 1 }],
                pagesCount: 2,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_TWEET_AUTHORS_NOTIFICATIONS,
            notificationsReducer(initialNotificationsState, {
                type: NotificationsActionsType.SET_TWEET_AUTHORS_NOTIFICATIONS,
                payload: [{ id: 1 }] as NotificationUserResponse[]
            }),
            {
                ...initialNotificationsState,
                tweetAuthors: [{ id: 1 }] as NotificationUserResponse[],
                loadingTweetAuthorsState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_NOTIFICATION,
            notificationsReducer(initialNotificationsState, {
                type: NotificationsActionsType.SET_NOTIFICATION,
                payload: { id: 1 } as NotificationResponse
            }),
            {
                ...initialNotificationsState,
                notificationsList: [{ id: 1 }],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_NOTIFICATION_INFO,
            notificationsReducer(initialNotificationsState, {
                type: NotificationsActionsType.SET_NOTIFICATION_INFO,
                payload: { id: 1 } as NotificationInfoResponse
            }),
            {
                ...initialNotificationsState,
                notificationInfo: { id: 1 },
                notificationInfoLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_FOLLOW_TO_NOTIFICATION_INFO,
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    notificationInfo: { id: 1, user: { id: 1, isFollower: false } } as NotificationInfoResponse
                },
                {
                    type: NotificationsActionsType.SET_FOLLOW_TO_NOTIFICATION_INFO,
                    payload: true
                }
            ),
            {
                ...initialNotificationsState,
                notificationInfo: { id: 1, user: { id: 1, isFollower: true } } as NotificationInfoResponse,
                notificationInfoLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_BLOCKED_NOTIFICATION_INFO,
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    notificationInfo: { id: 1, user: { id: 1, isUserBlocked: false } } as NotificationInfoResponse
                },
                {
                    type: NotificationsActionsType.SET_BLOCKED_NOTIFICATION_INFO,
                    payload: true
                }
            ),
            {
                ...initialNotificationsState,
                notificationInfo: { id: 1, user: { id: 1, isUserBlocked: true } } as NotificationInfoResponse,
                notificationInfoLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO,
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    notificationInfo: { id: 1, user: { id: 1, isWaitingForApprove: false } } as NotificationInfoResponse
                },
                {
                    type: NotificationsActionsType.SET_FOLLOW_REQUEST_TO_NOTIFICATION_INFO,
                    payload: true
                }
            ),
            {
                ...initialNotificationsState,
                notificationInfo: { id: 1, user: { id: 1, isWaitingForApprove: true } } as NotificationInfoResponse,
                notificationInfoLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET + "(NotificationType.LIKE)",
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    notificationInfo: {
                        id: 1,
                        tweet: { id: 1, isTweetLiked: false, likedTweetsCount: 0 }
                    } as NotificationInfoResponse
                },
                {
                    type: NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.LIKE
                    } as NotificationResponse
                }
            ),
            {
                ...initialNotificationsState,
                notificationInfo: {
                    id: 1,
                    tweet: { id: 1, isTweetLiked: true, likedTweetsCount: 1 }
                } as NotificationInfoResponse,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET + "(NotificationType.REPLY)",
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    notificationInfo: { id: 1, tweet: { id: 1, retweetsCount: 0 } } as NotificationInfoResponse
                },
                {
                    type: NotificationsActionsType.UPDATE_NOTIFICATION_INFO_TWEET,
                    payload: {
                        tweetId: 1,
                        tweet: { id: 1 },
                        notificationType: NotificationType.REPLY
                    } as NotificationReplyResponse
                }
            ),
            {
                ...initialNotificationsState,
                notificationInfo: { id: 1, tweet: { id: 1, retweetsCount: 1 } } as NotificationInfoResponse,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            NotificationsActionsType.RESET_NOTIFICATION_STATE,
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    notificationsList: [{ id: 1 }] as NotificationResponse[],
                    tweetAuthors: [{ id: 1 }] as NotificationUserResponse[]
                },
                {
                    type: NotificationsActionsType.RESET_NOTIFICATION_STATE
                }
            ),
            {
                ...initialNotificationsState,
                notificationsList: [],
                tweetAuthors: [],
                notificationInfoLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_LOADING_STATE,
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    loadingState: LoadingStatus.LOADING
                },
                {
                    type: NotificationsActionsType.SET_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }
            ),
            {
                ...initialNotificationsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            NotificationsActionsType.SET_TWEET_AUTHORS_LOADING_STATE,
            notificationsReducer(
                {
                    ...initialNotificationsState,
                    loadingTweetAuthorsState: LoadingStatus.LOADING
                },
                {
                    type: NotificationsActionsType.SET_TWEET_AUTHORS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }
            ),
            {
                ...initialNotificationsState,
                loadingTweetAuthorsState: LoadingStatus.SUCCESS
            }
        );
    });
});