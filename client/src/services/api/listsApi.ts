import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AddLists, Lists} from "../../store/ducks/lists/contracts/state";

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
    async createTweetList(payload: AddLists): Promise<Response<Lists>> {
        const data = await axios.post<Response<Lists>>(API_URL + "/lists", payload);
        return data.data;
    },
};
