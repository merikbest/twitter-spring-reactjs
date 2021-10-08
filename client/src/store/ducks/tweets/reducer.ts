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
            break;

        case TweetsActionType.SET_UPDATED_TWEET:
            const updatedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            if (updatedTweetIndex !== -1) {
                draft.items[updatedTweetIndex].likedTweets = action.payload.likedTweets;
                draft.items[updatedTweetIndex].retweets = action.payload.retweets;
                draft.items[updatedTweetIndex].replies = action.payload.replies;
                draft.items[updatedTweetIndex].poll = action.payload.poll;
                draft.items[updatedTweetIndex].replyType = action.payload.replyType;
            }
            break;

        case TweetsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        case TweetsActionType.REMOVE_TWEET_FROM_BOOKMARKS:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload);
            draft.loadingState = LoadingStatus.LOADED
            break;

        case TweetsActionType.DELETE_TWEET:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload.id);
            break;

        default:
            break;
    }
}, initialTweetsState);
