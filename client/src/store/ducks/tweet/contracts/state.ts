import {LoadingStatus} from "../../../types";
import {Image, ReplyType} from "../../tweets/contracts/state";
import {TweetResponse} from "../../../types/tweet";

export interface TweetState {
    data?: TweetResponse;
    loadingState: LoadingStatus
}

export interface ReplyTweet {
    tweetId: string;
    text: string;
    addressedUsername: string;
    addressedId: number;
    replyType: ReplyType;
    images: Image[];
}
