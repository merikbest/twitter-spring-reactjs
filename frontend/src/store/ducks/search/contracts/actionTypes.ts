import { Action } from "redux";

import { DeleteRecentSearchPayload, SearchState, SearchTermsRequest } from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum SearchActionsType {
    SET_SEARCH_RESULT = "search/SET_SEARCH_RESULT",
    FETCH_SEARCH_BY_TEXT = "search/FETCH_SEARCH_BY_TEXT",
    SET_RECENT_SEARCH_RESULT = "search/SET_RECENT_SEARCH_RESULT",
    FETCH_RECENT_SEARCH_RESULT = "search/FETCH_RECENT_SEARCH_RESULT",
    DELETE_RECENT_SEARCH_RESULT = "search/DELETE_RECENT_SEARCH_RESULT",
    RESET_SEARCH_RESULT = "search/RESET_SEARCH_RESULT",
    SET_SEARCH_LOADING_STATE = "search/SET_SEARCH_LOADING_STATE",
}

export interface SetSearchResultActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.SET_SEARCH_RESULT;
    payload: SearchState["searchResult"];
}

export interface FetchSearchByTextActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.FETCH_SEARCH_BY_TEXT;
    payload: string;
}

export interface SetRecentSearchResultActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.SET_RECENT_SEARCH_RESULT;
    payload: SearchState["recentSearchResult"];
}

export interface FetchRecentSearchResultActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.FETCH_RECENT_SEARCH_RESULT;
    payload: SearchTermsRequest;
}

export interface DeleteRecentSearchResultActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.DELETE_RECENT_SEARCH_RESULT;
    payload: DeleteRecentSearchPayload;
}

export interface ResetSearchResultActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.RESET_SEARCH_RESULT;
}

export interface SetSearchLoadingStateActionInterface extends Action<SearchActionsType> {
    type: SearchActionsType.SET_SEARCH_LOADING_STATE;
    payload: LoadingStatus;
}

export type SearchActions =
    | SetSearchResultActionInterface
    | SetRecentSearchResultActionInterface
    | DeleteRecentSearchResultActionInterface
    | ResetSearchResultActionInterface
    | SetSearchLoadingStateActionInterface;
