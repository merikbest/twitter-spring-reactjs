import { LoadingStatus } from "../../../../types/common";
import { CommonUserResponse, SearchResultResponse } from "../../../../types/user";

export interface SearchState {
    searchResult?: SearchResultResponse;
    recentSearchResult: CommonUserResponse[];
    searchLoadingState: LoadingStatus;
}


export interface SearchTermsRequest {
    users: number[];
    tags: string[];
    text: string[];
}
