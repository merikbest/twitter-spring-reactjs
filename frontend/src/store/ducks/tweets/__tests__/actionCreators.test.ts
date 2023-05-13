import { testAction } from "../../../../util/test-utils/test-helper";
import {
    addPoll,
    addQuoteTweet,
    addScheduledTweet,
    addTweet,
    changeReplyType,
    deleteScheduledTweets,
    deleteTweet,
    fetchDeleteTweet,
    fetchFollowersTweets,
    fetchMediaTweets,
    fetchTweets,
    fetchTweetsByListId,
    fetchTweetsByTag,
    fetchTweetsByText,
    fetchTweetsWithVideo,
    fetchUserBookmarks,
    likeTweet,
    removeTweetFromBookmarks,
    resetTweets,
    retweet,
    setBlockedToTweetsState,
    setFollowToTweetsState,
    setMutedToTweetsState,
    setPageableTweets,
    setScheduledTweets,
    setTweet,
    setTweets,
    setTweetsLoadingState,
    setUpdatedBookmarkedTweetTweetsState,
    setUpdatedTweet,
    setVote,
    updateScheduledTweet,
    vote
} from "../actionCreators";
import { TweetsActionType } from "../contracts/actionTypes";
import { TweetResponse } from "../../../../types/tweet";
import { AddQuoteTweetRequest, TweetRequest, VoteRequest } from "../contracts/state";
import { NotificationResponse } from "../../../../types/notification";
import { LoadingStatus, ReplyType } from "../../../../types/common";

