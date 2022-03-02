import {LoadingStatus} from "../../../types";
import {UserDetailResponse} from "../../../types/user";

export interface UserDetailState {
    item?: UserDetailResponse;
    loadingState: LoadingStatus;
}
