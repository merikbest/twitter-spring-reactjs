import { RootState } from "../../store";
import { NotificationsState } from "./contracts/state";
import { NotificationResponse, NotificationUserResponse } from "../../../types/notification";
import { LoadingStatus } from "../../../types/common";

export const selectNotifications = (state: RootState): NotificationsState => state.notifications;
export const selectNotificationsList = (state: RootState): NotificationResponse[] => selectNotifications(state).notificationsList;
export const selectPagesCount = (state: RootState): number => selectNotifications(state).pagesCount;
export const selectLoadingState = (state: RootState): LoadingStatus => selectNotifications(state).loadingState;
export const selectIsNotificationsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsNotificationsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectNotificationsTweetAuthors = (state: RootState): NotificationUserResponse[] => selectNotifications(state).tweetAuthors;
export const selectTweetAuthorsNotificationsLoadingState = (state: RootState): LoadingStatus => selectNotifications(state).loadingTweetAuthorsState;
export const selectIsTweetAuthorsNotificationsLoading = (state: RootState): boolean => selectTweetAuthorsNotificationsLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetAuthorsNotificationsLoaded = (state: RootState): boolean => selectTweetAuthorsNotificationsLoadingState(state) === LoadingStatus.LOADED;

export const selectNotificationInfo = (state: RootState) => selectNotifications(state).notificationInfo;
export const selectNotificationInfoType = (state: RootState) => selectNotificationInfo(state)?.notificationType;
export const selectNotificationInfoUser = (state: RootState) => selectNotificationInfo(state)?.user;
export const selectNotificationInfoUserFullName = (state: RootState) => selectNotificationInfo(state)?.user.fullName;
export const selectNotificationInfoTweet = (state: RootState) => selectNotificationInfo(state)?.tweet;

export const selectNotificationInfoLoadingState = (state: RootState): LoadingStatus => selectNotifications(state).notificationInfoLoadingState;
export const selectIsNotificationInfoLoading = (state: RootState): boolean => selectNotificationInfoLoadingState(state) === LoadingStatus.LOADING;
