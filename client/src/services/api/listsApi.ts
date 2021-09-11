import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AddLists, AddTweetToLists, Lists} from "../../store/ducks/lists/contracts/state";
import {Tweet} from "../../store/ducks/tweets/contracts/state";

interface Response<T> {
    status: string;
    data: T;
}

export const ListsApi = {
    async getAllTweetLists(): Promise<Response<Lists[]>> {
        const data = await axios.get<Response<Lists[]>>(API_URL + "/lists");
        return data.data;
    },
    async getUserTweetLists(): Promise<Response<Lists[]>> {
        const data = await axios.get<Response<Lists[]>>(API_URL + "/lists/user");
        return data.data;
    },
    async getListById(listId: string): Promise<Response<Lists>> {
        const data = await axios.get<Response<Lists>>(API_URL + `/lists/${listId}`);
        return data.data;
    },
    async createTweetList(payload: AddLists): Promise<Response<Lists>> {
        const data = await axios.post<Response<Lists>>(API_URL + "/lists", payload);
        return data.data;
    },
    async followList(listId: number): Promise<Response<Lists>> {
        const data = await axios.get<Response<Lists>>(API_URL + `/lists/follow/${listId}`);
        return data.data;
    },
    async addTweetToLists(payload: AddTweetToLists): Promise<Response<Tweet>> {
        const data = await axios.post<Response<Tweet>>(API_URL + "/lists/add/tweet", payload);
        return data.data;
    },
};
