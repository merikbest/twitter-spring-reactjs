import {fetchTagsRequest, fetchTrendsRequest, tagsSaga} from "./sagas";
import {TagApi} from "../../../services/api/tagApi";
import {setTags, setTagsLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {TagResponse} from "../../types/tag";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {TagsActionsType} from "./contracts/actionTypes";

describe("tagsSaga:", () => {
    const mockTags = [{id: 1}, {id: 2}] as TagResponse[];

    describe("fetchTagsRequest:", () => {
        const worker = fetchTagsRequest();

        testLoadingStatus(worker, setTagsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TagApi.fetchTags);
        testSetResponse(worker, mockTags, setTags, mockTags, "TagResponse");
        testLoadingStatus(worker, setTagsLoadingState, LoadingStatus.ERROR)
    });

    describe("fetchTrendsRequest", () => {
        const worker = fetchTrendsRequest();

        testLoadingStatus(worker, setTagsLoadingState, LoadingStatus.LOADING);
        testCall(worker, TagApi.fetchTrends);
        testSetResponse(worker, mockTags, setTags, mockTags, "TagResponse");
        testLoadingStatus(worker, setTagsLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(tagsSaga, [
        {actionType: TagsActionsType.FETCH_TAGS, workSaga: fetchTagsRequest},
        {actionType: TagsActionsType.FETCH_TRENDS, workSaga: fetchTrendsRequest},
    ]);
});
