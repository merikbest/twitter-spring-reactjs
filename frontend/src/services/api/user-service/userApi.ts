import { AxiosResponse, CancelTokenSource } from "axios";

import { axios } from "../../../core/axios";
import {
    AuthUserResponse,
    CommonUserResponse,
    SearchResultResponse,
    UserDetailResponse,
    UserProfileResponse,
    UserResponse
} from "../../../types/user";
import { UserRequest } from "../../../store/ducks/user/contracts/state";
import { SearchByNameRequest } from "../../../store/ducks/usersSearch/contracts/state";
import {
    API_USER,
    API_USER_ALL,
    API_USER_DETAILS,
    API_USER_PIN_TWEET,
    API_USER_RELEVANT,
    API_USER_SEARCH_RESULTS,
    API_USER_SEARCH_TEXT,
    API_USER_SEARCH_USERNAME,
    API_USER_START,
    API_USER_SUBSCRIBE,
    API_USER_TOKEN
} from "../../../constants/endpoint-constants";
import { SearchTermsRequest } from "../../../store/ducks/search/contracts/state";
import { AuthenticationResponse } from "../../../types/auth";

export const UserApi = {
    async getUserByToken(): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.get<AuthenticationResponse>(API_USER_TOKEN);
    },
    async getUserById(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_USER}/${userId}`);
    },
    async getUsers(pageNumber: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_USER_ALL, { params: { page: pageNumber } });
    },
    async getRelevantUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(API_USER_RELEVANT);
    },
    async searchUsersByUsername({ username, pageNumber }: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_SEARCH_USERNAME}/${username}`, { params: { page: pageNumber } });
    },
    async searchByText(text: string): Promise<AxiosResponse<SearchResultResponse>> {
        return await axios.get<SearchResultResponse>(`${API_USER_SEARCH_TEXT}/${text}`);
    },
    async getSearchResults(request: SearchTermsRequest): Promise<AxiosResponse<CommonUserResponse[]>> {
        return await axios.post<CommonUserResponse[]>(API_USER_SEARCH_RESULTS, request);
    },
    async startUseTwitter(): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(API_USER_START);
    },
    async updateUserProfile(request: UserRequest): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.put<AuthUserResponse>(API_USER, request);
    },
    async processSubscribeToNotifications(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_SUBSCRIBE}/${userId}`);
    },
    async processPinTweet(tweetId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(`${API_USER_PIN_TWEET}/${tweetId}`);
    },
    async getUserDetails(userId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<UserDetailResponse>> {
        return await axios.get<UserDetailResponse>(`${API_USER_DETAILS}/${userId}`, { cancelToken: cancelTokenSource.token });
    }
};
