import {chatsSaga, createChatRequest, fetchChatsRequest, leaveFromConversationRequest} from "./sagas";
import {createChat, leaveFromConversation, setChat, setChats, setChatsLoadingState} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {ChatApi} from "../../../services/api/chatApi";
import {ChatResponse} from "../../types/chat";
import {ChatsActionsType} from "./contracts/actionTypes";

describe("chatsSaga:", () => {

    describe("fetchChatsRequest:", () => {
        const mockChatResponse = [{id: 1}, {id: 2}] as ChatResponse[];
        const worker = fetchChatsRequest();

        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.getUserChats);
        testSetResponse(worker, mockChatResponse, setChats, mockChatResponse, "ChatResponse");
        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.ERROR)
    });

    describe("createChatRequest:", () => {
        const mockChatResponse = {id: 1} as ChatResponse;
        const worker = createChatRequest(createChat(1));

        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.createChat, 1);
        testSetResponse(worker, mockChatResponse, setChat, mockChatResponse, "ChatResponse");
        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.ERROR)
    });

    describe("leaveFromConversationRequest:", () => {
        const worker = leaveFromConversationRequest(leaveFromConversation({participantId: 1, chatId: 1}));

        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.leaveFromConversation, {participantId: 1, chatId: 1});
        testLoadingStatus(worker, setChatsLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(chatsSaga, [
        {actionType: ChatsActionsType.FETCH_CHATS, workSaga: fetchChatsRequest},
        {actionType: ChatsActionsType.CREATE_CHAT, workSaga: createChatRequest},
        {actionType: ChatsActionsType.LEAVE_FROM_CONVERSATION, workSaga: leaveFromConversationRequest},
    ]);
});
