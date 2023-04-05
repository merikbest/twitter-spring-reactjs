import { AxiosResponse } from "axios";

import { NotificationInfoResponse, NotificationResponse, NotificationUserResponse } from "../../../types/notification";
import { axios } from "../../../core/axios";
import {
    API_NOTIFICATION,
    API_NOTIFICATION_SUBSCRIBES,
    API_NOTIFICATION_TIMELINE,
    API_NOTIFICATION_USER,
    API_NOTIFICATION_MENTIONS
} from "../../../constants/endpoint-constants";
import { TweetResponse } from "../../../types/tweet";

export const NotificationApi = {
    async getUserNotifications(pageNumber: number): Promise<AxiosResponse<NotificationResponse[]>> {
        return await axios.get<NotificationResponse[]>(API_NOTIFICATION_USER, { params: { page: pageNumber } });
    },
    async getUserMentionsNotifications(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_NOTIFICATION_MENTIONS, { params: { page: pageNumber } });
    },
    async getTweetAuthorsNotifications(): Promise<AxiosResponse<NotificationUserResponse[]>> {
        return await axios.get<NotificationUserResponse[]>(API_NOTIFICATION_SUBSCRIBES);
    },
    async getUserNotificationById(notificationId: number): Promise<AxiosResponse<NotificationInfoResponse>> {
        return await axios.get<NotificationInfoResponse>(`${API_NOTIFICATION}/${notificationId}`);
    },
    async getNotificationsFromTweetAuthors(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_NOTIFICATION_TIMELINE, { params: { page: pageNumber } });
    }
};
