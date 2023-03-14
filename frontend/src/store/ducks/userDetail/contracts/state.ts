import { CancelTokenSource } from "axios";
import { UserDetailResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

export interface UserDetailState {
    item?: UserDetailResponse;
    loadingState: LoadingStatus;
}

export interface UserDetailsRequest {
    userId: number,
    cancelTokenSource: CancelTokenSource
}
