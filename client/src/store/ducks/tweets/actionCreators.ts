import {AddQuoteTweet, AddTweet, ReplyType, Tweet, TweetsState, Vote} from "./contracts/state";
import {
    AddPollActionInterface,
    AddQuoteTweetActionInterface,
    AddScheduledTweetActionInterface,
    AddTweetActionInterface,
    ChangeReplyTypeActionInterface,
    DeleteScheduledTweetsActionInterface,
    DeleteTweetActionInterface,
    FetchBookmarksActionInterface,
    FetchDeleteTweetActionInterface,
    FetchMediaTweetsActionInterface,
    FetchTweetsActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchTweetsWithVideoActionInterface,
    LikeTweetActionInterface,
    RemoveTweetFromBookmarksActionInterface,
    ResetTweetsActionInterface,
    RetweetActionInterface,
    SetBlockedToTweetsStateActionInterface,
    SetFollowToTweetsStateActionInterface,
    SetMutedToTweetsStateActionInterface,
    SetPageableTweetsActionInterface,
    SetScheduledTweetsActionInterface,
    SetTweetActionInterface,
    SetTweetsActionInterface,
    SetTweetsLoadingStateInterface,
    SetUpdatedTweetActionInterface,
    TweetsActionType,
    UpdateScheduledTweetActionInterface,
    VoteActionInterface,
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const setFollowToTweetsState = (payload: { tweetId: number; isFollower: boolean; }): SetFollowToTweetsStateActionInterface => ({ // +
    type: TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE,
    payload
});

export const setBlockedToTweetsState = (payload: { tweetId: number; isUserBlocked: boolean; }): SetBlockedToTweetsStateActionInterface => ({ // +
    type: TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE,
    payload
});

export const setMutedToTweetsState = (payload: { tweetId: number; isUserMuted: boolean; }): SetMutedToTweetsStateActionInterface => ({ // +
    type: TweetsActionType.SET_MUTED_TO_TWEETS_STATE,
    payload
});

export const setTweets = (payload: TweetsState["items"]): SetTweetsActionInterface => ({ // +
    type: TweetsActionType.SET_TWEETS,
    payload
});

export const setScheduledTweets = (payload: TweetsState["items"]): SetScheduledTweetsActionInterface => ({ // +
    type: TweetsActionType.SET_SCHEDULED_TWEETS,
    payload
});

export const setPageableTweets = (payload: { items: TweetsState["items"], pagesCount: TweetsState["pagesCount"] }): SetPageableTweetsActionInterface => ({ // +
    type: TweetsActionType.SET_PAGEABLE_TWEETS,
    payload
});

export const setTweet = (payload: Tweet): SetTweetActionInterface => ({ // +
    type: TweetsActionType.SET_TWEET,
    payload
});

export const resetTweets = (): ResetTweetsActionInterface => ({ // +
    type: TweetsActionType.RESET_TWEETS,
});

export const addTweet = (payload: AddTweet): AddTweetActionInterface => ({ // +
    type: TweetsActionType.ADD_TWEET,
    payload
});

export const addPoll = (payload: AddTweet): AddPollActionInterface => ({ // +
    type: TweetsActionType.ADD_POLL,
    payload
});

export const addScheduledTweet = (payload: AddTweet): AddScheduledTweetActionInterface => ({ // +
    type: TweetsActionType.ADD_SCHEDULED_TWEET,
    payload
});

export const updateScheduledTweet = (payload: AddTweet): UpdateScheduledTweetActionInterface => ({ // +
    type: TweetsActionType.UPDATE_SCHEDULED_TWEET,
    payload
});

export const addQuoteTweet = (payload: AddQuoteTweet): AddQuoteTweetActionInterface => ({ // +
    type: TweetsActionType.ADD_QUOTE_TWEET,
    payload
});

export const vote = (payload: Vote): VoteActionInterface => ({ // +
    type: TweetsActionType.VOTE,
    payload
});

export const changeReplyType = (payload: { tweetId: string; replyType: ReplyType; }): ChangeReplyTypeActionInterface => ({
    type: TweetsActionType.CHANGE_REPLY_TYPE,
    payload
});

export const setUpdatedTweet = (payload: Tweet): SetUpdatedTweetActionInterface => ({
    type: TweetsActionType.SET_UPDATED_TWEET,
    payload
});

export const fetchDeleteTweet = (payload: string): FetchDeleteTweetActionInterface => ({
    type: TweetsActionType.FETCH_DELETE_TWEET,
    payload
});

export const deleteScheduledTweets = (payload: { tweetsIds: number[] }): DeleteScheduledTweetsActionInterface => ({ // +
    type: TweetsActionType.DELETE_SCHEDULED_TWEETS,
    payload
});

export const deleteTweet = (payload: Tweet): DeleteTweetActionInterface => ({
    type: TweetsActionType.DELETE_TWEET,
    payload
});

export const fetchTweetsByTag = (payload: string): FetchTweetsByTagActionInterface => ({ // +
    type: TweetsActionType.FETCH_TWEETS_BY_TAG,
    payload
});

export const fetchTweetsByText = (payload: string): FetchTweetsByTextActionInterface => ({ //+
    type: TweetsActionType.FETCH_TWEETS_BY_TEXT,
    payload
});

export const setTweetsLoadingState = (payload: LoadingStatus): SetTweetsLoadingStateInterface => ({ // +
    type: TweetsActionType.SET_LOADING_STATE,
    payload
});

export const likeTweet = (payload: string): LikeTweetActionInterface => ({
    type: TweetsActionType.LIKE_TWEET,
    payload,
});

export const retweet = (payload: string): RetweetActionInterface => ({
    type: TweetsActionType.RETWEET,
    payload,
});

export const fetchTweets = (payload: number): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
    payload,
});

export const fetchMediaTweets = (payload: number): FetchMediaTweetsActionInterface => ({ // +
    type: TweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const fetchTweetsWithVideo = (payload: number): FetchTweetsWithVideoActionInterface => ({ // +
    type: TweetsActionType.FETCH_TWEETS_WITH_VIDEO,
    payload
});

export const fetchUserBookmarks = (payload: number): FetchBookmarksActionInterface => ({ // +
    type: TweetsActionType.FETCH_BOOKMARKS,
    payload
});

export const removeTweetFromBookmarks = (payload: string): RemoveTweetFromBookmarksActionInterface => ({
    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS,
    payload,
});
