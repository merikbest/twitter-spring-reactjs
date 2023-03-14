import produce, { Draft } from "immer";

import { ListMembersActions, ListMembersActionsType } from "./contracts/actionTypes";
import { ListMembersState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const initialListMembersState: ListMembersState = {
    members: [],
    suggested: [],
    membersLoadingState: LoadingStatus.LOADING,
    suggestedLoadingState: LoadingStatus.LOADING
};

export const listMembersReducer = produce((draft: Draft<ListMembersState>, action: ListMembersActions) => {
    switch (action.type) {
        case ListMembersActionsType.SET_LIST_MEMBERS:
            draft.members = action.payload;
            draft.membersLoadingState = LoadingStatus.LOADED;
            break;

        case ListMembersActionsType.SET_LIST_SUGGESTED:
            draft.suggested = action.payload;
            draft.suggestedLoadingState = LoadingStatus.LOADED;
            break;

        case ListMembersActionsType.SET_USER_TO_LIST:
            if (action.payload.isSuggested) {
                const suggestedIndex = draft.suggested.findIndex((suggest) => suggest.id === action.payload.userId);
                if (suggestedIndex !== -1) draft.suggested[suggestedIndex].isMemberInList = action.payload.isUserAdded;
            } else {
                const membersIndex = draft.members.findIndex((member) => member.id === action.payload.userId);
                if (membersIndex !== -1) draft.members[membersIndex].isMemberInList = action.payload.isUserAdded;
            }
            draft.membersLoadingState = LoadingStatus.LOADED;
            break;

        case ListMembersActionsType.RESET_LIST_MEMBERS_STATE:
            draft.members = [];
            draft.membersLoadingState = LoadingStatus.LOADING;
            break;

        case ListMembersActionsType.RESET_LIST_SUGGESTED_STATE:
            draft.suggested = [];
            draft.suggestedLoadingState = LoadingStatus.LOADING;
            break;

        case ListMembersActionsType.RESET_LIST_MEMBERS:
            draft.members = [];
            break;

        case ListMembersActionsType.SET_LOADING_MEMBERS_STATE:
            draft.membersLoadingState = action.payload;
            break;

        case ListMembersActionsType.SET_LOADING_SUGGESTED_STATE:
            draft.suggestedLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialListMembersState);
