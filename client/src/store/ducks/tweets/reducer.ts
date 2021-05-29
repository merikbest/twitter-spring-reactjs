import produce, {Draft} from 'immer';
import {LoadingState, TweetsState} from "./contracts/state";
import {TweetsActions, TweetsActionType} from "./actionCreators";

const initialTweetsState: TweetsState = {
    items: [],
    loadingState: LoadingState.NEVER
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {

    switch (action.type) {
        case TweetsActionType.SET_TWEETS:
            draft.items = action.payload;
            draft.loadingState = LoadingState.LOADED;
            break;

        case TweetsActionType.FETCH_TWEETS:
            draft.items = [];
            draft.loadingState = LoadingState.LOADING;
            break;

        case TweetsActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTweetsState);



