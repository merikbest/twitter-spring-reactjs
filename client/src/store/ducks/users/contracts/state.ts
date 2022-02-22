import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";
import {BaseUserResponse} from "../../../types/user";

export interface UsersState {
    users: BaseUserResponse[];
    loadingState: LoadingStatus;
}
