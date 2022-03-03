import {Image, NotificationType} from "./common";
import {TweetResponse} from "./tweet";
import {UserResponse} from "./user";

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
}

export interface NotificationUserResponse {
    id: number;
    username: string;
    fullName: string;
    avatar: Image;
    isFollower: boolean;
}

export interface NotificationTweetResponse {
    id: number;
    text: string;
    user: { id: number; }
    notificationCondition: boolean;
}

export interface NotificationReplyResponse {
    tweetId: number;
    notificationType: NotificationType;
    tweet: TweetResponse;
}

export interface NotificationInfoResponse {
    id: number;
    date: string;
    notificationType: NotificationType;
    user: UserResponse;
    tweet: TweetResponse;
}
