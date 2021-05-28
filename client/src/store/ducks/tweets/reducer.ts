import produce, {Draft} from 'immer';
import {LoadingState, TweetsState} from "./contracts/state";
import {TweetsActions, TweetsActionType} from "./actionCreators";

const initialTweetsState: TweetsState = {
    items: [],
    loadingState: LoadingState.NEVER
};

export const tweetsReducer = produce((draft: Draft<TweetsState>, action: TweetsActions) => {
    const {type, payload} = action;

    if (type === TweetsActionType.SET_TWEETS) {
        draft.items = payload
    }


}, initialTweetsState);



