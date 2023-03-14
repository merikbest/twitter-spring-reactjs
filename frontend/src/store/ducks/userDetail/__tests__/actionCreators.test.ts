import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchUserDetail,
    resetUserDetailState,
    setBlockUserDetail,
    setFollowRequestToUserDetail,
    setFollowToUserDetail,
    setUserDetail,
    setUserDetailLoadingState
} from "../actionCreators";
import { UserDetailActionsType } from "../contracts/actionTypes";
import { UserDetailResponse } from "../../../../types/user";
import axios from "axios";
import { LoadingStatus } from "../../../../types/common";

describe("userDetail actions", () => {
    const cancelTokenSource = axios.CancelToken.source();

    testAction(setUserDetail, setUserDetail({ id: 1 } as UserDetailResponse), {
        type: UserDetailActionsType.SET_USER_DETAIL,
        payload: { id: 1 } as UserDetailResponse
    });

    testAction(setFollowToUserDetail, setFollowToUserDetail(true), {
        type: UserDetailActionsType.SET_FOLLOW_TO_USER_DETAIL,
        payload: true
    });

    testAction(setBlockUserDetail, setBlockUserDetail(true), {
        type: UserDetailActionsType.SET_BLOCK_USER_DETAIL,
        payload: true
    });

    testAction(setFollowRequestToUserDetail, setFollowRequestToUserDetail(true), {
        type: UserDetailActionsType.SET_FOLLOW_REQUEST_TO_USER_DETAIL,
        payload: true
    });

    testAction(fetchUserDetail, fetchUserDetail({ userId: 1, cancelTokenSource: cancelTokenSource }), {
        type: UserDetailActionsType.FETCH_USER_DETAIL,
        payload: { userId: 1, cancelTokenSource: cancelTokenSource }
    });

    testAction(resetUserDetailState, resetUserDetailState(), {
        type: UserDetailActionsType.RESET_USER_DETAIL_STATE
    });

    testAction(setUserDetailLoadingState, setUserDetailLoadingState(LoadingStatus.LOADING), {
        type: UserDetailActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
