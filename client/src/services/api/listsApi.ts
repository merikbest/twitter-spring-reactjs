import {AxiosResponse, CancelTokenSource} from "axios";

import {axios} from "../../core/axios";
import {API_URL} from "../../util/url";
import {AddLists, AddUserToListsRequest,} from "../../store/ducks/lists/contracts/state";
import {
    BaseListResponse,
    ListResponse,
    ListsOwnerMemberResponse,
    ListUserResponse,
    PinnedListResponse, SimpleListResponse
} from "../../store/types/lists";
import {TweetResponse} from "../../store/types/tweet";
import {EditListsRequest} from "../../store/ducks/list/contracts/state";

export const ListsApi = {
    async getAllTweetLists(): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(`${API_URL}/lists`);
    },
    async getUserTweetLists(): Promise<AxiosResponse<ListUserResponse[]>> {
        return await axios.get<ListUserResponse[]>(`${API_URL}/lists/user`);
    },
    async getUserTweetListsById(userId: number): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(`${API_URL}/lists/user/${userId}`);
    },
    async getTweetListsWhichUserIn(): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(`${API_URL}/lists/user/consist`);
    },
    async getUserPinnedLists(): Promise<AxiosResponse<PinnedListResponse[]>> {
        return await axios.get<PinnedListResponse[]>(`${API_URL}/lists/pined`);
    },
    async getListById(listId: number): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.get<BaseListResponse>(`${API_URL}/lists/${listId}`);
    },
    async createTweetList(payload: AddLists): Promise<AxiosResponse<ListUserResponse>> {
        return await axios.post<ListUserResponse>(`${API_URL}/lists`, payload);
    },
    async editList(payload: EditListsRequest): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.put<BaseListResponse>(`${API_URL}/lists`, payload);
    },
    async deleteList(listId: number): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${API_URL}/lists/${listId}`);
    },
    async followList(listId: number): Promise<AxiosResponse<ListUserResponse>> {
        return await axios.get<ListUserResponse>(`${API_URL}/lists/follow/${listId}`);
    },
    async pinList(listId: number): Promise<AxiosResponse<PinnedListResponse>> {
        return await axios.get<PinnedListResponse>(`${API_URL}/lists/pin/${listId}`);
    },
    async getListsToAddUser(userId: number): Promise<AxiosResponse<SimpleListResponse[]>> {
        return await axios.get<SimpleListResponse[]>(`${API_URL}/lists/add/user/${userId}`);
    },
    async addUserToLists(payload: AddUserToListsRequest): Promise<AxiosResponse<number[]>> {
        return await axios.post<number[]>(`${API_URL}/lists/add/user`, payload);
    },
    async addUserToList(userId: number, listId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_URL}/lists/add/user/${userId}/${listId}`);
    },
    async getTweetsByListId(listId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(`${API_URL}/lists/${listId}/tweets`, {params: {page: pageNumber}});
    },
    async getListDetails(listId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.get<BaseListResponse>(`${API_URL}/lists/${listId}/details`, {cancelToken: cancelTokenSource.token});
    },
    async getListFollowers(listId: number, listOwnerId: number): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(`${API_URL}/lists/${listId}/${listOwnerId}/followers`);
    },
    async getListMembers(listId: number, listOwnerId: number): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(`${API_URL}/lists/${listId}/${listOwnerId}/members`);
    },
    async searchListMembersByUsername(listId: number, username: string): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(`${API_URL}/lists/search/${listId}/${username}`);
    },
};
