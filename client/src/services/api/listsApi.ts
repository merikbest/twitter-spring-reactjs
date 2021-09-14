import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AddLists, AddTweetToLists, AddUserToLists, Lists} from "../../store/ducks/lists/contracts/state";
import {AddUserToList} from "../../store/ducks/list/contracts/state";

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
    async getUserPinnedLists(): Promise<Response<Lists[]>> {
        const data = await axios.get<Response<Lists[]>>(API_URL + "/lists/pined");
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
    async pinList(listId: number): Promise<Response<Lists>> {
        const data = await axios.get<Response<Lists>>(API_URL + `/lists/pin/${listId}`);
        return data.data;
    },
    async addTweetToLists(payload: AddTweetToLists): Promise<Response<Lists[]>> {
        const data = await axios.post<Response<Lists[]>>(API_URL + "/lists/add/tweet", payload);
        return data.data;
    },
    async addUserToLists(payload: AddUserToLists): Promise<Response<Lists[]>> {
        const data = await axios.post<Response<Lists[]>>(API_URL + "/lists/add/user", payload);
        return data.data;
    },
    async addUserToList(payload: AddUserToList): Promise<Response<Lists>> {
        const data = await axios.get<Response<Lists>>(API_URL + `/lists/add/user/${payload.userId}/${payload.listId}`);
        return data.data;
    },
};
