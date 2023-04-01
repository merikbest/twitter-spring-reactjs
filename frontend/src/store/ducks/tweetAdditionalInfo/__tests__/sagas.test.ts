import { AxiosResponse } from "axios";

import { testCall, testLoadingStatus, testSetResponse } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import {
    fetchIsTweetBookmarkedAdditionalInfo,
    fetchTweetAdditionalInfo,
    setIsTweetBookmarkedAdditionalInfo,
    setTweetAdditionalInfo,
    setTweetAdditionalInfoLoadingState
} from "../actionCreators";
import { fetchIsTweetBookmarkedAdditionalInfoRequest, fetchTweetAdditionalInfoRequest } from "../saga";
import { mockUserTweetAdditionalInfo } from "../../../../util/test-utils/mock-test-data";
import { TweetAdditionalInfoResponse } from "../../../../types/tweet";
import { BookmarkApi } from "../../../../services/api/tweet-service/bookmarkApi";
import { TweetApi } from "../../../../services/api/tweet-service/tweetApi";

describe("tweetAdditionalInfoSaga:", () => {
    describe("fetchTweetAdditionalInfoRequest:", () => {
        const worker = fetchTweetAdditionalInfoRequest(fetchTweetAdditionalInfo(1));
        const mockResponse = { data: mockUserTweetAdditionalInfo } as AxiosResponse<TweetAdditionalInfoResponse>;
        testLoadingStatus(worker, setTweetAdditionalInfoLoadingState, LoadingStatus.LOADING);
        testCall(worker, TweetApi.getTweetAdditionalInfoById, 1, mockUserTweetAdditionalInfo);
        testSetResponse(worker, mockResponse, setTweetAdditionalInfo, mockResponse.data, "TweetAdditionalInfoResponse");
        testLoadingStatus(worker, setTweetAdditionalInfoLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchIsTweetBookmarkedAdditionalInfoRequest:", () => {
        const worker = fetchIsTweetBookmarkedAdditionalInfoRequest(fetchIsTweetBookmarkedAdditionalInfo(1));
        const mockResponse = { data: true } as AxiosResponse<boolean>;
        testLoadingStatus(worker, setTweetAdditionalInfoLoadingState, LoadingStatus.LOADING);
        testCall(worker, BookmarkApi.getIsTweetBookmarked, 1, mockUserTweetAdditionalInfo);
        testSetResponse(worker, mockResponse, setIsTweetBookmarkedAdditionalInfo, mockResponse.data, "TweetAdditionalInfoResponse");
        testLoadingStatus(worker, setTweetAdditionalInfoLoadingState, LoadingStatus.ERROR);
    });
});
