import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export interface UsersSearchState {
    users: User[];
    loadingState: LoadingStatus;
}
