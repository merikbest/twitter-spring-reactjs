import {LoadingStatus} from "../../../types";
import {Image, ReplyType, Tweet} from "../../tweets/contracts/state";

export interface TweetState {
    data?: Tweet
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
