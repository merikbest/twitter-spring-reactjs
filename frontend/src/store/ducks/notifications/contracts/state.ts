import {
    NotificationInfoResponse,
    NotificationResponse,
    NotificationUserResponse
} from "../../../../types/notification";
import { LoadingStatus } from "../../../../types/common";

export interface NotificationsState {
    notificationsList: NotificationResponse[];
    pagesCount: number;
    tweetAuthors: NotificationUserResponse[];
    notificationInfo?: NotificationInfoResponse;
    notificationInfoLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
    loadingTweetAuthorsState: LoadingStatus;
}
