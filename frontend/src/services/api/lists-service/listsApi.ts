import { AxiosResponse, CancelTokenSource } from "axios";

import { axios } from "../../../core/axios";
import { ListsRequest, AddUserToListsRequest } from "../../../store/ducks/lists/contracts/state";
import {
    BaseListResponse,
    ListResponse,
    ListsOwnerMemberResponse,
    ListUserResponse,
    PinnedListResponse,
    SimpleListResponse
} from "../../../types/lists";
import { TweetResponse } from "../../../types/tweet";
import { EditListsRequest } from "../../../store/ducks/list/contracts/state";
import {
    API_LISTS,
    API_LISTS_ADD_USER,
    API_LISTS_DETAILS,
    API_LISTS_FOLLOW,
    API_LISTS_FOLLOWERS,
    API_LISTS_MEMBERS,
    API_LISTS_PIN,
    API_LISTS_PINNED,
    API_LISTS_SEARCH,
    API_LISTS_TWEETS,
    API_LISTS_USER,
    API_LISTS_USER_CONSIST
} from "../../../constants/endpoint-constants";

export const ListsApi = {
    async getAllTweetLists(): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(API_LISTS);
    },
    async getUserTweetLists(): Promise<AxiosResponse<ListUserResponse[]>> {
        return await axios.get<ListUserResponse[]>(API_LISTS_USER);
    },
    async getUserTweetListsById(userId: number): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(`${API_LISTS_USER}/${userId}`);
    },
    async getTweetListsWhichUserIn(): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(API_LISTS_USER_CONSIST);
    },
    async getUserPinnedLists(): Promise<AxiosResponse<PinnedListResponse[]>> {
        return await axios.get<PinnedListResponse[]>(API_LISTS_PINNED);
    },
    async getListById(listId: number): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.get<BaseListResponse>(`${API_LISTS}/${listId}`);
    },
    async createTweetList(request: ListsRequest): Promise<AxiosResponse<ListUserResponse>> {
        return await axios.post<ListUserResponse>(API_LISTS, request);
    },
    async editList(request: EditListsRequest): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.put<BaseListResponse>(API_LISTS, request);
    },
    async deleteList(listId: number): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(`${API_LISTS}/${listId}`);
    },
    async followList(listId: number): Promise<AxiosResponse<ListUserResponse>> {
        return await axios.get<ListUserResponse>(`${API_LISTS_FOLLOW}/${listId}`);
    },
    async pinList(listId: number): Promise<AxiosResponse<PinnedListResponse>> {
        return await axios.get<PinnedListResponse>(`${API_LISTS_PIN}/${listId}`);
    },
    async getListsToAddUser(userId: number): Promise<AxiosResponse<SimpleListResponse[]>> {
        return await axios.get<SimpleListResponse[]>(`${API_LISTS_ADD_USER}/${userId}`);
    },
    async addUserToLists(request: AddUserToListsRequest): Promise<AxiosResponse<number[]>> {
        return await axios.post<number[]>(API_LISTS_ADD_USER, request);
    },
    async addUserToList(userId: number, listId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_LISTS_ADD_USER}/${userId}/${listId}`);
    },
    async getTweetsByListId(listId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(API_LISTS_TWEETS(listId), { params: { page: pageNumber } });
    },
    async getListDetails(listId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.get<BaseListResponse>(API_LISTS_DETAILS(listId), { cancelToken: cancelTokenSource.token });
    },
    async getListFollowers(listId: number, listOwnerId: number): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(API_LISTS_FOLLOWERS(listId, listOwnerId));
    },
    async getListMembers(listId: number, listOwnerId: number): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(API_LISTS_MEMBERS(listId, listOwnerId));
    },
    async searchListMembersByUsername(listId: number, username: string): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(`${API_LISTS_SEARCH}/${listId}/${username}`);
    }
};
