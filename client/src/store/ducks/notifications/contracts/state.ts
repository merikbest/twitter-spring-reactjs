import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";
import {Tweet} from "../../tweets/contracts/state";
import {NotificationInfoResponse, NotificationResponse, NotificationUserResponse} from "../../../types/notification";

export interface Notification {
    id: number;
    date: string;
    notificationType: NotificationType;
    user: User;
    userToFollow: User;
    tweet: Tweet;
}

export interface Notifications {
    notifications: Notification[];
    tweetAuthors: User[];
}

export enum NotificationType {
    LIKE = "LIKE",
    RETWEET = "RETWEET",
    FOLLOW = "FOLLOW"
}

export interface NotificationsState {
    notificationsList: NotificationResponse[];
    tweetAuthors: NotificationUserResponse[];
    notificationInfo?: NotificationInfoResponse;
    notificationInfoLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
}
