import {User} from "../../store/ducks/user/contracts/state";
import {Notification} from "../../store/ducks/notifications/contracts/state";
import {axios} from "../../core/axios";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";
import {AxiosResponse} from "axios";

export interface Response<T> {
    status: string;
    data: T;
}

export const UserApi = {
    async getUsers(): Promise<User[]> {
        const {data} = await axios.get<User[]>(API_URL + '/user/all');
        return data;
    },
    async getRelevantUsers(): Promise<User[]> {
        const {data} = await axios.get<User[]>(API_URL + '/user/relevant');
        return data;
    },
    async getUserFollowers(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(API_URL + `/user/${userId}/followers`);
        return data;
    },
    async getUserFollowing(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(API_URL + `/user/${userId}/following`);
        return data;
    },
    async searchUsersByUsername(name: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(API_URL + `/user/search/${name}`);
        return data;
    },
    async getUserInfo(userId: string): Promise<User | undefined> {
        const {data} = await axios.get<User | undefined>(API_URL + '/user/' + userId);
        return data;
    },
    async updateUserProfile(userData: User): Promise<User> {
        const {data} = await axios.put<User>(API_URL + '/user', userData);
        return data;
    },
    async follow(user: User): Promise<User | undefined> {
        const {data} = await axios.get<User | undefined>(API_URL + '/user/follow/' + user.id);
        return data;
    },
    async getUserTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + `/user/${payload.userId}/tweets`, {params: {page: payload.page}});
    },
    async getUserLikedTweets(id: string): Promise<Response<Tweet[]>> {
        const {data} = await axios.get<Response<Tweet[]>>(API_URL + `/user/${id}/liked`);
        return data;
    },
    async getUserLikedTweets2(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + `/user/${payload.userId}/liked`, {params: {page: payload.page}});
    },
    async getUserMediaTweets(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + `/user/${payload.userId}/media`, {params: {page: payload.page}});
    },
    async getUserRetweetsAndReplies(payload: { userId: string, page: number }): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + `/user/${payload.userId}/replies`, {params: {page: payload.page}});
    },
    async getUserNotifications(): Promise<Response<Notification[]>> {
        const {data} =  await axios.get<Response<Notification[]>>(API_URL + "/user/notifications");
        return data;
    },
    async getUserBookmarks(payload: number): Promise<AxiosResponse<Tweet[]>> {
        return await axios.get<Tweet[]>(API_URL + "/user/bookmarks", {params: {page: payload}});
    },
    async addTweetToBookmarks(tweetId: string): Promise<Response<User>> {
        const {data} = await axios.get<Response<User>>(API_URL + '/user/bookmarks/' + tweetId);
        return data;
    },
    async startUseTwitter(id: number): Promise<Response<User>> {
        const {data} = await axios.get<Response<User>>(API_URL + `/user/${id}/start`);
        return data;
    },
    async pinTweet(tweetId: string): Promise<Response<User>> {
        const {data} = await axios.get<Response<User>>(API_URL + '/user/pin/tweet/' + tweetId);
        return data;
    },
    async getBlockList(): Promise<User[]> {
        const {data} = await axios.get<User[]>(API_URL + '/user/blocked');
        return data;
    },
    async getMutedList(): Promise<User[]> {
        const {data} = await axios.get<User[]>(API_URL + '/user/muted');
        return data;
    },
    async processBlockList(userId: number): Promise<User> {
        const {data} = await axios.get<User>(API_URL + `/user/blocked/${userId}`);
        return data;
    },
    async processMutedList(userId: number): Promise<User> {
        const {data} = await axios.get<User>(API_URL + `/user/muted/${userId}`);
        return data;
    },
};
