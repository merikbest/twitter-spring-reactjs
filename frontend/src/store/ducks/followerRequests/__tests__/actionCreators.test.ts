import { testAction } from "../../../../util/test-utils/test-helper";
import {
    acceptFollowRequest,
    declineFollowRequest,
    fetchFollowerRequests,
    processFollowRequest,
    resetFollowerRequestsState,
    setFollowerRequests,
    setFollowerRequestsLoadingState
} from "../actionCreators";
import { FollowerRequestsActionsType } from "../contracts/actionTypes";
import { FollowerUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

describe("followRequests actions", () => {
    testAction(setFollowerRequests, setFollowerRequests({
        items: [{ id: 1 }] as FollowerUserResponse[],
        pagesCount: 1
    }), {
        type: FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS,
        payload: { items: [{ id: 1 }] as FollowerUserResponse[], pagesCount: 1 }
    });

    testAction(fetchFollowerRequests, fetchFollowerRequests(1), {
        type: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS,
        payload: 1
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
