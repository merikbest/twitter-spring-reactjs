import {
    addChatMessageRequest,
    addChatMessageWithTweetRequest,
    chatMessagesSaga,
    fetchChatMessagesRequest
} from "./sagas";
import {
    addChatMessage,
    addChatMessageWithTweet,
    fetchChatMessages,
    setChatMessages,
    setChatMessagesLoadingState
} from "./actionCreators";
import {LoadingStatus} from "../../types";
import {testCall, testLoadingStatus, testSetResponse, testWatchSaga} from "../../../util/testHelper";
import {ChatApi} from "../../../services/api/chatApi";
import {ChatMessageResponse} from "../../types/chat";
import {ChatMessageRequest, ChatMessageWithTweetRequest} from "./contracts/state";
import {ChatMessagesActionsType} from "./contracts/actionTypes";

describe("chatMessagesSaga:", () => {
    
    describe("fetchChatMessagesRequest:", () => {
        const mockChatMessageResponse = [{id: 1}, {id: 2}] as ChatMessageResponse[];
        const worker = fetchChatMessagesRequest(fetchChatMessages(1));
        
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.getChatMessages, 1);
        testSetResponse(worker, mockChatMessageResponse, setChatMessages, mockChatMessageResponse, "ChatMessageResponse");
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.ERROR)
    });

    describe("addChatMessageRequest:", () => {
        const mockChatMessageRequest = {chatId: 1, text: "text"} as ChatMessageRequest;
        const worker = addChatMessageRequest(addChatMessage(mockChatMessageRequest));

        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.addMessage, mockChatMessageRequest);
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.ERROR)
    });

    describe("addChatMessageWithTweetRequest:", () => {
        const mockChatMessageWithTweetRequest = {tweetId: 1, text: "text", usersIds: [1, 2]} as ChatMessageWithTweetRequest;
        const worker = addChatMessageWithTweetRequest(addChatMessageWithTweet(mockChatMessageWithTweetRequest));

        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.addMessageWithTweet, mockChatMessageWithTweetRequest);
        testLoadingStatus(worker, setChatMessagesLoadingState, LoadingStatus.ERROR)
    });

    testWatchSaga(chatMessagesSaga, [
        {actionType: ChatMessagesActionsType.FETCH_CHAT_MESSAGES, workSaga: fetchChatMessagesRequest},
        {actionType: ChatMessagesActionsType.ADD_CHAT_MESSAGE, workSaga: addChatMessageRequest},
        {actionType: ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET, workSaga: addChatMessageWithTweetRequest},
    ]);
});
