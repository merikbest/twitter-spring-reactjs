import produce, {Draft} from 'immer';

import {TweetsState} from "./contracts/state";
import {TweetsActions, TweetsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetsState: TweetsState = {
    items: [],
    pagesCount: 1,
    loadingState: LoadingStatus.LOADING
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {

    switch (action.type) {
        case TweetsActionType.SET_TWEETS: // +
            draft.items = [...draft.items, ...action.payload];
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.SET_SCHEDULED_TWEETS: // +
            draft.items = [...action.payload, ...draft.items];
            break;

        case TweetsActionType.SET_PAGEABLE_TWEETS: // +
            draft.items = [...draft.items, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.SET_TWEET: // +
            draft.items = [action.payload, ...draft.items];
            break;

        case TweetsActionType.RESET_TWEETS: // +
            draft.items = [];
            draft.pagesCount = 1;
            draft.loadingState = LoadingStatus.LOADING
            break;

        case TweetsActionType.SET_UPDATED_TWEET: // +
            const updatedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            if (updatedTweetIndex !== -1) draft.items[updatedTweetIndex] = action.payload;
            break;

        case TweetsActionType.SET_UPDATED_LIKED_TWEET: // +
            const likedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
            if (likedTweetIndex !== -1) draft.items[likedTweetIndex].isTweetLiked = action.payload.isTweetLiked;
            break;

        case TweetsActionType.SET_UPDATED_RETWEETED_TWEET: // +
            const retweetedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
            if (retweetedTweetIndex !== -1) draft.items[retweetedTweetIndex].isTweetRetweeted = action.payload.isTweetRetweeted;
            break;

        case TweetsActionType.SET_UPDATED_REPLIED_TWEET: // +
            const repliedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload);
            if (repliedTweetIndex !== -1) draft.items[repliedTweetIndex].repliesCount = draft.items[repliedTweetIndex].repliesCount + 1;
            break;

        case TweetsActionType.SET_LOADING_STATE: // +
            draft.loadingState = action.payload;
            break;

        case TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS: // +
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            draft.loadingState = LoadingStatus.LOADED
            break;

        case TweetsActionType.DELETE_TWEET: // +
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload.id);
            break;

        case TweetsActionType.SET_FOLLOW_TO_TWEETS_STATE: // +
            const followUserTweetIndex = draft.items.findIndex((tweet) => tweet.id !== action.payload.tweetId);
            if (followUserTweetIndex !== -1) draft.items[followUserTweetIndex].user.isFollower = action.payload.isFollower;
            draft.loadingState = LoadingStatus.LOADED
            break;

        case TweetsActionType.SET_BLOCKED_TO_TWEETS_STATE: // +
            const blockedUserTweetIndex = draft.items.findIndex((tweet) => tweet.id !== action.payload.tweetId);
            if (blockedUserTweetIndex !== -1) draft.items[blockedUserTweetIndex].user.isUserBlocked = action.payload.isUserBlocked;
            draft.loadingState = LoadingStatus.LOADED
            break;

        case TweetsActionType.SET_MUTED_TO_TWEETS_STATE: // +
            const mutedUserTweetIndex = draft.items.findIndex((tweet) => tweet.id !== action.payload.tweetId);
            if (mutedUserTweetIndex !== -1) draft.items[mutedUserTweetIndex].user.isUserMuted = action.payload.isUserMuted;
            draft.loadingState = LoadingStatus.LOADED
            break;

        default:
            break;
    }
}, initialTweetsState);
