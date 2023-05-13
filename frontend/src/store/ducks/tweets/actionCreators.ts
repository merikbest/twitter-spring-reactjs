import {
    AddQuoteTweetRequest,
    TweetRequest,
    ChangeReplyTypeRequest,
    FetchTweetsByTagRequest,
    FetchTweetsByTextRequest,
    TweetActionPayload,
    TweetsByListIdRequest,
    TweetsState,
    TweetsWithQuotesByIdRequest,
    UpdatedBookmarkedTweetPayload,
    VoteRequest
} from "./contracts/state";
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
    FetchFollowersTweetsActionInterface,
    FetchMediaTweetsActionInterface,
    FetchTweetsActionInterface,
    FetchTweetsByListIdActionInterface,
    FetchTweetsByTagActionInterface,
    FetchTweetsByTextActionInterface,
    FetchTweetsWithQuotesByIdActionInterface,
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
    SetUpdatedBookmarkedTweetActionInterface,
    SetUpdatedTweetActionInterface,
    SetVoteActionInterface,
    TweetsActionType,
    UpdateScheduledTweetActionInterface,
    VoteActionInterface
} from "./contracts/actionTypes";
import {
    BlockedToTweetsPayload,
    FollowToTweetsPayload,
    MutedToTweetsPayload,
    TweetResponse
} from "../../../types/tweet";
import { NotificationReplyResponse, NotificationResponse } from "../../../types/notification";
import { LoadingStatus, PageableResponse } from "../../../types/common";

export const setFollowToTweetsState = (payload: FollowToTweetsPayload): SetFollowToTweetsStateActionInterface => ({
    type: TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE,
    payload
});

export const setBlockedToTweetsState = (payload: BlockedToTweetsPayload): SetBlockedToTweetsStateActionInterface => ({
    type: TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE,
    payload
});

export const setMutedToTweetsState = (payload: MutedToTweetsPayload): SetMutedToTweetsStateActionInterface => ({
    type: TweetsActionType.SET_MUTED_TO_TWEETS_STATE,
    payload
});

export const setTweets = (payload: TweetsState["items"]): SetTweetsActionInterface => ({
    type: TweetsActionType.SET_TWEETS,
    payload
});

export const setScheduledTweets = (payload: TweetsState["items"]): SetScheduledTweetsActionInterface => ({
    type: TweetsActionType.SET_SCHEDULED_TWEETS,
    payload
});

export const setPageableTweets = (payload: PageableResponse<TweetsState["items"]>): SetPageableTweetsActionInterface => ({
    type: TweetsActionType.SET_PAGEABLE_TWEETS,
    payload
});

export const setTweet = (payload: TweetResponse): SetTweetActionInterface => ({
    type: TweetsActionType.SET_TWEET,
    payload
});

export const resetTweets = (): ResetTweetsActionInterface => ({
    type: TweetsActionType.RESET_TWEETS
});

export const addTweet = (payload: TweetRequest): AddTweetActionInterface => ({
    type: TweetsActionType.ADD_TWEET,
    payload
});

export const addPoll = (payload: TweetRequest): AddPollActionInterface => ({
    type: TweetsActionType.ADD_POLL,
    payload
});

export const addScheduledTweet = (payload: TweetRequest): AddScheduledTweetActionInterface => ({
    type: TweetsActionType.ADD_SCHEDULED_TWEET,
    payload
});

export const updateScheduledTweet = (payload: TweetRequest): UpdateScheduledTweetActionInterface => ({
    type: TweetsActionType.UPDATE_SCHEDULED_TWEET,
    payload
});

export const addQuoteTweet = (payload: AddQuoteTweetRequest): AddQuoteTweetActionInterface => ({
    type: TweetsActionType.ADD_QUOTE_TWEET,
    payload
});

export const vote = (payload: VoteRequest): VoteActionInterface => ({
    type: TweetsActionType.VOTE,
    payload
});

export const setVote = (payload: TweetResponse): SetVoteActionInterface => ({
    type: TweetsActionType.SET_VOTE,
    payload
});

export const changeReplyType = (payload: ChangeReplyTypeRequest): ChangeReplyTypeActionInterface => ({
    type: TweetsActionType.CHANGE_REPLY_TYPE,
    payload
});

export const setUpdatedTweet = (payload: NotificationResponse | NotificationReplyResponse): SetUpdatedTweetActionInterface => ({
    type: TweetsActionType.SET_UPDATED_TWEET,
    payload
});

export const fetchDeleteTweet = (payload: number): FetchDeleteTweetActionInterface => ({
    type: TweetsActionType.FETCH_DELETE_TWEET,
    payload
});

export const deleteScheduledTweets = (payload: { tweetsIds: number[] }): DeleteScheduledTweetsActionInterface => ({
    type: TweetsActionType.DELETE_SCHEDULED_TWEETS,
    payload
});

export const deleteTweet = (payload: number): DeleteTweetActionInterface => ({
    type: TweetsActionType.DELETE_TWEET,
    payload
});

export const fetchTweetsByTag = (payload: FetchTweetsByTagRequest): FetchTweetsByTagActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_TAG,
    payload
});

export const fetchTweetsByText = (payload: FetchTweetsByTextRequest): FetchTweetsByTextActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_TEXT,
    payload
});

export const setTweetsLoadingState = (payload: LoadingStatus): SetTweetsLoadingStateInterface => ({
    type: TweetsActionType.SET_LOADING_STATE,
    payload
});

export const likeTweet = (payload: TweetActionPayload): LikeTweetActionInterface => ({
    type: TweetsActionType.LIKE_TWEET,
    payload
});

export const retweet = (payload: TweetActionPayload): RetweetActionInterface => ({
    type: TweetsActionType.RETWEET,
    payload
});

export const setUpdatedBookmarkedTweetTweetsState = (payload: UpdatedBookmarkedTweetPayload): SetUpdatedBookmarkedTweetActionInterface => ({
    type: TweetsActionType.SET_UPDATED_BOOKMARKED_TWEET,
    payload
});

export const fetchTweets = (payload: number): FetchTweetsActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS,
    payload
});

export const fetchMediaTweets = (payload: number): FetchMediaTweetsActionInterface => ({
    type: TweetsActionType.FETCH_MEDIA_TWEETS,
    payload
});

export const fetchTweetsWithVideo = (payload: number): FetchTweetsWithVideoActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_WITH_VIDEO,
    payload
});

export const fetchFollowersTweets = (payload: number): FetchFollowersTweetsActionInterface => ({
    type: TweetsActionType.FETCH_FOLLOWERS_TWEETS,
    payload
});

export const fetchTweetsByListId = (payload: TweetsByListIdRequest): FetchTweetsByListIdActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_BY_LIST_ID,
    payload
});

export const fetchQuotesByTweetId = (payload: TweetsWithQuotesByIdRequest): FetchTweetsWithQuotesByIdActionInterface => ({
    type: TweetsActionType.FETCH_TWEETS_WITH_QUOTES_BY_ID,
    payload
});

export const fetchUserBookmarks = (payload: number): FetchBookmarksActionInterface => ({
    type: TweetsActionType.FETCH_BOOKMARKS,
    payload
});

export const removeTweetFromBookmarks = (payload: number): RemoveTweetFromBookmarksActionInterface => ({
    type: TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS,
    payload
});
