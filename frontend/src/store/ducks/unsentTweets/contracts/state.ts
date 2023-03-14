import { TweetResponse } from "../../../../types/tweet";
import { LoadingStatus } from "../../../../types/common";

export interface UnsentTweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
