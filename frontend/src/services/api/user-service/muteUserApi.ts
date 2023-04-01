import { AxiosResponse } from "axios";

import { MutedUserResponse } from "../../../types/user";
import { axios } from "../../../core/axios";
import { API_USER_MUTED } from "../../../constants/endpoint-constants";

export const MuteUserApi = {
    async getMutedList(pageNumber: number): Promise<AxiosResponse<MutedUserResponse[]>> {
        return await axios.get<MutedUserResponse[]>(API_USER_MUTED, { params: { page: pageNumber } });
    },
    async processMutedList(userId: number): Promise<AxiosResponse<boolean>> {
        return await axios.get<boolean>(`${API_USER_MUTED}/${userId}`);
    }
};
