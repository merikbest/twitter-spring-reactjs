import { AxiosResponse } from "axios";
import { takeEvery } from "redux-saga/effects";

import { deleteListRequest, editListRequest, fetchListByIdRequest, listSaga } from "../sagas";
import { deleteList, editList, fetchListById, setList, setListLoadingState } from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { ListsApi } from "../../../../services/api/lists-service/listsApi";
import { BaseListResponse } from "../../../../types/lists";
import { EditListsRequest } from "../contracts/state";
import { ListActionType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("listSaga:", () => {
    const mockBaseListResponse = { data: { id: 1 } } as AxiosResponse<BaseListResponse>;

    describe("fetchListByIdRequest:", () => {
        const worker = fetchListByIdRequest(fetchListById(1));
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.getListById, 1);
        testSetResponse(worker, mockBaseListResponse, setList, mockBaseListResponse.data, "BaseListResponse");
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.ERROR);
    });

    describe("deleteListRequest:", () => {
        const worker = deleteListRequest(deleteList(1));
        testCall(worker, ListsApi.deleteList, 1);
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.ERROR);
    });

    describe("editListRequest:", () => {
        const mockEditListsRequest = { id: 1, name: "text" } as EditListsRequest;
        const worker = editListRequest(editList(mockEditListsRequest));
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.LOADING);
        testCall(worker, ListsApi.editList, mockEditListsRequest);
        testSetResponse(worker, mockBaseListResponse, setList, mockBaseListResponse.data, "BaseListResponse");
        testLoadingStatus(worker, setListLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(listSaga, [
        { actionType: ListActionType.FETCH_LIST_BY_ID, workSaga: fetchListByIdRequest },
        { actionType: ListActionType.DELETE_LIST, workSaga: deleteListRequest },
        { actionType: ListActionType.EDIT_LIST, workSaga: editListRequest }
    ], takeEvery);
});
