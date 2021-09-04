import produce, {Draft} from 'immer';

import {TweetsState} from "./contracts/state";
import {TweetsActions, TweetsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetsState: TweetsState = {
    items: [],
    loadingState: LoadingStatus.NEVER
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {

    switch (action.type) {
        case TweetsActionType.SET_TWEETS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case TweetsActionType.SET_TWEET:
            draft.items = [action.payload, ...draft.items];
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case TweetsActionType.SET_UPDATED_TWEET:
            const updatedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            console.log(updatedTweetIndex)
            draft.items[updatedTweetIndex] = action.payload;
            break;

        case TweetsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case TweetsActionType.LIKE_TWEET:
            const tweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            draft.items[tweetIndex] = action.payload;
            break;

        case TweetsActionType.RETWEET:
            const retweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            draft.items[retweetIndex] = action.payload;
            break;

        case TweetsActionType.REPLY:
            const replyIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            draft.items[replyIndex] = action.payload;
            break;

        case TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            draft.loadingState = LoadingStatus.LOADED
            break;

        case TweetsActionType.FETCH_DELETE_TWEET:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            draft.loadingState = LoadingStatus.LOADED
            break;

        default:
            break;
    }
}, initialTweetsState);



