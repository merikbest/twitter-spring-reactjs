import { initialListState, listReducer } from "../reducer";
import { ListActions, ListActionType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus, NotificationType } from "../../../../types/common";
import { TweetResponse } from "../../../../types/tweet";
import { NotificationReplyResponse, NotificationResponse } from "../../../../types/notification";

describe("listReducer:", () => {
    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(listReducer(undefined, {} as ListActions)).toEqual(initialListState);
        });
    });

    describe("lists handlers:", () => {
        testActionDispatch(
            ListActionType.SET_LIST,
            listReducer(initialListState, {
                type: ListActionType.SET_LIST,
                payload: { id: 1 } as BaseListResponse
            }),
            {
                ...initialListState,
                list: { id: 1 } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.SET_MEMBERS_SIZE,
            listReducer(
                {
                    ...initialListState,
                    list: { id: 1, membersSize: 1 } as BaseListResponse
                },
                {
                    type: ListActionType.SET_MEMBERS_SIZE,
                    payload: true
                }
            ),
            {
                ...initialListState,
                list: { id: 1, membersSize: 2 } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.SET_LIST_TWEETS,
            listReducer(initialListState, {
                type: ListActionType.SET_LIST_TWEETS,
                payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 2 }
            }),
            {
                ...initialListState,
                tweets: [{ id: 1 }] as TweetResponse[],
                pagesCount: 2,
                loadingTweetsState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
            listReducer(
                {
                    ...initialListState,
                    list: { id: 1, followersSize: 1, isFollower: false } as BaseListResponse
                },
                {
                    type: ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
                    payload: true
                }
            ),
            {
                ...initialListState,
                list: { id: 1, followersSize: 2, isFollower: true } as BaseListResponse,
                loadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.SET_UPDATED_LIST_TWEET + "(NotificationType.LIKE)",
            listReducer({
                    ...initialListState,
                    tweets: [{ id: 1, isTweetLiked: false, likesCount: 0 }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_UPDATED_LIST_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.LIKE
                    } as NotificationResponse
                }),
            {
                ...initialListState,
                tweets: [{ id: 1, isTweetLiked: true, likesCount: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListActionType.SET_UPDATED_LIST_TWEET + "(NotificationType.RETWEET)",
            listReducer({
                    ...initialListState,
                    tweets: [{ id: 1, isTweetRetweeted: false, retweetsCount: 0 }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_UPDATED_LIST_TWEET,
                    payload: {
                        id: 1,
                        tweet: { id: 1, notificationCondition: true },
                        notificationType: NotificationType.RETWEET
                    } as NotificationResponse
                }),
            {
                ...initialListState,
                tweets: [{ id: 1, isTweetRetweeted: true, retweetsCount: 1 }] as TweetResponse[],
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListActionType.SET_UPDATED_LIST_TWEET + "(NotificationType.REPLY)",
            listReducer({
                    ...initialListState,
                    tweets: [{ id: 1, repliesCount: 0 }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_UPDATED_LIST_TWEET,
                    payload: {
                        tweetId: 1,
                        tweet: { id: 1 },
                        notificationType: NotificationType.REPLY
                    } as NotificationReplyResponse
                }),
            {
                ...initialListState,
                tweets: [{ id: 1, repliesCount: 1 }] as TweetResponse[]
            }
        );

        testActionDispatch(
            ListActionType.SET_UPDATED_BOOKMARKED_LIST_TWEET,
            listReducer(
                {
                    ...initialListState,
                    tweets: [{ id: 1, isTweetBookmarked: false }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_UPDATED_BOOKMARKED_LIST_TWEET,
                    payload: { tweetId: 1, isTweetBookmarked: true }
                }
            ),
            {
                ...initialListState,
                tweets: [{ id: 1, isTweetBookmarked: true }] as TweetResponse[]
            }
        );

        testActionDispatch(
            ListActionType.SET_VOTE_LIST_TWEET,
            listReducer(
                {
                    ...initialListState,
                    tweets: [
                        { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } },
                        { id: 2, poll: null }
                    ] as unknown as TweetResponse[]
                },
                {
                    type: ListActionType.SET_VOTE_LIST_TWEET,
                    payload: { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } } as TweetResponse
                }
            ),
            {
                ...initialListState,
                tweets: [
                    { id: 1, poll: { id: 1, pollChoices: [ { id: 1, choice: "test" } ] } },
                    { id: 2, poll: null }
                ] as unknown as TweetResponse[]
            }
        );

        testActionDispatch(
            ListActionType.DELETE_LIST_TWEET,
            listReducer(
                {
                    ...initialListState,
                    tweets: [{ id: 1 }] as TweetResponse[]
                },
                {
                    type: ListActionType.DELETE_LIST_TWEET,
                    payload: 1
                }
            ),
            {
                ...initialListState,
                tweets: []
            }
        );

        testActionDispatch(
            ListActionType.SET_FOLLOW_TO_LIST_TWEETS_STATE,
            listReducer(
                {
                    ...initialListState,
                    tweets: [{ id: 1, author: { id: 1, isFollower: false } }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_FOLLOW_TO_LIST_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isFollower: true }
                }
            ),
            {
                ...initialListState,
                tweets: [{ id: 1, author: { id: 1, isFollower: true } }] as TweetResponse[]
            }
        );

        testActionDispatch(
            ListActionType.SET_BLOCKED_TO_LIST_TWEETS_STATE,
            listReducer(
                {
                    ...initialListState,
                    tweets: [{ id: 1, author: { id: 1, isUserBlocked: false } }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_BLOCKED_TO_LIST_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isUserBlocked: true }
                }
            ),
            {
                ...initialListState,
                tweets: [{ id: 1, author: { id: 1, isUserBlocked: true } }] as TweetResponse[],
                loadingTweetsState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.SET_MUTED_TO_LIST_TWEETS_STATE,
            listReducer(
                {
                    ...initialListState,
                    tweets: [{ id: 1, author: { id: 1, isUserMuted: false } }] as TweetResponse[]
                },
                {
                    type: ListActionType.SET_MUTED_TO_LIST_TWEETS_STATE,
                    payload: { userId: 1, tweetId: 1, isUserMuted: true }
                }
            ),
            {
                ...initialListState,
                tweets: [{ id: 1, author: { id: 1, isUserMuted: true } }] as TweetResponse[],
                loadingTweetsState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            ListActionType.RESET_LIST_STATE,
            listReducer(
                {
                    ...initialListState,
                    list: { id: 1 } as BaseListResponse
                },
                {
                    type: ListActionType.RESET_LIST_STATE
                }
            ),
            {
                ...initialListState,
                list: undefined,
                tweets: [],
                pagesCount: 0,
                loadingTweetsState: LoadingStatus.LOADING,
                loadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            ListActionType.SET_LOADING_STATE,
            listReducer(initialListState, {
                type: ListActionType.SET_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListState,
                loadingState: LoadingStatus.SUCCESS
            }
        );

        testActionDispatch(
            ListActionType.SET_TWEETS_LOADING_STATE,
            listReducer(initialListState, {
                type: ListActionType.SET_TWEETS_LOADING_STATE,
                payload: LoadingStatus.SUCCESS
            }),
            {
                ...initialListState,
                loadingTweetsState: LoadingStatus.SUCCESS
            }
        );
    });
});
