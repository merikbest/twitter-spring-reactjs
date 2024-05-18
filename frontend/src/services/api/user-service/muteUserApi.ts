import { AxiosResponse } from "axios";

import { MutedUserResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import { UI_V1_USER_MUTED, UI_V1_USER_MUTED_USER_ID } from "../../../constants/endpoint-constants";

export const MuteUserApi = {
    async getMutedList(pageNumber: number): Promise<AxiosResponse<MutedUserResponse[]>> {
        return await axios.get<MutedUserResponse[]>(UI_V1_USER_MUTED, { params: { page: pageNumber } });
    },
    async processMutedList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(UI_V1_USER_MUTED_USER_ID(userId));
    }
};
