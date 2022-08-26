import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export interface UsersState {
    users: Array<UserResponse>;
    pagesCount: number;
    loadingState: LoadingStatus;
}
