import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";
import {Image} from "../../../types/common";

export interface AddTweet { // TODO move to types
    id?: number;
    text: string;
    images: Image[];
    replyType: ReplyType;
    pollDateTime?: number;
    scheduledDate?: Date;
    choices?: string[];
}

export interface AddQuoteTweet { // TODO move to types
    text: string;
    images: Image[];
    replyType: ReplyType;
    tweetId: number;
}

export enum ReplyType { // +
    EVERYONE = "EVERYONE",
    FOLLOW = "FOLLOW",
    MENTION = "MENTION"
}

export enum LinkCoverSize { // +
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE"
}

export interface Vote { // +
    tweetId: number;
    pollId: number;
    pollChoiceId: number;
}

export interface TweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
