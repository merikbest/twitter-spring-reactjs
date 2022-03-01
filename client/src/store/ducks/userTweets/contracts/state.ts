import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";

export interface UserTweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