describe("tweets actions", () => {
    testAction(setFollowToTweetsState, setFollowToTweetsState({ userId: 1, tweetId: 1, isFollower: true }), {
        type: TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isFollower: true }
    });

    testAction(setBlockedToTweetsState, setBlockedToTweetsState({ userId: 1, tweetId: 1, isUserBlocked: true }), {
        type: TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isUserBlocked: true }
    });

    testAction(setMutedToTweetsState, setMutedToTweetsState({ userId: 1, tweetId: 1, isUserMuted: true }), {
        type: TweetsActionType.SET_MUTED_TO_TWEETS_STATE,
        payload: { userId: 1, tweetId: 1, isUserMuted: true }
    });

    testAction(setTweets, setTweets([{ id: 1 }] as TweetResponse[]), {
        type: TweetsActionType.SET_TWEETS,
        payload: [{ id: 1 }] as TweetResponse[]
    });

    testAction(setScheduledTweets, setScheduledTweets([{ id: 1 }] as TweetResponse[]), {
        type: TweetsActionType.SET_SCHEDULED_TWEETS,
        payload: [{ id: 1 }] as TweetResponse[]
    });

    testAction(setPageableTweets, setPageableTweets({ items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }), {
        type: TweetsActionType.SET_PAGEABLE_TWEETS,
        payload: { items: [{ id: 1 }] as TweetResponse[], pagesCount: 1 }
    });

    testAction(setTweet, setTweet({ id: 1 } as TweetResponse), {
        type: TweetsActionType.SET_TWEET,
        payload: { id: 1 } as TweetResponse
    });

    testAction(resetTweets, resetTweets(), {
        type: TweetsActionType.RESET_TWEETS
    });

    testAction(addTweet, addTweet({ id: 1, text: "test" } as TweetRequest), {
        type: TweetsActionType.ADD_TWEET,
        payload: { id: 1, text: "test" } as TweetRequest
    });

    testAction(addPoll, addPoll({ id: 1, text: "test" } as TweetRequest), {
        type: TweetsActionType.ADD_POLL,
        payload: { id: 1, text: "test" } as TweetRequest
    });

    testAction(addScheduledTweet, addScheduledTweet({ id: 1, text: "test" } as TweetRequest), {
        type: TweetsActionType.ADD_SCHEDULED_TWEET,
        payload: { id: 1, text: "test" } as TweetRequest
    });

    testAction(updateScheduledTweet, updateScheduledTweet({ id: 1, text: "test" } as TweetRequest), {
        type: TweetsActionType.UPDATE_SCHEDULED_TWEET,
        payload: { id: 1, text: "test" } as TweetRequest
    });

    testAction(addQuoteTweet, addQuoteTweet({ tweetId: 1, text: "test" } as AddQuoteTweetRequest), {
        type: TweetsActionType.ADD_QUOTE_TWEET,
        payload: { tweetId: 1, text: "test" } as AddQuoteTweetRequest
    });

    testAction(vote, vote({ tweetId: 1, pollId: 1, pollChoiceId: 1 } as VoteRequest), {
        type: TweetsActionType.VOTE,
        payload: { tweetId: 1, pollId: 1, pollChoiceId: 1 } as VoteRequest
    });

    testAction(setVote, setVote({ id: 1 } as TweetResponse), {
        type: TweetsActionType.SET_VOTE,
        payload: { id: 1 } as TweetResponse
    });

    testAction(changeReplyType, changeReplyType({ tweetId: 1, replyType: ReplyType.FOLLOW }), {
        type: TweetsActionType.CHANGE_REPLY_TYPE,
        payload: { tweetId: 1, replyType: ReplyType.FOLLOW }
    });

    testAction(setUpdatedTweet, setUpdatedTweet({ id: 1 } as NotificationResponse), {
        type: TweetsActionType.SET_UPDATED_TWEET,
        payload: { id: 1 } as NotificationResponse
    });

    testAction(fetchDeleteTweet, fetchDeleteTweet(1), {
        type: TweetsActionType.FETCH_DELETE_TWEET,
        payload: 1
    });

    testAction(deleteScheduledTweets, deleteScheduledTweets({ tweetsIds: [1, 2] }), {
        type: TweetsActionType.DELETE_SCHEDULED_TWEETS,
        payload: { tweetsIds: [1, 2] }
    });

    testAction(deleteTweet, deleteTweet(1), {
        type: TweetsActionType.DELETE_TWEET,
        payload: 1
    });

    testAction(fetchTweetsByTag, fetchTweetsByTag({ tag: "test", pageNumber: 1 }), {
        type: TweetsActionType.FETCH_TWEETS_BY_TAG,
        payload: { tag: "test", pageNumber: 1 }
    });

    testAction(fetchTweetsByText, fetchTweetsByText({ text: "test", pageNumber: 1 }), {
        type: TweetsActionType.FETCH_TWEETS_BY_TEXT,
        payload: { text: "test", pageNumber: 1 }
    });

    testAction(setTweetsLoadingState, setTweetsLoadingState(LoadingStatus.LOADING), {
        type: TweetsActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(likeTweet, likeTweet({ tweetId: 1 }), {
        type: TweetsActionType.LIKE_TWEET,
        payload: { tweetId: 1 }
    });

    testAction(retweet, retweet({ tweetId: 1 }), {
        type: TweetsActionType.RETWEET,
        payload: { tweetId: 1 }
    });

    testAction(setUpdatedBookmarkedTweetTweetsState, setUpdatedBookmarkedTweetTweetsState({
        tweetId: 1,
        isTweetBookmarked: true
    }), {
        type: TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
        payload: { tweetId: 1, isTweetBookmarked: true }
    });

    testAction(fetchTweets, fetchTweets(1), {
        type: TweetsActionType.FETCH_TWEETS,
        payload: 1
    });

    testAction(fetchMediaTweets, fetchMediaTweets(1), {
        type: TweetsActionType.FETCH_MEDIA_TWEETS,
        payload: 1
    });

    testAction(fetchTweetsWithVideo, fetchTweetsWithVideo(1), {
        type: TweetsActionType.FETCH_TWEETS_WITH_VIDEO,
        payload: 1
    });

    testAction(fetchFollowersTweets, fetchFollowersTweets(1), {
        type: TweetsActionType.FETCH_FOLLOWERS_TWEETS,
        payload: 1
    });

    testAction(fetchTweetsByListId, fetchTweetsByListId({ listId: 1, pageNumber: 1 }), {
        type: TweetsActionType.FETCH_TWEETS_BY_LIST_ID,
        payload: { listId: 1, pageNumber: 1 }
    });

    testAction(fetchUserBookmarks, fetchUserBookmarks(1), {
        type: TweetsActionType.FETCH_BOOKMARKS,
        payload: 1
    });

    testAction(removeTweetFromBookmarks, removeTweetFromBookmarks(1), {
        type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS,
        payload: 1
    });
});
