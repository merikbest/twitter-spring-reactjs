import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { UserTweetsActions, UserTweetsActionType } from "../contracts/actionTypes";
import { initialUserTweetsState, userTweetsReducer } from "../reducer";
import { TweetResponse } from "../../../../types/tweet";
import { LoadingStatus, NotificationType } from "../../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../../types/notification";

describe("userTweetsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(userTweetsReducer(undefined, {} as UserTweetsActions)).toEqual(initialUserTweetsState);
        });
    });

    describe("userTweets handlers:", () => {
        testActionDispatch(
            UserTweetsActionType.SET_TWEETS,
            userTweetsReducer(initialUserTweetsState, {
                type: UserTweetsActionType.SET_TWEETS,
                payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }
            }),
            {
                ...initialUserTweetsState,
                items: [{ id: 1 }] as TweetResponse[],
                pagesCount: 1,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [{ id: 1, user: { id: 1, isFollower: false } }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isFollower: true }
                }
            ),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, user: { id: 1, isFollower: true } }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_BLOCKED_USERS_TWEETS_STATE,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [{ id: 1, user: { id: 1, isUserBlocked: false } }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_BLOCKED_USERS_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isUserBlocked: true }
                }
            ),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, user: { id: 1, isUserBlocked: true } }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_MUTED_USERS_TWEETS_STATE,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [{ id: 1, user: { id: 1, isUserMuted: false } }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_MUTED_USERS_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isUserMuted: true }
                }
            ),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, user: { id: 1, isUserMuted: true } }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [{ id: 1, isTweetBookmarked: false }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
                    payload: { tweetId: 1, isTweetBookmarked: true }
                }
            ),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, isTweetBookmarked: true }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_ADDED_TWEET,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [{ id: 1 }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_ADDED_TWEET,
                    payload: { id: 2 } as TweetResponse
                }
            ),
            {
                ...initialUserTweetsState,
                items: [{ id: 2 }, { id: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_UPDATED_TWEET + "(NotificationType.LIKE)",
            userTweetsReducer({
                    ...initialUserTweetsState,
                    items: [{ id: 1, isTweetLiked: false, likedTweetsCount: 0 }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_UPDATED_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.LIKE
                    } as NotificationResponse
                }),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, isTweetLiked: true, likedTweetsCount: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_UPDATED_TWEET + "(NotificationType.RETWEET)",
            userTweetsReducer({
                    ...initialUserTweetsState,
                    items: [{ id: 1, isTweetRetweeted: false, retweetsCount: 0 }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_UPDATED_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.RETWEET
                    } as NotificationResponse
                }),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, isTweetRetweeted: true, retweetsCount: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_UPDATED_TWEET + "(NotificationType.REPLY)",
            userTweetsReducer({
                    ...initialUserTweetsState,
                    items: [{ id: 1, repliesCount: 0 }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_UPDATED_TWEET,
                    payload: {
                        tweetId: 1,
                        tweet: { id: 1 },
                        notificationType: NotificationType.REPLY
                    } as NotificationReplyResponse
                }),
            {
                ...initialUserTweetsState,
                items: [{ id: 1, repliesCount: 1 }] as TweetResponse[]
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_USER_VOTE,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [
                        { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } },
                        { id: 2, poll: null }
                    ] as unknown as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.SET_USER_VOTE,
                    payload: { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } } as TweetResponse
                }
            ),
            {
                ...initialUserTweetsState,
                items: [
                    { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } },
                    { id: 2, poll: null }
                ] as unknown as TweetResponse[]
            }
        );

        testActionDispatch(
            UserTweetsActionType.DELETE_TWEET,
            userTweetsReducer({
                    ...initialUserTweetsState,
                    items: [{ id: 1 }, { id: 2 }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.DELETE_TWEET,
                    payload: 1
                }),
            {
                ...initialUserTweetsState,
                items: [{ id: 2 }] as TweetResponse[]
            }
        );

        testActionDispatch(
            UserTweetsActionType.RESET_TWEETS,
            userTweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [{ id: 1 }] as TweetResponse[]
                },
                {
                    type: UserTweetsActionType.RESET_TWEETS
                }),
            {
                ...initialUserTweetsState,
                items: [],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            UserTweetsActionType.SET_LOADING_STATUS,
            userTweetsReducer(initialUserTweetsState,
                {
                    type: UserTweetsActionType.SET_LOADING_STATUS,
                    payload: LoadingStatus.SUCCESS
                }),
            {
                ...initialUserTweetsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
