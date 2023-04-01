import { AxiosResponse } from "axios";

import { testCall, testLoadingStatus, testSetResponse } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { fetchRecentSearchResultRequest, fetchSearchByTextRequest } from "../sagas";
import {
    fetchRecentSearchResult,
    fetchSearchByText,
    setRecentSearchResult,
    setSearchLoadingState,
    setSearchResult
} from "../actionCreators";
import { UserApi } from "../../../../services/api/user-service/userApi";
import { CommonUserResponse, SearchResultResponse } from "../../../../types/user";
import { SearchTermsRequest } from "../contracts/state";

describe("searchSaga:", () => {

    describe("fetchSearchByTextRequest:", () => {
        const mockSearchResult = { data: { text: "test" } } as AxiosResponse<SearchResultResponse>;
        const worker = fetchSearchByTextRequest(fetchSearchByText("test"));
        testLoadingStatus(worker, setSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.searchByText, "test");
        testSetResponse(worker, mockSearchResult, setSearchResult, mockSearchResult.data, "SearchResultResponse");
        testLoadingStatus(worker, setSearchLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchRecentSearchResultRequest:", () => {
        const mockCommonUser = { data: [{ id: 1 }, { id: 2 }] as CommonUserResponse[] } as AxiosResponse<CommonUserResponse[]>;
        const searchTermsRequest = { users: [1, 2] } as SearchTermsRequest;
        const worker = fetchRecentSearchResultRequest(fetchRecentSearchResult(searchTermsRequest));
        testLoadingStatus(worker, setSearchLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getSearchResults, searchTermsRequest);
        testSetResponse(worker, mockCommonUser, setRecentSearchResult, {
            text: [],
            tags: [],
            users: mockCommonUser.data
        }, "RecentSearchResult");
        testLoadingStatus(worker, setSearchLoadingState, LoadingStatus.ERROR);
    });
});
