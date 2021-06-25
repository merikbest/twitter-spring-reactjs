import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export interface UsersState {
    user: User | undefined;
    users: User[];
    loadingState: LoadingStatus;
}
