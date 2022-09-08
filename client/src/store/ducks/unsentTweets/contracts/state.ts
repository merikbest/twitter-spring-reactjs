import {TweetResponse} from "../../../types/tweet";
import {LoadingStatus} from "../../../types";

export interface UnsentTweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
