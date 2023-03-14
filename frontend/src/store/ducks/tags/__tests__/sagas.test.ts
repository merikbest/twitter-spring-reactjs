import { AxiosResponse } from "axios";

import { fetchTagsRequest, fetchTrendsRequest, tagsSaga } from "../sagas";
import { TagApi } from "../../../../services/api/tagApi";
import { fetchTrends, setTags, setTagsLoadingState, setTrends, setTrendsLoadingState } from "../actionCreators";
import { TagResponse } from "../../../../types/tag";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/test-utils/test-helper";
import { TagsActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../../constants/common-constants";

describe("tagsSaga:", () => {
    const mockTags = {
        data: [{ id: 1 }, { id: 2 }],
        headers: { PAGE_TOTAL_COUNT: 1 }
    } as AxiosResponse<TagResponse[]>;

    describe("fetchTagsRequest:", () => {
        const worker = fetchTagsRequest();

        testLoadingStatus(worker, setTagsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TagApi.fetchTags);
        testSetResponse(worker, mockTags, setTags, mockTags.data, "TagResponse");
        testLoadingStatus(worker, setTagsLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTrendsRequest", () => {
        const worker = fetchTrendsRequest(fetchTrends(1));

        testLoadingStatus(worker, setTrendsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TagApi.fetchTrends, 1);
        testSetResponse(worker, mockTags, setTrends, mockExpectedResponse(mockTags), "TagResponse");
        testLoadingStatus(worker, setTrendsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(tagsSaga, [
        { actionType: TagsActionsType.FETCH_TAGS, workSaga: fetchTagsRequest },
        { actionType: TagsActionsType.FETCH_TRENDS, workSaga: fetchTrendsRequest }
    ]);
});
