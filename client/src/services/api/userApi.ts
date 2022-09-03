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
import {NotificationInfoResponse, NotificationResponse, NotificationUserResponse} from "../../store/types/notification";
import {TweetImageResponse, TweetResponse} from "../../store/types/tweet";
import {UserRequest} from "../../store/ducks/user/contracts/state";
import {FollowersRequest, SearchByNameRequest} from "../../store/ducks/usersSearch/contracts/state";
import {UserTweetRequest} from "../../store/ducks/userTweets/contracts/state";

export const UserApi = {
    async getUsers(pageNumber: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/all`, {params: {page: pageNumber}});
    },
    async getRelevantUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/relevant`);
    },
    async searchUsersByUsername(request: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/search/${request.username}`, {params: {page: request.page}});
    },
    async getUserInfo(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_URL}/user/${userId}`);
    },
    async updateUserProfile(request: UserRequest): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.put<AuthUserResponse>(`${API_URL}/user`, request);
    },
    async getUserTweetImages(userId: number): Promise<AxiosResponse<TweetImageResponse[]>> {
        return await axios.get<TweetImageResponse[]>(`${API_URL}/user/images/${userId}`);
    },
    async getFollowers(request: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/followers/${request.userId}`, {params: {page: request.page}});
    },
    async getFollowing(request: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_URL}/user/following/${request.userId}`, {params: {page: request.page}});
    },
    async getFollowerRequests(pageNumber: number): Promise<AxiosResponse<FollowerUserResponse[]>> {
        return await axios.get<FollowerUserResponse[]>(`${API_URL}/user/follower-requests`, {params: {page: pageNumber}});
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
    async getUserTweets(request: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${request.userId}/tweets`, {params: {page: request.page}});
    },
    async getUserLikedTweets(request: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${request.userId}/liked`, {params: {page: request.page}});
    },
    async getUserMediaTweets(request: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${request.userId}/media`, {params: {page: request.page}});
    },
    async getUserRetweetsAndReplies(request: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/${request.userId}/replies`, {params: {page: request.page}});
    },
    async getUserNotifications(pageNumber: number): Promise<AxiosResponse<NotificationResponse[]>> {
        return await axios.get<NotificationResponse[]>(`${API_URL}/user/notifications`, {params: {page: pageNumber}});
    },
    async getTweetAuthorsNotifications(): Promise<AxiosResponse<NotificationUserResponse[]>> {
        return await axios.get<NotificationUserResponse[]>(`${API_URL}/user/notifications/subscribes`);
    },
    async getUserNotificationById(notificationId: number): Promise<AxiosResponse<NotificationInfoResponse>> {
        return await axios.get<NotificationInfoResponse>(`${API_URL}/user/notifications/${notificationId}`);
    },
    async getNotificationsFromTweetAuthors(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/notifications/timeline`, {params: {page: pageNumber}});
    },
    async getUserMentions(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/mentions`, {params: {page: pageNumber}});
    },
    async getUserBookmarks(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/user/bookmarks`, {params: {page: pageNumber}});
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
    async getBlockList(pageNumber: number): Promise<AxiosResponse<BlockedUserResponse[]>> {
        return await axios.get<BlockedUserResponse[]>(`${API_URL}/user/blocked`, {params: {page: pageNumber}});
    },
    async getMutedList(pageNumber: number): Promise<AxiosResponse<MutedUserResponse[]>> {
        return await axios.get<MutedUserResponse[]>(`${API_URL}/user/muted`, {params: {page: pageNumber}});
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
