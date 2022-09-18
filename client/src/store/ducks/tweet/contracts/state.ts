import {LoadingStatus} from "../../../types";
import {Image, ReplyType} from "../../../types/common";
import {TweetResponse} from "../../../types/tweet";
import {UserResponse} from "../../../types/user";

export interface ReplyTweet {
    tweetId: number;
    text: string;
    addressedUsername: string;
    addressedId: number;
    replyType: ReplyType;
    images: Image[];
}

export interface FetchTweetUsersPayload {
    tweetId: number;
    pageNumber: number;
}


export interface TweetState {
    tweet?: TweetResponse;
    likedUsers: UserResponse[];
    retweetedUsers: UserResponse[];
    usersPagesCount: number;
    replies: TweetResponse[];
    loadingState: LoadingStatus;
    likedUsersLoadingState: LoadingStatus;
    retweetedUsersLoadingState: LoadingStatus;
    repliesLoadingState: LoadingStatus;
}
