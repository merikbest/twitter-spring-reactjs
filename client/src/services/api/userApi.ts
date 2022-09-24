import {AxiosResponse, CancelTokenSource} from "axios";

import {axios} from "../../core/axios";
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
import {
    API_USER,
    API_USER_ALL,
    API_USER_BLOCKED,
    API_USER_BOOKMARKS,
    API_USER_DETAILS,
    API_USER_FOLLOW,
    API_USER_FOLLOW_ACCEPT,
    API_USER_FOLLOW_DECLINE,
    API_USER_FOLLOW_OVERALL,
    API_USER_FOLLOW_PRIVATE,
    API_USER_FOLLOWER_REQUESTS,
    API_USER_FOLLOWERS,
    API_USER_FOLLOWING,
    API_USER_IMAGES,
    API_USER_LIKED,
    API_USER_MEDIA,
    API_USER_MENTIONS,
    API_USER_MUTED,
    API_USER_NOTIFICATIONS,
    API_USER_NOTIFICATIONS_SUBSCRIBES,
    API_USER_NOTIFICATIONS_TIMELINE,
    API_USER_PIN_TWEET,
    API_USER_RELEVANT,
    API_USER_REPLIES,
    API_USER_SEARCH,
    API_USER_START,
    API_USER_SUBSCRIBE,
    API_USER_TWEETS
} from "../../util/endpoints";

export const UserApi = {
    async getUsers(pageNumber: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_USER_ALL, {params: {page: pageNumber}});
    },
    async getRelevantUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_USER_RELEVANT);
    },
    async searchUsersByUsername({username, pageNumber}: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_SEARCH}/${username}`, {params: {page: pageNumber}});
    },
    async getUserInfo(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_USER}/${userId}`);
    },
    async updateUserProfile(request: UserRequest): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.put<AuthUserResponse>(API_USER, request);
    },
    async getUserTweetImages(userId: number): Promise<AxiosResponse<TweetImageResponse[]>> {
        return await axios.get<TweetImageResponse[]>(`${API_USER_IMAGES}/${userId}`);
    },
    async getFollowers({userId, page}: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_FOLLOWERS}/${userId}`, {params: {page: page}});
    },
    async getFollowing({userId, page}: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_FOLLOWING}/${userId}`, {params: {page: page}});
    },
    async getFollowerRequests(pageNumber: number): Promise<AxiosResponse<FollowerUserResponse[]>> {
        return await axios.get<FollowerUserResponse[]>(API_USER_FOLLOWER_REQUESTS, {params: {page: pageNumber}});
    },
    async follow(userId: number): Promise<AxiosResponse<NotificationUserResponse>> {
        return await axios.get<NotificationUserResponse>(`${API_USER_FOLLOW}/${userId}`);
    },
    async overallFollowers(userId: string): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_FOLLOW_OVERALL}/${userId}`);
    },
    async processFollowRequestToPrivateProfile(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_USER_FOLLOW_PRIVATE}/${userId}`);
    },
    async acceptFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_USER_FOLLOW_ACCEPT}/${userId}`);
    },
    async declineFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_USER_FOLLOW_DECLINE}/${userId}`);
    },
    async processSubscribeToNotifications(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_SUBSCRIBE}/${userId}`);
    },
    async getUserTweets({userId, page}: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_TWEETS(userId), {params: {page: page}});
    },
    async getUserLikedTweets({userId, page}: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_LIKED(userId), {params: {page: page}});
    },
    async getUserMediaTweets({userId, page}: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_MEDIA(userId), {params: {page: page}});
    },
    async getUserRetweetsAndReplies({userId, page}: UserTweetRequest): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_REPLIES(userId), {params: {page: page}});
    },
    async getUserNotifications(pageNumber: number): Promise<AxiosResponse<NotificationResponse[]>> {
        return await axios.get<NotificationResponse[]>(API_USER_NOTIFICATIONS, {params: {page: pageNumber}});
    },
    async getTweetAuthorsNotifications(): Promise<AxiosResponse<NotificationUserResponse[]>> {
        return await axios.get<NotificationUserResponse[]>(API_USER_NOTIFICATIONS_SUBSCRIBES);
    },
    async getUserNotificationById(notificationId: number): Promise<AxiosResponse<NotificationInfoResponse>> {
        return await axios.get<NotificationInfoResponse>(`${API_USER_NOTIFICATIONS}/${notificationId}`);
    },
    async getNotificationsFromTweetAuthors(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_NOTIFICATIONS_TIMELINE, {params: {page: pageNumber}});
    },
    async getUserMentions(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_MENTIONS, {params: {page: pageNumber}});
    },
    async getUserBookmarks(pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_USER_BOOKMARKS, {params: {page: pageNumber}});
    },
    async addTweetToBookmarks(tweetId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_BOOKMARKS}/${tweetId}`);
    },
    async startUseTwitter(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(API_USER_START(userId));
    },
    async pinTweet(tweetId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(`${API_USER_PIN_TWEET}/${tweetId}`);
    },
    async getBlockList(pageNumber: number): Promise<AxiosResponse<BlockedUserResponse[]>> {
        return await axios.get<BlockedUserResponse[]>(API_USER_BLOCKED, {params: {page: pageNumber}});
    },
    async getMutedList(pageNumber: number): Promise<AxiosResponse<MutedUserResponse[]>> {
        return await axios.get<MutedUserResponse[]>(API_USER_MUTED, {params: {page: pageNumber}});
    },
    async processBlockList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_BLOCKED}/${userId}`);
    },
    async processMutedList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_MUTED}/${userId}`);
    },
    async getUserDetails(userId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<UserDetailResponse>> {
        return await axios.get<UserDetailResponse>(`${API_USER_DETAILS}/${userId}`, {cancelToken: cancelTokenSource.token});
    },
};
