import {LoadingStatus} from "../../../types";
import {BaseListResponse} from "../../../types/lists";

export interface ListDetailState {
    item?: BaseListResponse;
    loadingState: LoadingStatus;
}
