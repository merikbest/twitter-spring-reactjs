import { AxiosResponse, CancelTokenSource } from "axios";

import { axios } from "../../../core/axios";
import { AddUserToListsRequest, ListsRequest } from "../../../store/ducks/lists/contracts/state";
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
    UI_V1_LISTS_DETAILS,
    UI_V1_LISTS_FOLLOWERS,
    UI_V1_LISTS_MEMBERS,
    UI_V1_LISTS_SEARCH,
    UI_V1_LISTS_TWEETS,
    UI_V1_LISTS,
    UI_V1_LISTS_ADD_USER,
    UI_V1_LISTS_FOLLOW,
    UI_V1_LISTS_ID,
    UI_V1_LISTS_PIN,
    UI_V1_LISTS_PINNED,
    UI_V1_LISTS_USER,
    UI_V1_LISTS_USER_CONSIST,
    UI_V1_LISTS_USER_ID
} from "../../../constants/endpoint-constants";

export const ListsApi = {
    async getAllTweetLists(): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(UI_V1_LISTS);
    },
    async getUserTweetLists(): Promise<AxiosResponse<ListUserResponse[]>> {
        return await axios.get<ListUserResponse[]>(UI_V1_LISTS_USER);
    },
    async getUserTweetListsById(userId: number): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(UI_V1_LISTS_USER_ID(1));
    },
    async getTweetListsWhichUserIn(): Promise<AxiosResponse<ListResponse[]>> {
        return await axios.get<ListResponse[]>(UI_V1_LISTS_USER_CONSIST);
    },
    async getUserPinnedLists(): Promise<AxiosResponse<PinnedListResponse[]>> {
        return await axios.get<PinnedListResponse[]>(UI_V1_LISTS_PINNED);
    },
    async getListById(listId: number): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.get<BaseListResponse>(UI_V1_LISTS_ID(listId));
    },
    async createTweetList(request: ListsRequest): Promise<AxiosResponse<ListUserResponse>> {
        return await axios.post<ListUserResponse>(UI_V1_LISTS, request);
    },
    async editList(request: EditListsRequest): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.put<BaseListResponse>(UI_V1_LISTS, request);
    },
    async deleteList(listId: number): Promise<AxiosResponse<string>> {
        return await axios.delete<string>(UI_V1_LISTS_ID(listId));
    },
    async followList(listId: number): Promise<AxiosResponse<ListUserResponse>> {
        return await axios.get<ListUserResponse>(UI_V1_LISTS_FOLLOW(listId));
    },
    async pinList(listId: number): Promise<AxiosResponse<PinnedListResponse>> {
        return await axios.get<PinnedListResponse>(UI_V1_LISTS_PIN(listId));
    },
    async getListsToAddUser(userId: number): Promise<AxiosResponse<SimpleListResponse[]>> {
        return await axios.get<SimpleListResponse[]>(`${UI_V1_LISTS_ADD_USER}/${userId}`);
    },
    async addUserToLists(request: AddUserToListsRequest): Promise<AxiosResponse<number[]>> {
        return await axios.post<number[]>(UI_V1_LISTS_ADD_USER, request);
    },
    async addUserToList(userId: number, listId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${UI_V1_LISTS_ADD_USER}/${userId}/${listId}`);
    },
    async getTweetsByListId(listId: number, pageNumber: number): Promise<AxiosResponse<TweetResponse[]>> {
        return await axios.get<TweetResponse[]>(UI_V1_LISTS_TWEETS(listId), { params: { page: pageNumber } });
    },
    async getListDetails(listId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<BaseListResponse>> {
        return await axios.get<BaseListResponse>(UI_V1_LISTS_DETAILS(listId), { cancelToken: cancelTokenSource.token });
    },
    async getListFollowers(listId: number, listOwnerId: number): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(UI_V1_LISTS_FOLLOWERS(listId, listOwnerId));
    },
    async getListMembers(listId: number, listOwnerId: number): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(UI_V1_LISTS_MEMBERS(listId, listOwnerId));
    },
    async searchListMembersByUsername(listId: number, username: string): Promise<AxiosResponse<ListsOwnerMemberResponse[]>> {
        return await axios.get<ListsOwnerMemberResponse[]>(`${UI_V1_LISTS_SEARCH}/${listId}/${username}`);
    }
};
