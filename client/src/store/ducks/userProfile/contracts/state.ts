import {LoadingStatus} from "../../../types";
import {UserProfileResponse} from "../../../types/user";

export interface UserProfileState {
    user: UserProfileResponse | undefined;
    loadingState: LoadingStatus;
}
