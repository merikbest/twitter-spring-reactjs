import { testAction } from "../../../../util/test-utils/test-helper";
import {
    deleteRecentSearchResult,
    fetchRecentSearchResult,
    fetchSearchByText,
    resetSearchResult,
    setRecentSearchResult,
    setSearchLoadingState,
    setSearchResult
} from "../actionCreators";
import { SearchResultResponse } from "../../../../types/user";
import { SearchActionsType } from "../contracts/actionTypes";
import { DeleteRecentSearchPayload, RecentSearchResult, SearchTermsRequest } from "../contracts/state";
import { LoadingStatus } from "../../../../types/common";

describe("search actions", () => {
    testAction(setSearchResult, setSearchResult({ text: "test" } as SearchResultResponse), {
        type: SearchActionsType.SET_SEARCH_RESULT,
        payload: { text: "test" } as SearchResultResponse
    });

    testAction(fetchSearchByText, fetchSearchByText("test"), {
        type: SearchActionsType.FETCH_SEARCH_BY_TEXT,
        payload: "test"
    });

    testAction(setRecentSearchResult, setRecentSearchResult({ text: ["test"] } as RecentSearchResult), {
        type: SearchActionsType.SET_RECENT_SEARCH_RESULT,
        payload: { text: ["test"] } as RecentSearchResult
    });

    testAction(fetchRecentSearchResult, fetchRecentSearchResult({ text: ["test"] } as SearchTermsRequest), {
        type: SearchActionsType.FETCH_RECENT_SEARCH_RESULT,
        payload: { text: ["test"] } as SearchTermsRequest
    });

    testAction(deleteRecentSearchResult, deleteRecentSearchResult({ item: "test" } as DeleteRecentSearchPayload), {
        type: SearchActionsType.DELETE_RECENT_SEARCH_RESULT,
        payload: { item: "test" } as DeleteRecentSearchPayload
    });

    testAction(resetSearchResult, resetSearchResult(), {
        type: SearchActionsType.RESET_SEARCH_RESULT
    });

    testAction(setSearchLoadingState, setSearchLoadingState(LoadingStatus.LOADED), {
        type: SearchActionsType.SET_SEARCH_LOADING_STATE,
        payload: LoadingStatus.LOADED
    });
});
