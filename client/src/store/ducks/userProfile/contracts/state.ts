import {LoadingStatus} from "../../../types";
import {UserProfileResponse} from "../../../types/user";
import {TweetImageResponse} from "../../../types/tweet";

export interface UserProfileState {
    user: UserProfileResponse | undefined;
    images: TweetImageResponse[];
    imagesLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
}
