import {User} from "../../store/ducks/user/contracts/state";
import {axios} from "../../core/axios";
import {Tweet} from "../../store/ducks/tweets/contracts/state";

export interface Response<T> {
    status: string;
    data: T;
}

export const UserApi = {
    async getUsers(): Promise<User[]> {
        const {data} = await axios.get<User[]>('http://localhost:8080/api/v1/user/all');
        return data;
    },
    async getRelevantUsers(): Promise<User[]> {
        const {data} = await axios.get<User[]>('http://localhost:8080/api/v1/user/relevant');
        return data;
    },
    async getUserFollowers(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`http://localhost:8080/api/v1/user/${userId}/followers`);
        return data;
    },
    async getUserFollowing(userId: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`http://localhost:8080/api/v1/user/${userId}/following`);
        return data;
    },
    async searchUsersByUsername(name: string): Promise<User[] | undefined> {
        const {data} = await axios.get<User[] | undefined>(`http://localhost:8080/api/v1/user/search/${name}`);
        return data;
    },
    async getUserInfo(userId: string): Promise<User | undefined> {
        const {data} = await axios.get<User | undefined>('http://localhost:8080/api/v1/user/' + userId);
        return data;
    },
    async updateUserProfile(userData: User): Promise<User> {
        const {data} = await axios.put<User>('http://localhost:8080/api/v1/user', userData);
        return data;
    },
    async follow(user: User): Promise<User | undefined> {
        const {data} = await axios.get<User | undefined>('http://localhost:8080/api/v1/user/follow/' + user.id);
        return data;
    },
    async unfollow(user: User): Promise<User | undefined> {
        const {data} = await axios.get<User | undefined>('http://localhost:8080/api/v1/user/unfollow/' + user.id);
        return data;
    },
    async getUserTweets(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(`http://localhost:8080/api/v1/user/${id}/tweets`);
        return data.data;
    },
    async getUserLikedTweets(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(`http://localhost:8080/api/v1/user/${id}/liked`);
        return data.data;
    },
    async getUserMediaTweets(id: string): Promise<Response<Tweet[]>> {
        const data = await axios.get<Response<Tweet[]>>(`http://localhost:8080/api/v1/user/${id}/media`);
        return data.data;
    },
};
