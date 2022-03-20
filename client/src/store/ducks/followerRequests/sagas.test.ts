import {acceptFollowRequests, declineFollowRequests, fetchFollowerRequests, fetchFollowerSaga} from "./sagas";
import {
    acceptFollowRequest,
    declineFollowRequest,
    processFollowRequest,
    setFollowerRequests,
    setFollowerRequestsLoadingState
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {UserApi} from "../../../services/api/userApi";
import {FollowerUserResponse} from "../../types/user";
import {setFollowersSize, setUserLoadingStatus} from "../user/actionCreators";
import {FollowerRequestsActionsType} from "./contracts/actionTypes";

describe("fetchFollowerSaga:", () => {
    
    describe("fetchFollowerRequests:", () => {
        const mockFollowerUserResponse = [{id: 1}, {id: 2}] as FollowerUserResponse[];
        const worker = fetchFollowerRequests();

        testLoadingStatus(worker, setFollowerRequestsLoadingState, LoadingStatus.LOADING);
        testCall(worker, UserApi.getFollowerRequests);
        testSetResponse(worker, mockFollowerUserResponse, setFollowerRequests, mockFollowerUserResponse, "FollowerUserResponse");
        testLoadingStatus(worker, setFollowerRequestsLoadingState, LoadingStatus.ERROR)
    });

    describe("acceptFollowRequest:", () => {
        const worker = acceptFollowRequests(acceptFollowRequest(1));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.acceptFollowRequest, 1);
        testSetResponse(worker, {}, setFollowersSize, {}, "void");
        testSetResponse(worker, {}, processFollowRequest, 1, "void");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR)
    });

    describe("declineFollowRequest:", () => {
        const worker = declineFollowRequests(declineFollowRequest(1));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.declineFollowRequest, 1);
        testSetResponse(worker, {}, processFollowRequest, 1, "void");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR)
    });

    testWatchSaga(fetchFollowerSaga, [
        {actionType: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS, workSaga: fetchFollowerRequests},
        {actionType: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST, workSaga: acceptFollowRequests},
        {actionType: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST, workSaga: declineFollowRequests},
    ]);
});
