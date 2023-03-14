import { NotificationType } from "./common";
import { TweetResponse } from "./tweet";
import { UserResponse } from "./user";

export interface NotificationsResponse {
    notifications: NotificationResponse[];
    tweetAuthors: NotificationUserResponse[];
}

export interface NotificationResponse {
    id: number;
    date: string;
    notificationType: NotificationType;
    user: NotificationUserResponse;
    userToFollow: NotificationUserResponse;
    tweet: NotificationTweetResponse;
    list: NotificationListResponse;
}

export interface NotificationUserResponse {
    id: number;
    username: string;
    fullName: string;
    avatar: string;
    isFollower: boolean;
}

export interface NotificationTweetResponse {
    id: number;
    text: string;
    authorId: number;
    notificationCondition: boolean;
}

export interface NotificationReplyResponse {
    tweetId: number;
    notificationType: NotificationType;
    tweet: TweetResponse;
}

export interface NotificationListResponse {
    id: number;
    name: string;
}

export interface NotificationInfoResponse {
    id: number;
    date: string;
    notificationType: NotificationType;
    user: UserResponse;
    tweet: TweetResponse;
}
