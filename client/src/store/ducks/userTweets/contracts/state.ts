import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";

export interface UserTweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}


export interface BookmarkedTweetPayload {
    tweetId: number;
    isTweetBookmarked: boolean;
}

export interface UserTweetRequest {
    userId: string;
    page: number;
}
