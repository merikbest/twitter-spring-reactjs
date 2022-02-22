import {AxiosResponse, CancelTokenSource} from "axios";

import {User, UserProjection} from "../../store/ducks/user/contracts/state";
import {Notifications} from "../../store/ducks/notifications/contracts/state";
import {axios} from "../../core/axios";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";
import {
    AuthUserResponse,
    BlockedUserResponse,
    FollowerUserResponse,
    MutedUserResponse,
    UserProfileResponse
} from "../../store/types/user";
import {NotificationUserResponse} from "../../store/types/notification";

export interface Response<T> {
    status: string;
    data: T;
}

export const UserApi = {
    async getUsers(): Promise<User[]> {
        const {data} = await axios.get<User[]>(`${API_URL}/user/all`);
        return data;
    },
    async getRelevantUsers(): Promise<User[]> {
        const {data} = await axios.get<User[]>(`${API_URL}/user/relevant`);
        return data;
    },
    async getUserFollowers(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`${API_URL}/user/${userId}/followers`);
        return data;
    },
    async getUserFollowing(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`${API_URL}/user/${userId}/following`);
        return data;
    },
    async searchUsersByUsername(name: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`${API_URL}/user/search/${name}`);
        return data;
    },
    async getUserInfo(userId: number): Promise<UserProfileResponse> { // +check
        const {data} = await axios.get<UserProfileResponse>(`${API_URL}/user/${userId}`);
        return data;
    },
    async updateUserProfile(userData: AuthUserResponse): Promise<AuthUserResponse> { // +check
        const {data} = await axios.put<AuthUserResponse>(`${API_URL}/user`, userData);
        return data;
    },
    async getFollowers(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`${API_URL}/user/followers/${userId}`);
        return data;
    },
    async getFollowing(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`${API_URL}/user/following/${userId}`);
        return data;
    },
    async getFollowerRequests(): Promise<FollowerUserResponse[]> {
        const {data} = await axios.get<FollowerUserResponse[]>(`${API_URL}/user/follower-requests`);
        return data;
    },
    async follow(userId: number): Promise<NotificationUserResponse | undefined> { // +check
        const {data} = await axios.get<NotificationUserResponse | undefined>(`${API_URL}/user/follow/${userId}`);
        return data;
    },
    async overallFollowers(userId: string): Promise<User[]> {
        const {data} = await axios.get<User[]>(`${API_URL}/user/follow/overall/${userId}`);
        return data;
    },
    async processFollowRequestToPrivateProfile(userId: number): Promise<User> {
        const {data} = await axios.get<User>(`${API_URL}/user/follow/private/${userId}`);
        return data;
    },
    async acceptFollowRequest(userId: number): Promise<User> { //+
        const {data} = await axios.get<User>(`${API_URL}/user/follow/accept/${userId}`);
        return data;
    },
    async declineFollowRequest(userId: number): Promise<User> { //+
        const {data} = await axios.get<User>(`${API_URL}/user/follow/decline/${userId}`);
        return data;
    },
    async processSubscribeToNotifications(userId: number): Promise<User | undefined> {
        const {data} = await axios.get<User | undefined>(`${API_URL}/user/subscribe/${userId}`);
        return data;
    },
    async getUserTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(`${API_URL}/user/${payload.userId}/tweets`, {params: {page: payload.page}});
    },
    async getUserLikedTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(`${API_URL}/user/${payload.userId}/liked`, {params: {page: payload.page}});
    },
    async getUserMediaTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(`${API_URL}/user/${payload.userId}/media`, {params: {page: payload.page}});
    },
    async getUserRetweetsAndReplies(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(`${API_URL}/user/${payload.userId}/replies`, {params: {page: payload.page}});
    },
    async getUserNotifications(): Promise<Response<Notifications>> {
        const {data} = await axios.get<Response<Notifications>>(`${API_URL}/user/notifications`);
        return data;
    },
    async getNotificationsFromTweetAuthors(payload: number): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(`${API_URL}/user/notifications/timeline`, {params: {page: payload}});
    },
    async getUserBookmarks(payload: number): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(`${API_URL}/user/bookmarks`, {params: {page: payload}});
    },
    async addTweetToBookmarks(tweetId: string): Promise<Response<User>> {
        const {data} = await axios.get<Response<User>>(`${API_URL}/user/bookmarks/${tweetId}`);
        return data;
    },
    async startUseTwitter(id: number): Promise<Response<boolean>> { // +
        const {data} = await axios.get<Response<boolean>>(`${API_URL}/user/${id}/start`);
        return data;
    },
    async pinTweet(tweetId: string): Promise<Response<number>> { // +
        const {data} = await axios.get<Response<number>>(`${API_URL}/user/pin/tweet/${tweetId}`);
        return data;
    },
    async getBlockList(): Promise<BlockedUserResponse[]> { // +
        const {data} = await axios.get<BlockedUserResponse[]>(`${API_URL}/user/blocked`);
        return data;
    },
    async getMutedList(): Promise<MutedUserResponse[]> { // +
        const {data} = await axios.get<MutedUserResponse[]>(`${API_URL}/user/muted`);
        return data;
    },
    async processBlockList(userId: number): Promise<boolean> { // +
        const {data} = await axios.get<boolean>(`${API_URL}/user/blocked/${userId}`);
        return data;
    },
    async processMutedList(userId: number): Promise<boolean> { // +
        const {data} = await axios.get<boolean>(`${API_URL}/user/muted/${userId}`);
        return data;
    },
    async getUserDetails(userId: number, cancelTokenSource: CancelTokenSource): Promise<UserProjection> {
        const {data} = await axios.get<UserProjection>(`${API_URL}/user/details/${userId}`, {cancelToken: cancelTokenSource.token});
        return data;
    },
};
