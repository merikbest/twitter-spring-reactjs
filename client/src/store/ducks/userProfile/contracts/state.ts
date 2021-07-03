import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export interface UserProfileState {
    user: User | undefined;
    loadingState: LoadingStatus;
}
