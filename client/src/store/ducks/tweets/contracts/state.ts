import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";
import {Image, ReplyType} from "../../../types/common";

export interface AddTweet {
    id?: number;
    text: string;
    images: Image[];
    replyType: ReplyType;
    pollDateTime?: number;
    scheduledDate?: Date;
    choices?: string[];
}

export interface AddQuoteTweet {
    text: string;
    images: Image[];
    replyType: ReplyType;
    tweetId: number;
}

export interface Vote {
    tweetId: number;
    pollId: number;
    pollChoiceId: number;
}

export interface TweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
