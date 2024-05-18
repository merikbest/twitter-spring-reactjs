import { AxiosResponse } from "axios";

import { NotificationInfoResponse, NotificationResponse, NotificationUserResponse } from "../../../types/notification";
import { axios } from "../../../core/axios";
import {
    UI_V1_NOTIFICATION,
    UI_V1_NOTIFICATION_SUBSCRIBES,
    UI_V1_NOTIFICATION_TIMELINE,
    UI_V1_NOTIFICATION_USER,
    UI_V1_NOTIFICATION_MENTIONS
} from "../../../constants/endpoint-constants";
import { TweetResponse } from "../../../types/tweet";

export const NotificationApi = {
    async getUserNotifications(pageNumber: number): Promise<AxiosResponse<NotificationResponse[]>> {
        return await axios.get<NotificationResponse[]>(UI_V1_NOTIFICATION_USER, { params: { page: pageNumber } });
    },
    async getUserMentionsNotifications(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_NOTIFICATION_MENTIONS, { params: { page: pageNumber } });
    },
    async getTweetAuthorsNotifications(): Promise<AxiosResponse<NotificationUserResponse[]>> {
        return await axios.get<NotificationUserResponse[]>(UI_V1_NOTIFICATION_SUBSCRIBES);
    },
    async getUserNotificationById(notificationId: number): Promise<AxiosResponse<NotificationInfoResponse>> {
        return await axios.get<NotificationInfoResponse>(`${UI_V1_NOTIFICATION}/${notificationId}`);
    },
    async getNotificationsFromTweetAuthors(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_NOTIFICATION_TIMELINE, { params: { page: pageNumber } });
    }
};
