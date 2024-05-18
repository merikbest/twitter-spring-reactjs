import axios, { AxiosResponse } from "axios";

import { ChatParticipantRequest } from "../../../store/ducks/userProfile/contracts/state";
import { UserResponse } from "../../../types/user";
import { UI_V1_CHAT_LEAVE, UI_V1_CHAT_PARTICIPANT, UI_V1_CHAT_SEARCH } from "../../../constants/endpoint-constants";
import { LeaveConversationRequest } from "../../../store/ducks/chats/contracts/state";
import { SearchByNameRequest } from "../../../store/ducks/usersSearch/contracts/state";

export const ChatParticipantApi = {
    async getParticipant(request: ChatParticipantRequest): Promise<AxiosResponse<UserResponse>> {
        return await axios.get<UserResponse>(`${UI_V1_CHAT_PARTICIPANT}/${request.participantId}/${request.chatId}`);
    },
    async leaveFromConversation(request: LeaveConversationRequest): Promise<AxiosResponse<string>> {
        return await axios.get<string>(`${UI_V1_CHAT_LEAVE}/${request.participantId}/${request.chatId}`);
    },
    async searchParticipantsByUsername(request: SearchByNameRequest): Promise<AxiosResponse<UserResponse[]>> {
        return await axios.get<UserResponse[]>(`${UI_V1_CHAT_SEARCH}/${request.username}`, { params: { page: request.pageNumber } });
    }
};
