import {User} from "../../store/ducks/user/contracts/state";
import {Notification} from "../../store/ducks/notifications/contracts/state";
import {axios} from "../../core/axios";
import {Tweet} from "../../store/ducks/tweets/contracts/state";
import {API_URL} from "../../util/url";

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
    async getUserTweets(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + `/user/${id}/tweets`);
        return data.data;
    },
    async getUserLikedTweets(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + `/user/${id}/liked`);
        return data.data;
    },
    async getUserMediaTweets(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + `/user/${id}/media`);
        return data.data;
    },
    async getUserRetweetsAndReplies(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + `/user/${id}/replies`);
        return data.data;
    },
    async getUserNotifications(): Promise<Response<Notification[]>> {
        const data =  await axios.get<Response<Notification[]>>(API_URL + "/user/notifications");
        return data.data;
    },
    async getUserBookmarks(): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(API_URL + "/user/bookmarks");
        return data.data;
    },
    async addTweetToBookmarks(tweetId: string): Promise<Response<User>> {
        const data = await axios.get<Response<User>>(API_URL + '/user/bookmarks/' + tweetId);
        return data.data;
    },
    async startUseTwitter(id: number): Promise<Response<User>> {
        const data = await axios.get<Response<User>>(API_URL + `/user/${id}/start`);
        return data.data;
    },
    async pinTweet(tweetId: string): Promise<Response<User>> {
        const data = await axios.get<Response<User>>(API_URL + '/user/pin/tweet/' + tweetId);
        return data.data;
    },
    async unpinTweet(tweetId: string): Promise<Response<User>> {
        const data = await axios.get<Response<User>>(API_URL + '/user/unpin/tweet/' + tweetId);
        return data.data;
    },
};
