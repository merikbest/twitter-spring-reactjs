import {LoadingStatus} from "../../../types";
import {NotificationInfoResponse, NotificationResponse, NotificationUserResponse} from "../../../types/notification";

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
