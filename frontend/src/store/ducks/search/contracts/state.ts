import { LoadingStatus } from "../../../../types/common";
import { SearchResultResponse } from "../../../../types/user";

export interface SearchState {
    searchResult?: SearchResultResponse;
    searchLoadingState: LoadingStatus;
}
