import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";

export interface TweetState {
    data?: Tweet
    loadingState: LoadingStatus
}

export interface ReplyTweet {
    id: string;
    text: string;
    addressedUsername: string;
    addressedId: number;
    images: Image[];
}
