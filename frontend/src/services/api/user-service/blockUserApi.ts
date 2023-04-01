import { AxiosResponse } from "axios";

import { BlockedUserResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import { API_USER_BLOCKED } from "../../../constants/endpoint-constants";

export const BlockUserApi = {
    async getBlockList(pageNumber: number): Promise<AxiosResponse<BlockedUserResponse[]>> {
        return await axios.get<BlockedUserResponse[]>(API_USER_BLOCKED, { params: { page: pageNumber } });
    },
    async processBlockList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_BLOCKED}/${userId}`);
    }
};
