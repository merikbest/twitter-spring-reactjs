import axios from "axios";
import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchListDetail,
    resetListDetailState,
    setListDetail,
    setListDetailLoadingState,
    updateFollowListDetail
} from "../actionCreators";
import { ListDetailActionsType } from "../contracts/actionTypes";
import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

describe("listDetail actions", () => {
    const cancelTokenSource = axios.CancelToken.source();

    testAction(setListDetail, setListDetail({ id: 1 } as BaseListResponse), {
        type: ListDetailActionsType.SET_LIST_DETAIL,
        payload: { id: 1 } as BaseListResponse
    });

    testAction(fetchListDetail, fetchListDetail({ listId: 1, cancelTokenSource: cancelTokenSource }), {
        type: ListDetailActionsType.FETCH_LIST_DETAIL,
        payload: { listId: 1, cancelTokenSource: cancelTokenSource }
    });

    testAction(updateFollowListDetail, updateFollowListDetail(true), {
        type: ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL,
        payload: true
    });

    testAction(resetListDetailState, resetListDetailState(), {
        type: ListDetailActionsType.RESET_LIST_DETAIL_STATE
    });

    testAction(setListDetailLoadingState, setListDetailLoadingState(LoadingStatus.LOADING), {
        type: ListDetailActionsType.SET_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });
});
