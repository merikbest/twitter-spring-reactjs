import { AxiosResponse } from "axios";
import { call, takeEvery } from "redux-saga/effects";

import {
    deleteListRequest,
    editListRequest,
    fetchListByIdRequest,
    fetchTweetsByListIdRequest,
    listSaga
} from "../sagas";
import {
    deleteList,
    editList,
    fetchListById,
    fetchTweetsByListId,
    setList,
    setListLoadingState,
    setListTweets,
    setTweetsLoadingState
} from "../actionCreators";
import {
    mockExpectedResponse,
    testCall,
    testLoadingStatus,
    testSetResponse,
    testWatchSaga
} from "../../../../util/test-utils/test-helper";
import { ListsApi } from "../../../../services/api/lists-service/listsApi";
import { BaseListResponse } from "../../../../types/lists";
import { EditListsRequest } from "../contracts/state";
import { ListActionType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";
import { TweetResponse } from "../../../../types/tweet";

describe("listSaga:", () => {
    const mockBaseListResponse = { data: { id: 1 } } as AxiosResponse<BaseListResponse>;

    describe("fetchListByIdRequest:", () => {
        const worker = fetchListByIdRequest(fetchListById(1));
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getListById, 1);
        testSetResponse(worker, mockBaseListResponse, setList, mockBaseListResponse.data, "BaseListResponse");
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.ERROR);
    });

    describe("fetchTweetsByListIdRequest:", () => {
        const mockPageableTweets = {
            data: [{ id: 1 }, { id: 2 }] as TweetResponse[],
            headers: { PAGE_TOTAL_COUNT: 1 }
        } as AxiosResponse<TweetResponse[]>;
        const worker = fetchTweetsByListIdRequest(fetchTweetsByListId({ listId: 1, pageNumber: 1 }));
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.LOADING);
        it("should call getTweetsByListId", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(ListsApi.getTweetsByListId, 1, 1);

            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockPageableTweets, setListTweets, mockExpectedResponse(mockPageableTweets), "TweetResponse");
        testLoadingStatus(worker, setTweetsLoadingState, LoadingStatus.ERROR);
    });

    describe("deleteListRequest:", () => {
        const worker = deleteListRequest(deleteList(1));
        testCall(worker, ListsApi.deleteList, 1);
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.ERROR);
    });

    describe("editListRequest:", () => {
        const mockEditListsRequest = { id: 1, listName: "text" } as EditListsRequest;
        const worker = editListRequest(editList(mockEditListsRequest));
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.editList, mockEditListsRequest);
        testSetResponse(worker, mockBaseListResponse, setList, mockBaseListResponse.data, "BaseListResponse");
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(listSaga, [
        { actionType: ListActionType.FETCH_LIST_BY_ID, workSaga: fetchListByIdRequest },
        { actionType: ListActionType.FETCH_TWEETS_BY_LIST_ID, workSaga: fetchTweetsByListIdRequest },
        { actionType: ListActionType.DELETE_LIST, workSaga: deleteListRequest },
        { actionType: ListActionType.EDIT_LIST, workSaga: editListRequest }
    ], takeEvery);
});
