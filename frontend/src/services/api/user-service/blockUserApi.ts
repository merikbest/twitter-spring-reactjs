import { AxiosResponse } from "axios";

import { BlockedUserResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import { UI_V1_USER_BLOCKED, UI_V1_USER_BLOCKED_USER_ID } from "../../../constants/endpoint-constants";

export const BlockUserApi = {
    async getBlockList(pageNumber: number): Promise<AxiosResponse<BlockedUserResponse[]>> {
        return await axios.get<BlockedUserResponse[]>(UI_V1_USER_BLOCKED, { params: { page: pageNumber } });
    },
    async processBlockList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_USER_BLOCKED_USER_ID(userId));
    }
};
