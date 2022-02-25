import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {ListMembersActions, ListMembersActionsType} from './contracts/actionTypes';
import {ListMembersState} from './contracts/state';

const initialTagsState: ListMembersState = {
    items: [],
    loadingState: LoadingStatus.LOADING,
};

export const listMembersReducer = produce((draft: Draft<ListMembersState>, action: ListMembersActions) => {
    switch (action.type) {
        case ListMembersActionsType.SET_LIST_MEMBERS:
            draft.items = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListMembersActionsType.SET_USER_TO_LIST_MEMBERS:
            const memberListIndex = draft.items.findIndex((member) => member.id === action.payload.userId);
            if (memberListIndex !== -1) draft.items[memberListIndex].isMemberInList = action.payload.isMember;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case ListMembersActionsType.RESET_LIST_MEMBERS_STATE:
            draft.items = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case ListMembersActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialTagsState);
