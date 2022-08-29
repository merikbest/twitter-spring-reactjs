import {CancelTokenSource} from "axios";
import {LoadingStatus} from "../../../types";
import {BaseListResponse} from "../../../types/lists";

export interface ListDetailState {
    item?: BaseListResponse;
    loadingState: LoadingStatus;
}


export interface ListDetailsRequest {
    listId: number,
    cancelTokenSource: CancelTokenSource
}
