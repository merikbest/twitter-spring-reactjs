import React from "react";
import {call, put, takeLatest} from "redux-saga/effects";
import {LoadingStatus} from "../store/types";

// @ts-ignore
export const testAction = (action, payload, expectedPayload) => {
    describe(`${action.name}`, () => {
        Object.keys(expectedPayload).forEach((key) => {
            it(`should return a payload ${key}`, () => {
                expect(payload[key]).toEqual(expectedPayload[key]);
            });
        });

        it("should have all tested payload properties", () => {
            expect(Object.keys(payload).length).toBe(Object.keys(expectedPayload).length);
        });

        it("should not return undefined", () => {
            expect(payload.type).not.toBe(undefined);
        });
    });
};

// @ts-ignore
export const testActionDispatch = (actionType, actualState, expectedState) => {
    describe(`${actionType} action is dispatched`, () => {
        it("should return the expected state", () => {
            expect(actualState).toEqual(expectedState);
        });
    });
};

// @ts-ignore
export const testLoadingStatus = (worker, loadingAction, loadingStatus) => {
    it(`should yield put ${loadingAction.name} with ${loadingStatus}`, () => {
        let actualYield;
        
        if (loadingStatus === LoadingStatus.ERROR) {
            actualYield = worker.throw("ERROR").value;
        } else {
            actualYield = worker.next().value;
        }
        const expectedYield = put(loadingAction(loadingStatus));

        expect(actualYield).toEqual(expectedYield);
    })
};

// @ts-ignore
export const testCall = (worker, apiCall, payload?, data = {}) => {
    it(`should call ${apiCall.name}`, () => {
        const actualYield = worker.next(data).value;
        let expectedYield;
        
        if (payload !== undefined) {
            expectedYield = call(apiCall, payload);
        } else {
            expectedYield = call(apiCall);
        }

        expect(actualYield).toEqual(expectedYield);
    })
};

// @ts-ignore
export const testSetResponse = (worker, mockData = {}, action, payload: {}, responseType) => {
    it(`should yield put ${action.name} with ${responseType} type`, () => {
        const actualYield = worker.next(mockData).value;
        const expectedYield = put(action(payload));

        expect(actualYield).toEqual(expectedYield);
    });
};

// @ts-ignore
export const testWatchSaga = (watchSaga, requests, effect = takeLatest) => {
    describe(`watch ${watchSaga.name}:`, () => {
        const watcher = watchSaga();
        
        // @ts-ignore
        requests.forEach((request) => {
            it(`should listen to ${request.actionType} and yield ${request.workSaga.name}`, () => {
                const actualYield = watcher.next().value;
                const expectedYield = effect(request.actionType, request.workSaga);

                expect(actualYield).toEqual(expectedYield);
            });
        })
    });
};
