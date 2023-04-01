import { AxiosResponse } from "axios";

import {
    addChatMessageRequest,
    addChatMessageWithTweetRequest,
    chatMessagesSaga,
    fetchChatMessagesRequest
} from "../sagas";
import {
    addChatMessage,
    addChatMessageWithTweet,
    fetchChatMessages,
    setChatMessages,
    setChatMessagesLoadingState
} from "../actionCreators";
import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { ChatMessageApi } from "../../../../services/api/chat-service/chatMessageApi";
import { ChatMessageResponse } from "../../../../types/chat";
import { ChatMessageRequest, ChatMessageWithTweetRequest } from "../contracts/state";
import { ChatMessagesActionsType } from "../contracts/actionTypes";
import { LoadingStatus } from "../../../../types/common";

describe("chatMessagesSaga:", () => {

    describe("fetchChatMessagesRequest:", () => {
        const mockChatMessageResponse = { data: [{ id: 1 }, { id: 2 }] } as AxiosResponse<ChatMessageResponse[]>;
        const worker = fetchChatMessagesRequest(fetchChatMessages(1));

        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatMessageApi.getChatMessages, 1);
        testSetResponse(worker, mockChatMessageResponse, setChatMessages, mockChatMessageResponse.data, "ChatMessageResponse");
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.ERROR);
    });

    describe("addChatMessageRequest:", () => {
        const mockChatMessageRequest = { chatId: 1, text: "text" } as ChatMessageRequest;
        const worker = addChatMessageRequest(addChatMessage(mockChatMessageRequest));

        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatMessageApi.addMessage, mockChatMessageRequest);
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.ERROR);
    });

    describe("addChatMessageWithTweetRequest:", () => {
        const mockChatMessageWithTweetRequest = {
            tweetId: 1,
            text: "text",
            usersIds: [1, 2]
        } as ChatMessageWithTweetRequest;
        const worker = addChatMessageWithTweetRequest(addChatMessageWithTweet(mockChatMessageWithTweetRequest));

        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatMessageApi.addMessageWithTweet, mockChatMessageWithTweetRequest);
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.ERROR);
    });

    testWatchSaga(chatMessagesSaga, [
        { actionType: ChatMessagesActionsType.FETCH_CHAT_MESSAGES, workSaga: fetchChatMessagesRequest },
        { actionType: ChatMessagesActionsType.ADD_CHAT_MESSAGE, workSaga: addChatMessageRequest },
        { actionType: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET, workSaga: addChatMessageWithTweetRequest }
    ]);
});
