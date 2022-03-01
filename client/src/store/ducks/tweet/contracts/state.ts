import {LoadingStatus} from "../../../types";
import {Image, ReplyType} from "../../../types/common";
import {TweetResponse} from "../../../types/tweet";
import {UserResponse} from "../../../types/user";

export interface ReplyTweet { // TODO move to types
    tweetId: number;
    text: string;
    addressedUsername: string;
    addressedId: number;
    replyType: ReplyType;
    images: Image[];
}

export interface TweetState {
    tweet?: TweetResponse;
    likedUsers: UserResponse[];
    retweetedUsers: UserResponse[];
    replies: TweetResponse[];
    loadingState: LoadingStatus;
    likedUsersLoadingState: LoadingStatus;
    retweetedUsersLoadingState: LoadingStatus;
    repliesLoadingState: LoadingStatus;
}
