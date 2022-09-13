import {LoadingStatus} from "../../../types";
import {TweetResponse} from "../../../types/tweet";
import {Image, ReplyType} from "../../../types/common";

export interface TweetsState {
    items: TweetResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}


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

export interface TweetsByListIdRequest {
    listId: number,
    pageNumber: number
}

export interface TweetsWithQuotesByIdRequest {
    tweetId: number,
    pageNumber: number
}

export interface ChangeReplyTypeRequest {
    tweetId: number;
    replyType: ReplyType;
}

export interface UpdatedBookmarkedTweetPayload {
    tweetId: number;
    isTweetBookmarked: boolean;
}

export interface FetchTweetsByTextRequest {
    text: string;
    pageNumber: number;
}

export interface FetchTweetsByTagRequest {
    tag: string;
    pageNumber: number;
}
