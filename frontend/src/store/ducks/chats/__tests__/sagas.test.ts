import { AxiosResponse } from "axios";

import { chatsSaga, createChatRequest, fetchChatsRequest, leaveFromConversationRequest } from "../sagas";
import { createChat, leaveFromConversation, setChat, setChats, setChatsLoadingState } from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { ChatApi } from "../../../../services/api/chat-service/chatApi";
import { ChatParticipantApi } from "../../../../services/api/chat-service/chatParticipantApi";
import { ChatResponse } from "../../../../types/chat";
import { ChatsActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("chatsSaga:", () => {

    describe("fetchChatsRequest:", () => {
        const mockChatResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<ChatResponse[]>;
        const worker = fetchChatsRequest();

        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.getUserChats);
        testSetResponse(worker, mockChatResponse, setChats, mockChatResponse.data, "ChatResponse");
        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.ERROR);
    });

    describe("createChatRequest:", () => {
        const mockChatResponse = { data: { id: 1 } } as AxiosResponse<ChatResponse>;
        const worker = createChatRequest(createChat(1));

        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.createChat, 1);
        testSetResponse(worker, mockChatResponse, setChat, mockChatResponse.data, "ChatResponse");
        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.ERROR);
    });

    describe("leaveFromConversationRequest:", () => {
        const worker = leaveFromConversationRequest(leaveFromConversation({ participantId: 1, chatId: 1 }));

        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatParticipantApi.leaveFromConversation, { participantId: 1, chatId: 1 });
        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(chatsSaga, [
        { actionType: ChatsActionsType.FETCH_CHATS, workSaga: fetchChatsRequest },
        { actionType: ChatsActionsType.CREATE_CHAT, workSaga: createChatRequest },
        { actionType: ChatsActionsType.LEAVE_FROM_CONVERSATION, workSaga: leaveFromConversationRequest }
    ]);
});
