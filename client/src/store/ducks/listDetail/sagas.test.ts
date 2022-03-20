import axios from "axios";
import {call} from "redux-saga/effects";

import {fetchListDetailRequest, listDetailSaga} from "./sagas";
import {fetchListDetail, setListDetail, setListDetailLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {ListsApi} from "../../../services/api/listsApi";
import {BaseListResponse} from "../../types/lists";
import {ListDetailActionsType} from "./contracts/actionTypes";

describe("listDetailSaga:", () => {
    const mockBaseListResponse = {id: 1} as BaseListResponse;
    
    describe("fetchListDetailRequest:", () => {
        const cancelTokenSource = axios.CancelToken.source();
        const worker = fetchListDetailRequest(fetchListDetail({listId: 1, cancelTokenSource: cancelTokenSource}));

        testLoadingStatus(worker, setListDetailLoadingState, LoadingStatus.LOADING);

        it("should call getListDetails", () => {
            const actualYield = worker.next().value;
            const expectedYield = call(ListsApi.getListDetails, 1, cancelTokenSource);

            expect(actualYield).toEqual(expectedYield);
        });
        testSetResponse(worker, mockBaseListResponse, setListDetail, mockBaseListResponse, "BaseListResponse");
        testLoadingStatus(worker, setListDetailLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(listDetailSaga, [
        {actionType: ListDetailActionsType.FETCH_LIST_DETAIL, workSaga: fetchListDetailRequest},
    ]);
});
