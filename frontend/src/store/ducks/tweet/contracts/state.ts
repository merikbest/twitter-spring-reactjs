import { Image, LoadingStatus, ReplyType } from "../../../../types/common";
import { TweetResponse } from "../../../../types/tweet";
import { UserResponse } from "../../../../types/user";

export interface ReplyTweetRequest {
    tweetId: number;
    userId?: string;
    text: string;
    addressedUsername: string;
    addressedId: number;
    replyType: ReplyType;
    images: Image[];
    imageDescription: string;
    taggedImageUsers: number[];
}

export interface FetchTweetUsersPayload {
    tweetId: number;
    pageNumber: number;
}


export interface TweetState {
    tweet?: TweetResponse;
    errorMessage: string;
    likedUsers: UserResponse[];
    retweetedUsers: UserResponse[];
    taggedImageUsers: UserResponse[];
    usersPagesCount: number;
    replies: TweetResponse[];
    loadingState: LoadingStatus;
    likedUsersLoadingState: LoadingStatus;
    retweetedUsersLoadingState: LoadingStatus;
    taggedImageUsersLoadingState: LoadingStatus;
    repliesLoadingState: LoadingStatus;
}
