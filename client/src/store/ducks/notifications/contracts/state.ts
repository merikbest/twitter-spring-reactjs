import {LoadingStatus} from "../../../types";
import {NotificationInfoResponse, NotificationResponse, NotificationUserResponse} from "../../../types/notification";

export interface NotificationsState {
    notificationsList: NotificationResponse[];
    pagesCount: number;
    tweetAuthors: NotificationUserResponse[];
    notificationInfo?: NotificationInfoResponse;
    notificationInfoLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
    loadingTweetAuthorsState: LoadingStatus;
}
