import { LoadingStatus } from "../../../../types/common";
import { CommonUserResponse, SearchResultResponse } from "../../../../types/user";

export interface SearchState {
    searchResult?: SearchResultResponse;
    recentSearchResult?: RecentSearchResult;
    searchLoadingState: LoadingStatus;
}


export interface RecentSearchResult {
    users: CommonUserResponse[];
    tags: string[];
    text: string[];
}

export interface DeleteRecentSearchPayload {
    stateItem: "text" | "tags" | "users",
    item: string | number
}

export interface SearchTermsRequest {
    users: number[];
    tags: string[];
    text: string[];
}
