import {CancelTokenSource} from "axios";
import {LoadingStatus} from "../../../types";
import {UserDetailResponse} from "../../../types/user";

export interface UserDetailState {
    item?: UserDetailResponse;
    loadingState: LoadingStatus;
}

export interface UserDetailsRequest {
    userId: number,
    cancelTokenSource: CancelTokenSource
}
