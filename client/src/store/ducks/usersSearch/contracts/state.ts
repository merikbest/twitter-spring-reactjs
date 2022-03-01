import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export interface UsersSearchState {
    users: UserResponse[];
    followers: UserResponse[];
    loadingState: LoadingStatus;
}
