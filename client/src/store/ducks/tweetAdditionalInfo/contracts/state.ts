import {LoadingStatus} from "../../../types";
import {TweetAdditionalInfoResponse} from "../../../types/tweet";

export interface TweetAdditionalInfoState {
    tweetAdditionalInfo?: TweetAdditionalInfoResponse;
    isTweetBookmarked: boolean;
    loadingState: LoadingStatus;
}
