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

export interface Response<T> {
    status: string;
    data: T;
}

export const UserApi = {
    async getUsers(payload: number): Promise<AxiosResponse<UserResponse[]>> { // +
        return await axios.get<UserResponse[]>(`${API_URL}/user/all`, {params: {page: payload}});
    },
    async getRelevantUsers(): Promise<AxiosResponse<UserResponse[]>> { // +
        return await axios.get<UserResponse[]>(`${API_URL}/user/relevant`);
    },
    async searchUsersByUsername(payload: { username: string, page: number }): Promise<AxiosResponse<UserResponse[]>> { // +
        return await axios.get<UserResponse[]>(`${API_URL}/user/search/${payload.username}`, {params: {page: payload.page}});
    },
    async getUserInfo(userId: number): Promise<AxiosResponse<UserProfileResponse>> { // +
        return await axios.get<UserProfileResponse>(`${API_URL}/user/${userId}`);
    },
    async updateUserProfile(userData: UserRequest): Promise<AxiosResponse<AuthUserResponse>> { // +
        return await axios.put<AuthUserResponse>(`${API_URL}/user`, userData);
    },
    async getUserTweetImages(userId: number): Promise<TweetImageResponse[]> {
        const {data} = await axios.get<TweetImageResponse[]>(`${API_URL}/user/images/${userId}`);
        return data;
    },
    async getFollowers(userId: string): Promise<UserResponse[]> {
        const {data} = await axios.get<UserResponse[]>(`${API_URL}/user/followers/${userId}`);
        return data;
    },
    async getFollowing(userId: string): Promise<UserResponse[]> {
        const {data} = await axios.get<UserResponse[]>(`${API_URL}/user/following/${userId}`);
        return data;
    },
    async getFollowerRequests(): Promise<FollowerUserResponse[]> {
        const {data} = await axios.get<FollowerUserResponse[]>(`${API_URL}/user/follower-requests`);
        return data;
    },
    async follow(userId: number): Promise<NotificationUserResponse> {
        const {data} = await axios.get<NotificationUserResponse>(`${API_URL}/user/follow/${userId}`);
        return data;
    },
    async overallFollowers(userId: string): Promise<UserResponse[]> {
        const {data} = await axios.get<UserResponse[]>(`${API_URL}/user/follow/overall/${userId}`);
        return data;
    },
    async processFollowRequestToPrivateProfile(userId: number): Promise<UserProfileResponse> {
        const {data} = await axios.get<UserProfileResponse>(`${API_URL}/user/follow/private/${userId}`);
        return data;
    },
    async acceptFollowRequest(userId: number): Promise<string> {
        const {data} = await axios.get<string>(`${API_URL}/user/follow/accept/${userId}`);
        return data;
    },
    async declineFollowRequest(userId: number): Promise<string> {
        const {data} = await axios.get<string>(`${API_URL}/user/follow/decline/${userId}`);
        return data;
    },
    async processSubscribeToNotifications(userId: number): Promise<boolean> {
        const {data} = await axios.get<boolean>(`${API_URL}/user/subscribe/${userId}`);
        return data;
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
    async getTweetAuthorsNotifications(): Promise<Response<NotificationUserResponse[]>> {
        const {data} = await axios.get<Response<NotificationUserResponse[]>>(`${API_URL}/user/notifications/subscribes`);
        return data;
    },
    async getUserNotificationById(payload: number): Promise<Response<NotificationInfoResponse>> {
        const {data} = await axios.get<Response<NotificationInfoResponse>>(`${API_URL}/user/notifications/${payload}`);
        return data;
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
    async addTweetToBookmarks(tweetId: number): Promise<Response<boolean>> {
        const {data} = await axios.get<Response<boolean>>(`${API_URL}/user/bookmarks/${tweetId}`);
        return data;
    },
    async startUseTwitter(id: number): Promise<Response<boolean>> {
        const {data} = await axios.get<Response<boolean>>(`${API_URL}/user/${id}/start`);
        return data;
    },
    async pinTweet(tweetId: number): Promise<Response<number>> {
        const {data} = await axios.get<Response<number>>(`${API_URL}/user/pin/tweet/${tweetId}`);
        return data;
    },
    async getBlockList(): Promise<BlockedUserResponse[]> {
        const {data} = await axios.get<BlockedUserResponse[]>(`${API_URL}/user/blocked`);
        return data;
    },
    async getMutedList(): Promise<MutedUserResponse[]> {
        const {data} = await axios.get<MutedUserResponse[]>(`${API_URL}/user/muted`);
        return data;
    },
    async processBlockList(userId: number): Promise<boolean> {
        const {data} = await axios.get<boolean>(`${API_URL}/user/blocked/${userId}`);
        return data;
    },
    async processMutedList(userId: number): Promise<boolean> {
        const {data} = await axios.get<boolean>(`${API_URL}/user/muted/${userId}`);
        return data;
    },
    async getUserDetails(userId: number, cancelTokenSource: CancelTokenSource): Promise<UserDetailResponse> {
        const {data} = await axios.get<UserDetailResponse>(`${API_URL}/user/details/${userId}`, {cancelToken: cancelTokenSource.token});
        return data;
    },
};
