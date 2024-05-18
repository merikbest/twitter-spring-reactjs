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
    UI_V1_USER,
    UI_V1_USER_ALL,
    UI_V1_USER_DETAILS_USER_ID,
    UI_V1_USER_PIN_TWEET_ID,
    UI_V1_USER_RELEVANT,
    UI_V1_USER_SEARCH_RESULTS,
    UI_V1_USER_SEARCH_TEXT,
    UI_V1_USER_SEARCH_USERNAME,
    UI_V1_USER_START,
    UI_V1_USER_SUBSCRIBE_USER_ID,
    UI_V1_USER_TOKEN,
    UI_V1_USER_USER_ID
} from "../../../constants/endpoint-constants";
import { SearchTermsRequest } from "../../../store/ducks/search/contracts/state";
import { AuthenticationResponse } from "../../../types/auth";

export const UserApi = {
    async getUserByToken(): Promise<AxiosResponse<AuthenticationResponse>> {
        return await axios.get<AuthenticationResponse>(UI_V1_USER_TOKEN);
    },
    async getUserById(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(UI_V1_USER_USER_ID(userId));
    },
    async getUsers(pageNumber: number): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_USER_ALL, { params: { page: pageNumber } });
    },
    async getRelevantUsers(): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_USER_RELEVANT);
    },
    async searchUsersByUsername({ username, pageNumber }: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_USER_SEARCH_USERNAME(username), { params: { page: pageNumber } });
    },
    async searchByText(text: string): Promise<AxiosResponse<SearchResultResponse>> {
        return await axios.get<SearchResultResponse>(UI_V1_USER_SEARCH_TEXT(text));
    },
    async getSearchResults(request: SearchTermsRequest): Promise<AxiosResponse<CommonUserResponse[]>> {
        return await axios.post<CommonUserResponse[]>(UI_V1_USER_SEARCH_RESULTS, request);
    },
    async startUseTwitter(): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_USER_START);
    },
    async updateUserProfile(request: UserRequest): Promise<AxiosResponse<AuthUserResponse>> {
        return await axios.put<AuthUserResponse>(UI_V1_USER, request);
    },
    async processSubscribeToNotifications(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_USER_SUBSCRIBE_USER_ID(userId));
    },
    async processPinTweet(tweetId: number): Promise<AxiosResponse<number>> {
        return await axios.get<number>(UI_V1_USER_PIN_TWEET_ID(tweetId));
    },
    async getUserDetails(userId: number, cancelTokenSource: CancelTokenSource): Promise<AxiosResponse<UserDetailResponse>> {
        return await axios.get<UserDetailResponse>(UI_V1_USER_DETAILS_USER_ID(userId), { cancelToken: cancelTokenSource.token });
    }
};
