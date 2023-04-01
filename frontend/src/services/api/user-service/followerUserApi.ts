import { AxiosResponse } from "axios";

import { FollowersRequest } from "../../../store/ducks/usersSearch/contracts/state";
import { FollowerUserResponse, UserProfileResponse, UserResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import {
    API_USER_FOLLOW,
    API_USER_FOLLOW_ACCEPT,
    API_USER_FOLLOW_DECLINE,
    API_USER_FOLLOW_OVERALL,
    API_USER_FOLLOW_PRIVATE,
    API_USER_FOLLOWER_REQUESTS,
    API_USER_FOLLOWERS,
    API_USER_FOLLOWING
} from "../../../constants/endpoint-constants";

export const FollowerUserApi = {
    async getFollowers({ userId, page }: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_FOLLOWERS}/${userId}`, { params: { page: page } });
    },
    async getFollowing({ userId, page }: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_FOLLOWING}/${userId}`, { params: { page: page } });
    },
    async getFollowerRequests(pageNumber: number): Promise<AxiosResponse<FollowerUserResponse[]>> {
        return await axios.get<FollowerUserResponse[]>(API_USER_FOLLOWER_REQUESTS, { params: { page: pageNumber } });
    },
    async processFollow(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_FOLLOW}/${userId}`);
    },
    async overallFollowers(userId: string): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${API_USER_FOLLOW_OVERALL}/${userId}`);
    },
    async processFollowRequestToPrivateProfile(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(`${API_USER_FOLLOW_PRIVATE}/${userId}`);
    },
    async acceptFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_USER_FOLLOW_ACCEPT}/${userId}`);
    },
    async declineFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${API_USER_FOLLOW_DECLINE}/${userId}`);
    }
};
