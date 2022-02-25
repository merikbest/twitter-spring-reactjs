import {LoadingStatus} from "../../../types";
import {BaseListResponse} from "../../../types/lists";
import {TweetResponse} from "../../../types/tweet";

export interface ListState {
    list?: BaseListResponse;
    listTweets: TweetResponse[];
    loadingState: LoadingStatus;
}
