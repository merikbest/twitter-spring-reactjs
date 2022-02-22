import {Image, NotificationType} from "./common";

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
    avatar: Image;
    isFollower: boolean;
}

export interface NotificationTweetResponse {
    id: number;
    text: string;
    user: { id: number; }
    notificationCondition: boolean;
}
