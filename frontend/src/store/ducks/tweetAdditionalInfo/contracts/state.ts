import { TweetAdditionalInfoResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

export interface TweetAdditionalInfoState {
    tweetAdditionalInfo?: TweetAdditionalInfoResponse;
    isTweetBookmarked: boolean;
    loadingState: LoadingStatus;
}
