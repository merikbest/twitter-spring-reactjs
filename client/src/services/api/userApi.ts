import {AxiosResponse, CancelTokenSource} from "axios";

import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {
    AuthUserResponse,
    BlockedUserResponse,
    FollowerUserResponse,
    MutedUserResponse,
    UserDetailResponse,
    UserProfileResponse,
    UserResponse
} from "../../store/types/user";
import {
    NotificationInfoResponse,
    NotificationResponse,
    NotificationUserResponse
} from "../../store/types/notification";
import {TweetImageResponse, TweetResponse} from "../../store/types/tweet";
import {UserRequest} from "../../store/ducks/user/contracts/state";

export const UserApi = {
    async getUsers(payload: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/all`, {params: {page: payload}});
    },
    async getRelevantUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/relevant`);
    },
    async searchUsersByUsername(payload: { username: string, page: number }): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/search/${payload.username}`, {params: {page: payload.page}});
    },
    async getUserInfo(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_URL}/user/${userId}`);
    },
    async updateUserProfile(userData: UserRequest): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.put<AuthUserResponse>(`${API_URL}/user`, userData);
    },
    async getUserTweetImages(userId: number): Promise<AxiosResponse<TweetImageResponse[]>> {
        return await axios.get<TweetImageResponse[]>(`${API_URL}/user/images/${userId}`);
    },
    async getFollowers(payload: { userId: number | string, page: number }): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/followers/${payload.userId}`, {params: {page: payload.page}});
    },
    async getFollowing(payload: { userId: number | string, page: number }): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/following/${payload.userId}`, {params: {page: payload.page}});
    },
    async getFollowerRequests(): Promise<AxiosResponse<FollowerUserResponse[]>> {
        return await axios.get<FollowerUserResponse[]>(`${API_URL}/user/follower-requests`);
    },
    async follow(userId: number): Promise<AxiosResponse<NotificationUserResponse>> {
        return await axios.get<NotificationUserResponse>(`${API_URL}/user/follow/${userId}`);
    },
    async overallFollowers(userId: string): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/follow/overall/${userId}`);
    },
    async processFollowRequestToPrivateProfile(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_URL}/user/follow/private/${userId}`);
    },
    async acceptFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_URL}/user/follow/accept/${userId}`);
    },
    async declineFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_URL}/user/follow/decline/${userId}`);
    },
    async processSubscribeToNotifications(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_URL}/user/subscribe/${userId}`);
    },
    async getUserTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${payload.userId}/tweets`, {params: {page: payload.page}});
    },
    async getUserLikedTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${payload.userId}/liked`, {params: {page: payload.page}});
    },
    async getUserMediaTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${payload.userId}/media`, {params: {page: payload.page}});
    },
    async getUserRetweetsAndReplies(payload: { userId: string, page: number }): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${payload.userId}/replies`, {params: {page: payload.page}});
    },
    async getUserNotifications(page: number): Promise<AxiosResponse<NotificationResponse[]>> {
        return await axios.get<NotificationResponse[]>(`${API_URL}/user/notifications`, {params: {page: page}});
    },
    async getTweetAuthorsNotifications(): Promise<AxiosResponse<NotificationUserResponse[]>> {
        return await axios.get<NotificationUserResponse[]>(`${API_URL}/user/notifications/subscribes`);
    },
    async getUserNotificationById(payload: number): Promise<AxiosResponse<NotificationInfoResponse>> {
        return await axios.get<NotificationInfoResponse>(`${API_URL}/user/notifications/${payload}`);
    },
    async getNotificationsFromTweetAuthors(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/notifications/timeline`, {params: {page: payload}});
    },
    async getUserMentions(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/mentions`, {params: {page: payload}});
    },
    async getUserBookmarks(payload: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/bookmarks`, {params: {page: payload}});
    },
    async addTweetToBookmarks(tweetId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_URL}/user/bookmarks/${tweetId}`);
    },
    async startUseTwitter(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_URL}/user/${userId}/start`);
    },
    async pinTweet(tweetId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(`${API_URL}/user/pin/tweet/${tweetId}`);
    },
    async getBlockList(): Promise<AxiosResponse<BlockedUserResponse[]>> {
        return await axios.get<BlockedUserResponse[]>(`${API_URL}/user/blocked`);
    },
    async getMutedList(): Promise<AxiosResponse<MutedUserResponse[]>> {
        return await axios.get<MutedUserResponse[]>(`${API_URL}/user/muted`);
    },
    async processBlockList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_URL}/user/blocked/${userId}`);
    },
    async processMutedList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_URL}/user/muted/${userId}`);
    },
    async getUserDetails(userId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<UserDetailResponse>> {
        return await axios.get<UserDetailResponse>(`${API_URL}/user/details/${userId}`, {cancelToken: cancelTokenSource.token});
    },
};
