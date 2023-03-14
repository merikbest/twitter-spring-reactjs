import { CancelTokenSource } from "axios";
import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

export interface ListDetailState {
    item?: BaseListResponse;
    loadingState: LoadingStatus;
}


export interface ListDetailsRequest {
    listId: number,
    cancelTokenSource: CancelTokenSource
}
