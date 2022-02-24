import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AddLists, AddUserToLists, EditLists, MemberToList} from "../../store/ducks/lists/contracts/state";
import {
    BaseListResponse,
    ListResponse,
    ListsOwnerMemberResponse,
    ListUserResponse,
    PinnedListResponse
} from "../../store/types/lists";
import {TweetResponse} from "../../store/types/tweet";

interface Response<T> {
    status: string;
    data: T;
}

export const ListsApi = {
    async getAllTweetLists(): Promise<Response<ListResponse[]>> { // +
        const {data} = await axios.get<Response<ListResponse[]>>(`${API_URL}/lists`);
        return data;
    },
    async getUserTweetLists(): Promise<Response<ListUserResponse[]>> { // +
        const {data} = await axios.get<Response<ListUserResponse[]>>(`${API_URL}/lists/user`);
        return data;
    },
    async getUserTweetListsById(userId: number): Promise<Response<ListResponse[]>> { // +
        const {data} = await axios.get<Response<ListResponse[]>>(`${API_URL}/lists/user/${userId}`);
        return data;
    },
    async getTweetListsWhichUserIn(): Promise<Response<ListResponse[]>> { // +
        const {data} = await axios.get<Response<ListResponse[]>>(`${API_URL}/lists/user/consist`);
        return data;
    },
    async getUserPinnedLists(): Promise<Response<PinnedListResponse[]>> { // +
        const {data} = await axios.get<Response<PinnedListResponse[]>>(`${API_URL}/lists/pined`);
        return data;
    },
    async getListById(listId: number): Promise<Response<BaseListResponse>> { // +
        const {data} = await axios.get<Response<BaseListResponse>>(`${API_URL}/lists/${listId}`);
        return data;
    },
    async createTweetList(payload: AddLists): Promise<Response<ListUserResponse>> { // +
        const {data} = await axios.post<Response<ListUserResponse>>(`${API_URL}/lists`, payload);
        return data;
    },
    async editList(payload: EditLists): Promise<Response<BaseListResponse>> { // +
        const {data} = await axios.put<Response<BaseListResponse>>(`${API_URL}/lists`, payload);
        return data;
    },
    async deleteList(listId: number): Promise<Response<string>> { // +
        const {data} = await axios.delete<Response<string>>(`${API_URL}/lists/${listId}`);
        return data;
    },
    async followList(listId: number): Promise<Response<boolean>> { // +
        const {data} = await axios.get<Response<boolean>>(`${API_URL}/lists/follow/${listId}`);
        return data;
    },
    async pinList(listId: number): Promise<Response<PinnedListResponse>> { // +
        const {data} = await axios.get<Response<PinnedListResponse>>(`${API_URL}/lists/pin/${listId}`);
        return data;
    },
    async addUserToLists(payload: AddUserToLists): Promise<Response<number[]>> { // +
        const {data} = await axios.post<Response<number[]>>(`${API_URL}/lists/add/user`, payload);
        return data;
    },
    async addUserToList(payload: MemberToList): Promise<Response<boolean>> { // +
        const {data} = await axios.get<Response<boolean>>(`${API_URL}/lists/add/user/${payload.userId}/${payload.listId}`);
        return data;
    },
    // NEW //
    async getTweetsByListId(listId: number, pageNumber: number): Promise<Response<TweetResponse[]>> { // +
        const {data} = await axios.get<Response<TweetResponse[]>>(`${API_URL}/lists/${listId}/tweets`, {params: {page: pageNumber}});
        return data;
    },
    async getListDetails(listId: number): Promise<Response<BaseListResponse>> { // +
        const {data} = await axios.get<Response<BaseListResponse>>(`${API_URL}/lists/${listId}/details`);
        return data;
    },
    async getListMembers(listId: number, listOwnerId: number): Promise<Response<any[]>> { // +
        const {data} = await axios.get<Response<any[]>>(`${API_URL}/lists/${listId}/${listOwnerId}/members`);
        return data;
    },
    async searchListMembersByUsername(listId: number, username: string): Promise<Response<ListsOwnerMemberResponse[]>> { // +
        const {data} = await axios.get<Response<ListsOwnerMemberResponse[]>>(`${API_URL}/lists/search/${listId}/${username}`);
        return data;
    },
};
