import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { SearchState } from "./contracts/state";
import { SearchActions, SearchActionsType } from "./contracts/actionTypes";

export const initialRecentSearchResult = { users: [], text: [], tags: [] };

export const initialSearchState: SearchState = {
    searchResult: undefined,
    recentSearchResult: initialRecentSearchResult,
    searchLoadingState: LoadingStatus.LOADING
};

export const searchReducer = produce((draft: Draft<SearchState>, action: SearchActions) => {
    switch (action.type) {

        case SearchActionsType.SET_SEARCH_RESULT:
            draft.searchResult = action.payload;
            draft.searchLoadingState = LoadingStatus.LOADED;
            break;

        case SearchActionsType.SET_RECENT_SEARCH_RESULT:
            draft.recentSearchResult = action.payload;
            draft.searchLoadingState = LoadingStatus.LOADED;
            break;

        case SearchActionsType.DELETE_RECENT_SEARCH_RESULT:
            if (draft.recentSearchResult) {
                let newArray;

                if (action.payload.stateItem === "users") {
                    newArray = draft.recentSearchResult.users
                        .filter((storageItem) => storageItem.id !== action.payload.item);
                    draft.recentSearchResult.users = newArray;
                } else {
                    newArray = [...draft.recentSearchResult[action.payload.stateItem]]
                        .filter((storageItem) => storageItem !== action.payload.item);
                    draft.recentSearchResult[action.payload.stateItem] = newArray;
                }
            }
            break;

        case SearchActionsType.RESET_SEARCH_RESULT:
            draft.searchResult = undefined;
            draft.recentSearchResult = initialRecentSearchResult;
            draft.searchLoadingState = LoadingStatus.LOADING;
            break;

        case SearchActionsType.SET_SEARCH_LOADING_STATE:
            draft.searchLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialSearchState);
