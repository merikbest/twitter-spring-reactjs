import { testAction } from "../../../../util/test-utils/test-helper";
import {
    deleteUserTweet,
    fetchUserLikedTweets,
    fetchUserMediaTweets,
    fetchUserRetweetsAndReplies,
    fetchUserTweets,
    resetUserTweets,
    setAddedUserTweet,
    setBlockedUsersTweetState,
    setFollowToUsersTweetState,
    setMutedUsersTweetState,
    setUpdatedBookmarkedTweetUserTweetState,
    setUpdatedUserTweet,
    setUserTweets,
    setUserTweetsLoadingStatus,
    setUserVote
} from "../actionCreators";
import { UserTweetsActionType } from "../contracts/actionTypes";
import { TweetResponse } from "../../../../types/tweet";
import { NotificationResponse } from "../../../../types/notification";
import { LoadingStatus } from "../../../../types/common";

describe("userTweets actions", () => {
    testAction(setUserTweets, setUserTweets({ items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }), {
        type: UserTweetsActionType.SET_TWEETS,
        payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }
    });

    testAction(setFollowToUsersTweetState, setFollowToUsersTweetState({ userId: 1, tweetId: 1, isFollower: true }), {
        type: UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isFollower: true }
    });

    testAction(setBlockedUsersTweetState, setBlockedUsersTweetState({ userId: 1, tweetId: 1, isUserBlocked: true }), {
        type: UserTweetsActionType.SET_BLOCKED_USERS_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isUserBlocked: true }
    });

    testAction(setMutedUsersTweetState, setMutedUsersTweetState({ userId: 1, tweetId: 1, isUserMuted: true }), {
        type: UserTweetsActionType.SET_MUTED_USERS_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isUserMuted: true }
    });

    testAction(resetUserTweets, resetUserTweets(), {
        type: UserTweetsActionType.RESET_TWEETS
    });

    testAction(setAddedUserTweet, setAddedUserTweet({ id: 1 } as TweetResponse), {
        type: UserTweetsActionType.SET_ADDED_TWEET,
        payload: { id: 1 } as TweetResponse
    });

    testAction(setUpdatedUserTweet, setUpdatedUserTweet({ id: 1 } as NotificationResponse), {
        type: UserTweetsActionType.SET_UPDATED_TWEET,
        payload: { id: 1 } as NotificationResponse
    });

    testAction(setUserVote, setUserVote({ id: 1 } as TweetResponse), {
        type: UserTweetsActionType.SET_USER_VOTE,
        payload: { id: 1 } as TweetResponse
    });

    testAction(setUpdatedBookmarkedTweetUserTweetState, setUpdatedBookmarkedTweetUserTweetState({
        tweetId: 1,
        isTweetBookmarked: true
    }), {
        type: UserTweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
        payload: { tweetId: 1, isTweetBookmarked: true }
    });

    testAction(deleteUserTweet, deleteUserTweet(1), {
        type: UserTweetsActionType.DELETE_TWEET,
        payload: 1
    });

    testAction(fetchUserTweets, fetchUserTweets({ userId: "1", page: 1 }), {
        type: UserTweetsActionType.FETCH_TWEETS,
        payload: { userId: "1", page: 1 }
    });

    testAction(fetchUserLikedTweets, fetchUserLikedTweets({ userId: "1", page: 1 }), {
        type: UserTweetsActionType.FETCH_LIKED_TWEETS,
        payload: { userId: "1", page: 1 }
    });

    testAction(fetchUserMediaTweets, fetchUserMediaTweets({ userId: "1", page: 1 }), {
        type: UserTweetsActionType.FETCH_MEDIA_TWEETS,
        payload: { userId: "1", page: 1 }
    });

    testAction(fetchUserRetweetsAndReplies, fetchUserRetweetsAndReplies({ userId: "1", page: 1 }), {
        type: UserTweetsActionType.FETCH_RETWEETS_AND_REPLIES,
        payload: { userId: "1", page: 1 }
    });

    testAction(setUserTweetsLoadingStatus, setUserTweetsLoadingStatus(LoadingStatus.LOADING), {
        type: UserTweetsActionType.SET_LOADING_STATUS,
        payload: LoadingStatus.LOADING
    });
});
