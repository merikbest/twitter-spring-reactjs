import { initialRecentSearchResult, initialSearchState, searchReducer } from "../reducer";
import { SearchActions, SearchActionsType } from "../contracts/actionTypes";
import { testActionDispatch } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { CommonUserResponse, SearchResultResponse } from "../../../../types/user";
import { DeleteRecentSearchPayload, RecentSearchResult } from "../contracts/state";

describe("searchReducer:", () => {

    describe("initial state:", () => {
        it("should return initial state", () => {
            expect(searchReducer(undefined, {} as SearchActions)).toEqual(initialSearchState);
        });
    });

    describe("search handlers:", () => {
        testActionDispatch(
            SearchActionsType.SET_SEARCH_RESULT,
            searchReducer(initialSearchState, {
                type: SearchActionsType.SET_SEARCH_RESULT,
                payload: { text: "test" } as SearchResultResponse
            }),
            {
                ...initialSearchState,
                searchResult: { text: "test" } as SearchResultResponse,
                searchLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            SearchActionsType.SET_RECENT_SEARCH_RESULT,
            searchReducer(initialSearchState, {
                type: SearchActionsType.SET_RECENT_SEARCH_RESULT,
                payload: { text: ["test"] } as RecentSearchResult
            }),
            {
                ...initialSearchState,
                recentSearchResult: { text: ["test"] } as RecentSearchResult,
                searchLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            SearchActionsType.SET_RECENT_SEARCH_RESULT,
            searchReducer(initialSearchState, {
                type: SearchActionsType.SET_RECENT_SEARCH_RESULT,
                payload: { text: ["test"] } as RecentSearchResult
            }),
            {
                ...initialSearchState,
                recentSearchResult: { text: ["test"] } as RecentSearchResult,
                searchLoadingState: LoadingStatus.LOADED
            }
        );

        testActionDispatch(
            SearchActionsType.DELETE_RECENT_SEARCH_RESULT + "(users)",
            searchReducer({
                ...initialSearchState,
                recentSearchResult: { ...initialRecentSearchResult, users: [{id: 1}, {id: 2} ] as CommonUserResponse[] }
            }, {
                type: SearchActionsType.DELETE_RECENT_SEARCH_RESULT,
                payload: { stateItem: "users", item: 1 } as DeleteRecentSearchPayload
            }),
            {
                ...initialSearchState,
                recentSearchResult: { ...initialRecentSearchResult, users: [{id: 2} ] as CommonUserResponse[] },
            }
        );

        testActionDispatch(
            SearchActionsType.DELETE_RECENT_SEARCH_RESULT + "(text)",
            searchReducer({
                ...initialSearchState,
                recentSearchResult: { ...initialRecentSearchResult, text: ["test", "test2"] }
            }, {
                type: SearchActionsType.DELETE_RECENT_SEARCH_RESULT,
                payload: { stateItem: "text", item: "test" } as DeleteRecentSearchPayload
            }),
            {
                ...initialSearchState,
                recentSearchResult: { ...initialRecentSearchResult, text: ["test2"] },
            }
        );

        testActionDispatch(
            SearchActionsType.RESET_SEARCH_RESULT,
            searchReducer({
                ...initialSearchState,
                recentSearchResult: { ...initialRecentSearchResult, text: ["test", "test2"] },
                searchLoadingState: LoadingStatus.SUCCESS
            }, {
                type: SearchActionsType.RESET_SEARCH_RESULT,
            }),
            {
                ...initialSearchState,
                recentSearchResult: initialRecentSearchResult,
                searchLoadingState: LoadingStatus.LOADING
            }
        );

        testActionDispatch(
            SearchActionsType.SET_SEARCH_LOADING_STATE,
            searchReducer({ ...initialSearchState, searchLoadingState: LoadingStatus.SUCCESS }, {
                type: SearchActionsType.SET_SEARCH_LOADING_STATE,
                payload: LoadingStatus.LOADED
            }),
            {
                ...initialSearchState,
                searchLoadingState: LoadingStatus.LOADED
            }
        );
    });
});

