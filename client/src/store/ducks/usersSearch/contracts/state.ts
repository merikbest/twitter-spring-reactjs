import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export interface UsersSearchState {
    users: UserResponse[];
    pagesCount: number;
    followers: UserResponse[];
    loadingState: LoadingStatus;
}
