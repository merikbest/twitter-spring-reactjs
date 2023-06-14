import { AxiosResponse } from "axios";

import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { fetchGifs, setGifs, setLoadingGifsState } from "../actionCreators";
import { addTweetFormSaga, fetchGifsRequest } from "../sagas";
import { mockGiphyData } from "../../../../util/test-utils/mock-test-data";
import { GiphyDataProps } from "../../../../types/tweet";
import { ExternalApi } from "../../../../services/api/tweet-service/externalApi";
import { AddTweetFormTypes } from "../constants/actionTypes";

describe("addTweetFormSaga:", () => {
    describe("fetchGifsRequest:", () => {
        const mockGiphyDataProps = {
            data: { data: mockGiphyData },
        } as AxiosResponse<{ data: GiphyDataProps[] }>;
        const worker = fetchGifsRequest(fetchGifs("test"));
        testLoadingStatus(worker, setLoadingGifsState, LoadingStatus.LOADING);
        testCall(worker, ExternalApi.searchGif, "test");
        testSetResponse(worker, mockGiphyDataProps, setGifs, mockGiphyDataProps.data.data, "GiphyDataProps");
        testLoadingStatus(worker, setLoadingGifsState, LoadingStatus.LOADED);
        testLoadingStatus(worker, setLoadingGifsState, LoadingStatus.ERROR);
    });

    testWatchSaga(addTweetFormSaga, [
        { actionType: AddTweetFormTypes.FETCH_GIFS, workSaga: fetchGifsRequest },
    ]);
});
