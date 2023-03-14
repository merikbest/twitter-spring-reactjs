import produce, { Draft } from "immer";

import { UnsentTweetActionType, UnsentTweetsActions } from "./contracts/actionTypes";
import { UnsentTweetsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const initialUnsentTweetsState: UnsentTweetsState = {
    items: [],
    pagesCount: 0,
    loadingState: LoadingStatus.LOADING
};

export const unsentTweetsReducer = produce((draft: Draft<UnsentTweetsState>, action: UnsentTweetsActions) => {

    switch (action.type) {
        case UnsentTweetActionType.SET_UNSENT_TWEETS:
            draft.items = [...draft.items, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UnsentTweetActionType.RESET_UNSENT_TWEETS:
            draft.items = [];
            draft.pagesCount = 0;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UnsentTweetActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUnsentTweetsState);
