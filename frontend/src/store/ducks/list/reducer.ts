import produce, { Draft } from "immer";

import { ListState } from "./contracts/state";
import { ListActions, ListActionType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialListState: ListState = {
    list: undefined,
    loadingState: LoadingStatus.LOADING
};

export const listReducer = produce((draft: Draft<ListState>, action: ListActions) => {

    switch (action.type) {
        case ListActionType.SET_LIST:
            draft.list = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListActionType.SET_MEMBERS_SIZE:
            if (draft.list) {
                draft.list.membersSize = action.payload ? draft.list.membersSize + 1 : draft.list.membersSize - 1;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case ListActionType.UPDATE_FOLLOW_TO_FULL_LIST:
            if (draft.list) {
                draft.list.isFollower = action.payload;
                draft.list.followersSize = action.payload ? draft.list.followersSize + 1 : draft.list.followersSize - 1;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case ListActionType.RESET_LIST_STATE:
            draft.list = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ListActionType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialListState);
