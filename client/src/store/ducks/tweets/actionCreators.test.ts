import {testAction} from "../../../util/testHelper";
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
    updateScheduledTweet,
    vote
} from "./actionCreators";
import {TweetsActionType} from "./contracts/actionTypes";
import {TweetResponse} from "../../types/tweet";
import {AddQuoteTweet, AddTweet, ReplyType, Vote} from "./contracts/state";
import {NotificationResponse} from "../../types/notification";
import {LoadingStatus} from "../../types";

describe("tweets actions", () => {
    testAction(setFollowToTweetsState, setFollowToTweetsState({userId: 1, tweetId: 1, isFollower: true}), {
        type: TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE,
        payload: {userId: 1, tweetId: 1, isFollower: true}
    });

    testAction(setBlockedToTweetsState, setBlockedToTweetsState({userId: 1, tweetId: 1, isUserBlocked: true}), {
        type: TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE,
        payload: {userId: 1, tweetId: 1, isUserBlocked: true}
    });

    testAction(setMutedToTweetsState, setMutedToTweetsState({userId: 1, tweetId: 1, isUserMuted: true}), {
        type: TweetsActionType.SET_MUTED_TO_TWEETS_STATE,
        payload: {userId: 1, tweetId: 1, isUserMuted: true}
    });

    testAction(setTweets, setTweets([{id: 1}] as TweetResponse[]), {
        type: TweetsActionType.SET_TWEETS,
        payload: [{id: 1}] as TweetResponse[]
    });

    testAction(setScheduledTweets, setScheduledTweets([{id: 1}] as TweetResponse[]), {
        type: TweetsActionType.SET_SCHEDULED_TWEETS,
        payload: [{id: 1}] as TweetResponse[]
    });

    testAction(setPageableTweets, setPageableTweets({items: [{id: 1}] as TweetResponse[], pagesCount: 1}), {
        type: TweetsActionType.SET_PAGEABLE_TWEETS,
        payload: {items: [{id: 1}] as TweetResponse[], pagesCount: 1}
    });

    testAction(setTweet, setTweet({id: 1} as TweetResponse), {
        type: TweetsActionType.SET_TWEET,
        payload: {id: 1} as TweetResponse
    });

    testAction(resetTweets, resetTweets(), {
        type: TweetsActionType.RESET_TWEETS,
    });

    testAction(addTweet, addTweet({id: 1, text: "test"} as AddTweet), {
        type: TweetsActionType.ADD_TWEET,
        payload: {id: 1, text: "test"} as AddTweet
    });

    testAction(addPoll, addPoll({id: 1, text: "test"} as AddTweet), {
        type: TweetsActionType.ADD_POLL,
        payload: {id: 1, text: "test"} as AddTweet
    });

    testAction(addScheduledTweet, addScheduledTweet({id: 1, text: "test"} as AddTweet), {
        type: TweetsActionType.ADD_SCHEDULED_TWEET,
        payload: {id: 1, text: "test"} as AddTweet
    });

    testAction(updateScheduledTweet, updateScheduledTweet({id: 1, text: "test"} as AddTweet), {
        type: TweetsActionType.UPDATE_SCHEDULED_TWEET,
        payload: {id: 1, text: "test"} as AddTweet
    });

    testAction(addQuoteTweet, addQuoteTweet({tweetId: 1, text: "test"} as AddQuoteTweet), {
        type: TweetsActionType.ADD_QUOTE_TWEET,
        payload: {tweetId: 1, text: "test"} as AddQuoteTweet
    });

    testAction(vote, vote({tweetId: 1, pollId: 1, pollChoiceId: 1} as Vote), {
        type: TweetsActionType.VOTE,
        payload: {tweetId: 1, pollId: 1, pollChoiceId: 1} as Vote
    });

    testAction(changeReplyType, changeReplyType({tweetId: 1, replyType: ReplyType.FOLLOW}), {
        type: TweetsActionType.CHANGE_REPLY_TYPE,
        payload: {tweetId: 1, replyType: ReplyType.FOLLOW}
    });

    testAction(setUpdatedTweet, setUpdatedTweet({id: 1} as NotificationResponse), {
        type: TweetsActionType.SET_UPDATED_TWEET,
        payload: {id: 1} as NotificationResponse
    });

    testAction(fetchDeleteTweet, fetchDeleteTweet(1), {
        type: TweetsActionType.FETCH_DELETE_TWEET,
        payload: 1
    });

    testAction(deleteScheduledTweets, deleteScheduledTweets({tweetsIds: [1, 2]}), {
        type: TweetsActionType.DELETE_SCHEDULED_TWEETS,
        payload: {tweetsIds: [1, 2]}
    });

    testAction(deleteTweet, deleteTweet({id: 1} as TweetResponse), {
        type: TweetsActionType.DELETE_TWEET,
        payload: {id: 1} as TweetResponse
    });

    testAction(fetchTweetsByTag, fetchTweetsByTag("test"), {
        type: TweetsActionType.FETCH_TWEETS_BY_TAG,
        payload: "test"
    });

    testAction(fetchTweetsByText, fetchTweetsByText("test"), {
        type: TweetsActionType.FETCH_TWEETS_BY_TEXT,
        payload: "test"
    });

    testAction(setTweetsLoadingState, setTweetsLoadingState(LoadingStatus.LOADING), {
        type: TweetsActionType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(likeTweet, likeTweet(1), {
        type: TweetsActionType.LIKE_TWEET,
        payload: 1
    });

    testAction(retweet, retweet(1), {
        type: TweetsActionType.RETWEET,
        payload: 1
    });

    testAction(setUpdatedBookmarkedTweetTweetsState, setUpdatedBookmarkedTweetTweetsState({tweetId: 1, isTweetBookmarked: true}), {
        type: TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
        payload: {tweetId: 1, isTweetBookmarked: true}
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

    testAction(fetchTweetsByListId, fetchTweetsByListId({listId: 1, pageNumber: 1}), {
        type: TweetsActionType.FETCH_TWEETS_BY_LIST_ID,
        payload: {listId: 1, pageNumber: 1}
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
