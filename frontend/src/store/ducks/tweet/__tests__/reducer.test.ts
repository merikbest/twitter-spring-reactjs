import { initialTweetState, tweetReducer } from "../reducer";
import { TweetActions, TweetActionType } from "../contracts/actionTypes";
import { TweetResponse } from "../../../../types/tweet";
import { NotificationReplyResponse, NotificationResponse } from "../../../../types/notification";
import { LoadingStatus, NotificationType } from "../../../../types/common";
import { UserResponse } from "../../../../types/user";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";

describe("tweetReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(tweetReducer(undefined, {} as TweetActions)).toEqual(initialTweetState);
        });
    });

    describe("tweet handlers:", () => {
        testActionDispatch(
            TweetActionType.SET_TWEET_DATA,
            tweetReducer(initialTweetState, {
                type: TweetActionType.SET_TWEET_DATA,
                payload: { id: 1 } as TweetResponse
            }),
            {
                ...initialTweetState,
                tweet: { id: 1 } as TweetResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_VOTE_DATA,
            tweetReducer({
                ...initialTweetState,
                tweet: { id: 1, poll: { id: 1, pollChoices: [{ id: 1, choice: "test" }] } } as TweetResponse
            }, {
                type: TweetActionType.SET_VOTE_DATA,
                payload: { id: 1, poll: { id: 1, pollChoices: [{ id: 1, choice: "test" }] } } as TweetResponse
            }),
            {
                ...initialTweetState,
                tweet: { id: 1, poll: { id: 1, pollChoices: [{ id: 1, choice: "test" }] } } as TweetResponse
            }
        );

        testActionDispatch(
            TweetActionType.UPDATE_TWEET_DATA + "(NotificationType.LIKE)",
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1, isTweetLiked: false, likedTweetsCount: 0 } as TweetResponse,
                    loadingState: LoadingStatus.LOADING
                },
                {
                    type: TweetActionType.UPDATE_TWEET_DATA,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.LIKE
                    } as NotificationResponse
                }),
            {
                ...initialTweetState,
                tweet: { id: 1, isTweetLiked: true, likedTweetsCount: 1 } as TweetResponse,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetActionType.UPDATE_TWEET_DATA + "(NotificationType.RETWEET)",
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1, isTweetRetweeted: false, retweetsCount: 0 } as TweetResponse,
                    loadingState: LoadingStatus.LOADING
                },
                {
                    type: TweetActionType.UPDATE_TWEET_DATA,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.RETWEET
                    } as NotificationResponse
                }),
            {
                ...initialTweetState,
                tweet: { id: 1, isTweetRetweeted: true, retweetsCount: 1 } as TweetResponse,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetActionType.UPDATE_TWEET_DATA + "(NotificationType.REPLY)",
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1 } as TweetResponse
                },
                {
                    type: TweetActionType.UPDATE_TWEET_DATA,
                    payload: {
                        tweetId: 1,
                        tweet: { id: 1 },
                        notificationType: NotificationType.REPLY
                    } as NotificationReplyResponse
                }),
            {
                ...initialTweetState,
                tweet: { id: 1 } as TweetResponse,
                replies: [{ id: 1 }] as TweetResponse[],
                repliesLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_FOLLOW_TO_TWEET_STATE,
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1, user: { id: 1, isFollower: false } } as TweetResponse
                },
                {
                    type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE,
                    payload: true
                }),
            {
                ...initialTweetState,
                tweet: { id: 1, user: { id: 1, isFollower: true } } as TweetResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_BLOCKED_TO_TWEET_STATE,
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1, user: { id: 1, isUserBlocked: false } } as TweetResponse
                },
                {
                    type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE,
                    payload: true
                }),
            {
                ...initialTweetState,
                tweet: { id: 1, user: { id: 1, isUserBlocked: true } } as TweetResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_MUTED_TO_TWEET_STATE,
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1, user: { id: 1, isUserMuted: false } } as TweetResponse
                },
                {
                    type: TweetActionType.SET_MUTED_TO_TWEET_STATE,
                    payload: true
                }),
            {
                ...initialTweetState,
                tweet: { id: 1, user: { id: 1, isUserMuted: true } } as TweetResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_BOOKMARKED_TWEET,
            tweetReducer({
                    ...initialTweetState,
                    tweet: { id: 1, isTweetBookmarked: false } as TweetResponse
                },
                {
                    type: TweetActionType.SET_BOOKMARKED_TWEET,
                    payload: true
                }),
            {
                ...initialTweetState,
                tweet: { id: 1, isTweetBookmarked: true } as TweetResponse,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.RESET_TWEET_STATE,
            tweetReducer(
                { ...initialTweetState, tweet: { id: 1 } as TweetResponse },
                { type: TweetActionType.RESET_TWEET_STATE }
            ),
            { ...initialTweetState, tweet: undefined }
        );

        testActionDispatch(
            TweetActionType.SET_LOADING_STATE,
            tweetReducer(initialTweetState,
                { type: TweetActionType.SET_LOADING_STATE, payload: LoadingStatus.SUCCESS }
            ),
            { ...initialTweetState, loadingState: LoadingStatus.SUCCESS }
        );

        testActionDispatch(
            TweetActionType.SET_ERROR_MESSAGE,
            tweetReducer(initialTweetState,
                {
                    type: TweetActionType.SET_ERROR_MESSAGE,
                    payload: "Tweet not found"
                }
            ),
            {
                ...initialTweetState,
                loadingState: LoadingStatus.ERROR,
                errorMessage: "Tweet not found"
            }
        );

        testActionDispatch(
            TweetActionType.SET_LIKED_USERS,
            tweetReducer(initialTweetState,
                {
                    type: TweetActionType.SET_LIKED_USERS,
                    payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }
                }
            ),
            {
                ...initialTweetState,
                likedUsers: [{ id: 1 }],
                usersPagesCount: 2,
                likedUsersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.RESET_LIKED_USERS_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    likedUsersLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: TweetActionType.RESET_LIKED_USERS_STATE
                }
            ),
            {
                ...initialTweetState,
                likedUsersLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetActionType.SET_LIKED_USERS_LOADING_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    likedUsersLoadingState: LoadingStatus.LOADING
                },
                {
                    type: TweetActionType.SET_LIKED_USERS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }
            ),
            {
                ...initialTweetState,
                likedUsersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_RETWEETED_USERS,
            tweetReducer(initialTweetState,
                {
                    type: TweetActionType.SET_RETWEETED_USERS,
                    payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }
                }
            ),
            {
                ...initialTweetState,
                retweetedUsers: [{ id: 1 }],
                usersPagesCount: 2,
                retweetedUsersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.RESET_RETWEETED_USERS_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    retweetedUsersLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: TweetActionType.RESET_RETWEETED_USERS_STATE
                }
            ),
            {
                ...initialTweetState,
                retweetedUsersLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetActionType.SET_RETWEETED_USERS_LOADING_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    retweetedUsersLoadingState: LoadingStatus.LOADING
                },
                {
                    type: TweetActionType.SET_RETWEETED_USERS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }
            ),
            {
                ...initialTweetState,
                retweetedUsersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_TAGGED_IMAGE_USERS,
            tweetReducer(initialTweetState,
                {
                    type: TweetActionType.SET_TAGGED_IMAGE_USERS,
                    payload: { items: [{ id: 1 }] as UserResponse[], pagesCount: 2 }
                }
            ),
            {
                ...initialTweetState,
                taggedImageUsers: [{ id: 1 }],
                usersPagesCount: 2,
                taggedImageUsersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    taggedImageUsersLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: TweetActionType.RESET_TAGGED_IMAGE_USERS_STATE
                }
            ),
            {
                ...initialTweetState,
                taggedImageUsersLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetActionType.SET_TAGGED_IMAGE_USERS_LOADING_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    taggedImageUsersLoadingState: LoadingStatus.LOADING
                },
                {
                    type: TweetActionType.SET_TAGGED_IMAGE_USERS_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }
            ),
            {
                ...initialTweetState,
                taggedImageUsersLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.SET_REPLIES,
            tweetReducer(initialTweetState,
                {
                    type: TweetActionType.SET_REPLIES,
                    payload: [{ id: 1 }] as TweetResponse[]
                }
            ),
            {
                ...initialTweetState,
                replies: [{ id: 1 }],
                repliesLoadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            TweetActionType.RESET_REPLIES_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    repliesLoadingState: LoadingStatus.SUCCESS
                },
                {
                    type: TweetActionType.RESET_REPLIES_STATE
                }
            ),
            {
                ...initialTweetState,
                repliesLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            TweetActionType.SET_REPLIES_LOADING_STATE,
            tweetReducer(
                {
                    ...initialTweetState,
                    repliesLoadingState: LoadingStatus.LOADING
                },
                {
                    type: TweetActionType.SET_REPLIES_LOADING_STATE,
                    payload: LoadingStatus.SUCCESS
                }
            ),
            {
                ...initialTweetState,
                repliesLoadingState: LoadingStatus.SUCCESS
            }
        );
    });
});
