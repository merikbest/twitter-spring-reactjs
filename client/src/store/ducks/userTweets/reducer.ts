import produce, {Draft} from 'immer';

import {UserTweetsState} from "./contracts/state";
import {UserTweetsActions, UserTweetsActionType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialTweetsState: UserTweetsState = {
    items: [],
    pagesCount: 1,
    loadingState: LoadingStatus.LOADING
};

export const userTweetsReducer = produce((draft: Draft<UserTweetsState>, action: UserTweetsActions) => {

    switch (action.type) {
        case UserTweetsActionType.SET_TWEETS: // +
            draft.items = [...draft.items, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserTweetsActionType.SET_FOLLOW_TO_USERS_TWEETS_STATE: // +
            if (action.payload.tweetId !== undefined) {
                const followUserTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.tweetId);
                if (followUserTweetIndex !== -1) draft.items[followUserTweetIndex].user.isFollower = action.payload.isFollower;
            } else {
                draft.items = draft.items.map((tweet) => {
                    if (tweet.user.id === action.payload.userId) {
                        tweet.user.isFollower = action.payload.isFollower
                        return tweet;
                    } else {
                        return tweet;
                    }
                });
            }
            draft.loadingState = LoadingStatus.LOADED
            break;

        case UserTweetsActionType.RESET_TWEETS: // +
            draft.items = [];
            draft.pagesCount = 1;
            draft.loadingState = LoadingStatus.LOADING
            break;

        case UserTweetsActionType.SET_ADDED_TWEET: // +
            draft.items = [action.payload, ...draft.items];
            draft.loadingState = LoadingStatus.LOADED
            break;

        case UserTweetsActionType.SET_UPDATED_TWEET: // +
            const updatedTweetIndex = draft.items.findIndex((tweet) => tweet.id === action.payload.id);
            if (updatedTweetIndex !== -1) draft.items[updatedTweetIndex] = action.payload;
            break;

        case UserTweetsActionType.DELETE_TWEET:
            draft.items = draft.items.filter((tweet) => tweet.id !== action.payload.id);
            break;

        case UserTweetsActionType.SET_LOADING_STATUS: // +
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetsState);
