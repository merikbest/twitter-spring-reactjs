import {LoadingStatus} from "../../../types";
import {Image, LinkCoverSize, ReplyType, Tweet} from "../../tweets/contracts/state";

export interface TweetProjection {
    id: number;
    text: string;
    dateTime: string;
    scheduledDate: string;
    addressedUsername: string;
    addressedId: number;
    addressedTweetId: number;
    replyType: ReplyType;
    link: string;
    linkTitle: string;
    linkDescription: string;
    linkCover: string;
    linkCoverSize: LinkCoverSize;
    user: UserProjectionResponse;
    images: ImageProjectionResponse[];
    quoteTweet: QuoteTweetProjectionResponse;
    poll: PollProjectionResponse;
    retweetsCount: number;
    likedTweetsCount: number;
    repliesCount: number;
    isTweetLiked: boolean;
    isTweetRetweeted: boolean;
    isUserFollowByOtherUser: boolean;
}

export interface ImageProjectionResponse {
    id: number;
    src: string;
}

export interface UserProjectionResponse {
    id: number;
    email: string;
    fullName: string;
    username: string;
    avatar: ImageProjectionResponse;
}

export interface QuoteTweetProjectionResponse {
    id: number;
    text: string;
    dateTime: string;
    link: string;
    linkTitle: string;
    linkDescription: string;
    linkCover: string;
    linkCoverSize: LinkCoverSize;
    user: UserProjectionResponse;
}

export interface PollProjectionResponse {
    id: number;
    dateTime: string;
    pollChoices: PollChoiceProjectionResponse[];
}

export interface PollChoiceProjectionResponse {
    id: number;
    choice: string;
    votedUser: VotedUserResponse[];
}

export interface VotedUserResponse {
    id: number;
}

export interface TweetState {
    data?: Tweet
    dataProjection?: TweetProjection;
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
