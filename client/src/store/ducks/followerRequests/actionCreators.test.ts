import {testAction} from "../../../util/testHelper";
import {
    acceptFollowRequest,
    declineFollowRequest,
    fetchFollowerRequests,
    processFollowRequest,
    resetFollowerRequestsState,
    setFollowerRequests,
    setFollowerRequestsLoadingState
} from "./actionCreators";
import {FollowerRequestsActionsType} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {FollowerUserResponse} from "../../types/user";

describe("followRequests actions", () => {
    testAction(setFollowerRequests, setFollowerRequests([{id: 1}] as FollowerUserResponse[]), {
        type: FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
        payload: [{id: 1}] as FollowerUserResponse[]
    });

    testAction(fetchFollowerRequests, fetchFollowerRequests(), {
        type: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS,
    });

    testAction(acceptFollowRequest, acceptFollowRequest(1), {
        type: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST,
        payload: 1
    });

    testAction(declineFollowRequest, declineFollowRequest(1), {
        type: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST,
        payload: 1
    });

    testAction(processFollowRequest, processFollowRequest(1), {
        type: FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST,
        payload: 1
    });

    testAction(setFollowerRequestsLoadingState, setFollowerRequestsLoadingState(LoadingStatus.LOADING), {
        type: FollowerRequestsActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(resetFollowerRequestsState, resetFollowerRequestsState(), {
        type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE
    });
});
