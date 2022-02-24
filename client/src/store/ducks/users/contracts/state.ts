import {LoadingStatus} from "../../../types";
import {BaseUserResponse} from "../../../types/user";

export interface UsersState {
    users: BaseUserResponse[];
    loadingState: LoadingStatus;
}
