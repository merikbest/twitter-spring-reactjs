import { initialTweetsState, tweetsReducer } from "../reducer";
import { TweetsActions, TweetsActionType } from "../contracts/actionTypes";
import { TweetResponse } from "../../../../types/tweet";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { LoadingStatus, NotificationType } from "../../../../types/common";
import { NotificationReplyResponse, NotificationResponse } from "../../../../types/notification";
import { initialUserTweetsState } from "../../userTweets/reducer";

describe("tweetsReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(tweetsReducer(undefined, {} as TweetsActions)).toEqual(initialTweetsState);
        });
    });

    describe("tweets handlers:", () => {
        testActionDispatch(
            TweetsActionType.SET_TWEETS,
            tweetsReducer(initialTweetsState, {
                type: TweetsActionType.SET_TWEETS,
                payload: [{ id: 1 }] as TweetResponse[]
            }),
            {
                ...initialTweetsState,
                items: [{ id: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TweetsActionType.SET_SCHEDULED_TWEETS,
            tweetsReducer(initialTweetsState, {
                type: TweetsActionType.SET_SCHEDULED_TWEETS,
                payload: [{ id: 1 }] as TweetResponse[]
            }),
            {
                ...initialTweetsState,
                items: [{ id: 1 }] as TweetResponse[]
            }
        );

        testActionDispatch(
            TweetsActionType.SET_PAGEABLE_TWEETS,
            tweetsReducer(initialTweetsState, {
                type: TweetsActionType.SET_PAGEABLE_TWEETS,
                payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 2 }
            }),
            {
                ...initialTweetsState,
                items: [{ id: 1 }] as TweetResponse[],
                pagesCount: 2,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TweetsActionType.SET_TWEET,
            tweetsReducer(initialTweetsState, {
                type: TweetsActionType.SET_TWEET,
                payload: { id: 1 } as TweetResponse
            }),
            {
                ...initialTweetsState,
                items: [{ id: 1 }] as TweetResponse[]
            }
        );

        testActionDispatch(
            TweetsActionType.RESET_TWEETS,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1 }] as TweetResponse[],
                    pagesCount: 2
                },
                {
                    type: TweetsActionType.RESET_TWEETS
                }
            ),
            {
                ...initialTweetsState,
                items: [],
                pagesCount: 1
            }
        );

        testActionDispatch(
            TweetsActionType.SET_UPDATED_TWEET + "(NotificationType.LIKE)",
            tweetsReducer({
                    ...initialTweetsState,
                    items: [{ id: 1, isTweetLiked: false, likedTweetsCount: 0 }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_UPDATED_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.LIKE
                    } as NotificationResponse
                }),
            {
                ...initialTweetsState,
                items: [{ id: 1, isTweetLiked: true, likedTweetsCount: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetsActionType.SET_UPDATED_TWEET + "(NotificationType.RETWEET)",
            tweetsReducer({
                    ...initialTweetsState,
                    items: [{ id: 1, isTweetRetweeted: false, retweetsCount: 0 }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_UPDATED_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.RETWEET
                    } as NotificationResponse
                }),
            {
                ...initialTweetsState,
                items: [{ id: 1, isTweetRetweeted: true, retweetsCount: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetsActionType.SET_UPDATED_TWEET + "(NotificationType.REPLY)",
            tweetsReducer({
                    ...initialTweetsState,
                    items: [{ id: 1, repliesCount: 0 }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_UPDATED_TWEET,
                    payload: {
                        tweetId: 1,
                        tweet: { id: 1 },
                        notificationType: NotificationType.REPLY
                    } as NotificationReplyResponse
                }),
            {
                ...initialTweetsState,
                items: [{ id: 1, repliesCount: 1 }] as TweetResponse[]
            }
        );

        testActionDispatch(
            TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1, isTweetBookmarked: false }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
                    payload: { tweetId: 1, isTweetBookmarked: true }
                }
            ),
            {
                ...initialTweetsState,
                items: [{ id: 1, isTweetBookmarked: true }] as TweetResponse[]
            }
        );

        testActionDispatch(
            TweetsActionType.SET_LOADING_STATE,
            tweetsReducer(initialTweetsState, {
                type: TweetsActionType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialTweetsState,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1 }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS,
                    payload: 1
                }
            ),
            {
                ...initialTweetsState,
                items: [],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TweetsActionType.DELETE_TWEET,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1 }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.DELETE_TWEET,
                    payload: 1
                }
            ),
            {
                ...initialTweetsState,
                items: []
            }
        );

        testActionDispatch(
            TweetsActionType.SET_VOTE,
            tweetsReducer(
                {
                    ...initialUserTweetsState,
                    items: [
                        { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } },
                        { id: 2, poll: null }
                    ] as unknown as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_VOTE,
                    payload: { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } } as TweetResponse
                }
            ),
            {
                ...initialTweetsState,
                items: [
                    { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } },
                    { id: 2, poll: null }
                ] as unknown as TweetResponse[]
            }
        );

        testActionDispatch(
            TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1, user: { id: 1, isFollower: false } }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isFollower: true }
                }
            ),
            {
                ...initialTweetsState,
                items: [{ id: 1, user: { id: 1, isFollower: true } }] as TweetResponse[]
            }
        );

        testActionDispatch(
            TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1, user: { id: 1, isUserBlocked: false } }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isUserBlocked: true }
                }
            ),
            {
                ...initialTweetsState,
                items: [{ id: 1, user: { id: 1, isUserBlocked: true } }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            TweetsActionType.SET_MUTED_TO_TWEETS_STATE,
            tweetsReducer(
                {
                    ...initialTweetsState,
                    items: [{ id: 1, user: { id: 1, isUserMuted: false } }] as TweetResponse[]
                },
                {
                    type: TweetsActionType.SET_MUTED_TO_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isUserMuted: true }
                }
            ),
            {
                ...initialTweetsState,
                items: [{ id: 1, user: { id: 1, isUserMuted: true } }] as TweetResponse[],
                loadingState: LoadingStatus.LOADED
            }
        );
    });
});
