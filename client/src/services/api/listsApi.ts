import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AddLists, AddUserToLists, EditLists, Lists, MemberToList} from "../../store/ducks/lists/contracts/state";

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
    async editList(payload: EditLists): Promise<Response<Lists>> {
        const data = await axios.put<Response<Lists>>(API_URL + "/lists", payload);
        return data.data;
    },
    async deleteList(listId: number): Promise<Response<string>> {
        const data = await axios.delete<Response<string>>(API_URL + `/lists/${listId}`);
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
    async addUserToLists(payload: AddUserToLists): Promise<Response<Lists[]>> {
        const data = await axios.post<Response<Lists[]>>(API_URL + "/lists/add/user", payload);
        return data.data;
    },
    async addUserToList(payload: MemberToList): Promise<Response<Lists>> {
        const data = await axios.get<Response<Lists>>(API_URL + `/lists/add/user/${payload.userId}/${payload.listId}`);
        return data.data;
    },
};
