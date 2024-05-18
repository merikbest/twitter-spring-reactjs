import { AxiosResponse } from "axios";

import { FollowersRequest } from "../../../store/ducks/usersSearch/contracts/state";
import { FollowerUserResponse, UserProfileResponse, UserResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import {
    UI_V1_USER_FOLLOW_ACCEPT_USER_ID,
    UI_V1_USER_FOLLOW_DECLINE_USER_ID,
    UI_V1_USER_FOLLOW_OVERALL_USER_ID,
    UI_V1_USER_FOLLOW_PRIVATE_USER_ID,
    UI_V1_USER_FOLLOW_USER_ID,
    UI_V1_USER_FOLLOWER_REQUESTS,
    UI_V1_USER_FOLLOWERS_USER_ID,
    UI_V1_USER_FOLLOWING_USER_ID
} from "../../../constants/endpoint-constants";

export const FollowerUserApi = {
    async getFollowers({ userId, page }: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_USER_FOLLOWERS_USER_ID(userId), { params: { page: page } });
    },
    async getFollowing({ userId, page }: FollowersRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_USER_FOLLOWING_USER_ID(userId), { params: { page: page } });
    },
    async getFollowerRequests(pageNumber: number): Promise<AxiosResponse<FollowerUserResponse[]>> {
        return await axios.get<FollowerUserResponse[]>(UI_V1_USER_FOLLOWER_REQUESTS, { params: { page: pageNumber } });
    },
    async processFollow(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_USER_FOLLOW_USER_ID(userId));
    },
    async overallFollowers(userId: string): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(UI_V1_USER_FOLLOW_OVERALL_USER_ID(userId));
    },
    async processFollowRequestToPrivateProfile(userId: number): Promise<AxiosResponse<UserProfileResponse>> {
        return await axios.get<UserProfileResponse>(UI_V1_USER_FOLLOW_PRIVATE_USER_ID(userId));
    },
    async acceptFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(UI_V1_USER_FOLLOW_ACCEPT_USER_ID(userId));
    },
    async declineFollowRequest(userId: number): Promise<AxiosResponse<string>> {
        return await axios.get<string>(UI_V1_USER_FOLLOW_DECLINE_USER_ID(userId));
    }
};
