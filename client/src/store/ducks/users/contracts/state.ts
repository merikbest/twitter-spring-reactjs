import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export interface UsersState {
    users: UserResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
