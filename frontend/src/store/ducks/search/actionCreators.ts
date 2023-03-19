import {
    DeleteRecentSearchResultActionInterface,
    FetchRecentSearchResultActionInterface,
    FetchSearchByTextActionInterface,
    ResetSearchResultActionInterface,
    SearchActionsType,
    SetRecentSearchResultActionInterface,
    SetSearchLoadingStateActionInterface,
    SetSearchResultActionInterface
} from "./contracts/actionTypes";
import { DeleteRecentSearchPayload, SearchState, SearchTermsRequest } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setSearchResult = (payload: SearchState["searchResult"]): SetSearchResultActionInterface => ({
    type: SearchActionsType.SET_SEARCH_RESULT,
    payload
});

export const fetchSearchByText = (payload: string): FetchSearchByTextActionInterface => ({
    type: SearchActionsType.FETCH_SEARCH_BY_TEXT,
    payload
});

export const setRecentSearchResult = (payload: SearchState["recentSearchResult"]): SetRecentSearchResultActionInterface => ({
    type: SearchActionsType.SET_RECENT_SEARCH_RESULT,
    payload
});

export const fetchRecentSearchResult = (payload: SearchTermsRequest): FetchRecentSearchResultActionInterface => ({
    type: SearchActionsType.FETCH_RECENT_SEARCH_RESULT,
    payload
});

export const deleteRecentSearchResult = (payload: DeleteRecentSearchPayload): DeleteRecentSearchResultActionInterface => ({
    type: SearchActionsType.DELETE_RECENT_SEARCH_RESULT,
    payload
});

export const resetSearchResult = (): ResetSearchResultActionInterface => ({
    type: SearchActionsType.RESET_SEARCH_RESULT
});

export const setSearchLoadingState = (payload: LoadingStatus): SetSearchLoadingStateActionInterface => ({
    type: SearchActionsType.SET_SEARCH_LOADING_STATE,
    payload
});
