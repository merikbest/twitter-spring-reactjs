import produce, { Draft } from "immer";

import { UserDetailActions, UserDetailActionsType } from "./contracts/actionTypes";
import { UserDetailState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const initialUserDetailState: UserDetailState = {
    item: undefined,
    loadingState: LoadingStatus.LOADING
};

export const userDetailReducer = produce((draft: Draft<UserDetailState>, action: UserDetailActions) => {
    switch (action.type) {
        case UserDetailActionsType.SET_USER_DETAIL:
            draft.item = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UserDetailActionsType.SET_FOLLOW_TO_USER_DETAIL:
            if (draft.item) {
                draft.item.isFollower = action.payload;
                draft.item.followingSize = action.payload ? draft.item.followingSize + 1 : draft.item.followingSize - 1;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case UserDetailActionsType.SET_BLOCK_USER_DETAIL:
            if (draft.item) {
                draft.item.isUserBlocked = action.payload;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case UserDetailActionsType.SET_FOLLOW_REQUEST_TO_USER_DETAIL:
            if (draft.item) {
                draft.item.isWaitingForApprove = action.payload;
                draft.loadingState = LoadingStatus.LOADED;
            }
            break;

        case UserDetailActionsType.RESET_USER_DETAIL_STATE:
            draft.item = undefined;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UserDetailActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUserDetailState);
