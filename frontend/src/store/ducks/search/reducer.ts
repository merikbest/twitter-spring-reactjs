import produce, { Draft } from "immer";

import { LoadingStatus } from "../../../types/common";
import { SearchState } from "./contracts/state";
import { SearchActions, SearchActionsType } from "./contracts/actionTypes";

export const initialSearchState: SearchState = {
    searchResult: undefined,
    recentSearchResult: [],
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

        case SearchActionsType.RESET_SEARCH_RESULT:
            draft.searchResult = undefined;
            draft.searchLoadingState = LoadingStatus.LOADING;
            break;

        case SearchActionsType.SET_SEARCH_LOADING_STATE:
            draft.searchLoadingState = action.payload;
            break;

        default:
            break;
    }
}, initialSearchState);
