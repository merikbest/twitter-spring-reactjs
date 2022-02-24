import {LoadingStatus} from "../../types";
import {
    AddTweetToBookmarksActionInterface,
    DeleteTweetReplyActionInterface,
    FetchReplyTweetActionInterface,
    FetchTweetDataActionInterface,
    ResetTweetStateActionInterface,
    SetBlockedToTweetStateActionInterface,
    SetBookmarkedTweetActionInterface,
    SetFollowToTweetStateActionInterface,
    SetMutedToTweetStateActionInterface,
    SetTweetDataActionInterface,
    SetTweetDataLoadingStateInterface,
    TweetActionType,
} from "./contracts/actionTypes";
import {ReplyTweet, TweetState} from "./contracts/state";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const setFollowToTweetState = (payload: boolean): SetFollowToTweetStateActionInterface => ({ // +
    type: TweetActionType.SET_FOLLOW_TO_TWEET_STATE,
    payload
});

export const setBlockedToTweetState = (payload: boolean): SetBlockedToTweetStateActionInterface => ({ // +
    type: TweetActionType.SET_BLOCKED_TO_TWEET_STATE,
    payload
});

export const setMutedToTweetState = (payload: boolean): SetMutedToTweetStateActionInterface => ({ // +
    type: TweetActionType.SET_MUTED_TO_TWEET_STATE,
    payload
});

export const setTweetData = (payload: TweetState["data"]): SetTweetDataActionInterface => ({ // +
    type: TweetActionType.SET_TWEET_DATA,
    payload
});

export const fetchTweetData = (payload: number): FetchTweetDataActionInterface => ({ // +
    type: TweetActionType.FETCH_TWEET_DATA,
    payload
});

export const resetTweetState = (): ResetTweetStateActionInterface => ({ // +
    type: TweetActionType.RESET_TWEET_STATE
});

export const setTweetLoadingState = (payload: LoadingStatus): SetTweetDataLoadingStateInterface => ({ // +
    type: TweetActionType.SET_LOADING_STATE,
    payload
});

export const addTweetToBookmarks = (payload: string): AddTweetToBookmarksActionInterface => ({ // +
    type: TweetActionType.ADD_TWEET_TO_BOOKMARKS,
    payload,
});

export const setBookmarkedTweet = (payload: boolean): SetBookmarkedTweetActionInterface => ({ // +
    type: TweetActionType.SET_BOOKMARKED_TWEET,
    payload,
});

export const fetchReplyTweet = (payload: ReplyTweet): FetchReplyTweetActionInterface => ({
    type: TweetActionType.FETCH_REPLY_TWEET,
    payload
});

export const deleteTweetReply = (payload: string): DeleteTweetReplyActionInterface => ({
    type: TweetActionType.DELETE_TWEET_REPLY,
    payload
});
