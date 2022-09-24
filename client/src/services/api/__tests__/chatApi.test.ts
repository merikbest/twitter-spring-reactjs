import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
    API_CHAT_ADD_MESSAGE,
    API_CHAT_ADD_MESSAGE_TWEET,
    API_CHAT_CREATE,
    API_CHAT_LEAVE,
    API_CHAT_MESSAGES,
    API_CHAT_PARTICIPANT,
    API_CHAT_READ_MESSAGES,
    API_CHAT_SEARCH,
    API_CHAT_USERS
} from "../../../util/endpoints";
import {ChatApi} from "../chatApi";
import {mockChats, mockMessages, mockUsers} from "../../../util/mockData/mockData";
import {testApiCall} from "./apiTestHelper.test";

describe("ChatApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ChatApi.getUserChats", () => {
        it("[200] should get user chats Success", () => {
            testApiCall(mockAdapter, "get", API_CHAT_USERS, 200, mockChats, ChatApi.getUserChats);
        });
    });

    describe("should fetch ChatApi.createChat", () => {
        it("[200] should create chat Success", () => {
            testApiCall(mockAdapter, "get", `${API_CHAT_CREATE}/1`, 200, mockChats[0], ChatApi.createChat, 1);
        });
    });

    describe("should fetch ChatApi.getChatMessages", () => {
        it("[200] should create chat Success", () => {
            testApiCall(mockAdapter, "get", API_CHAT_MESSAGES(1), 200, mockMessages, ChatApi.getChatMessages, 1);
        });
    });

    describe("should fetch ChatApi.readChatMessages", () => {
        it("[200] should read chat messages Success", () => {
            testApiCall(mockAdapter, "get", API_CHAT_READ_MESSAGES(1), 200, 7, ChatApi.readChatMessages, 1);
        });
    });

    describe("should fetch ChatApi.addMessage", () => {
        it("[200] should add message Success", () => {
            const mockChatMessage = {chatId: 1, text: "text"};
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE, 200, mockMessages[0], ChatApi.addMessage, mockChatMessage);
        });
    });

    describe("should fetch ChatApi.addMessageWithTweet", () => {
        it("[200] should add message with tweet Success", () => {
            const mockRequest = {text: "text", tweetId: 1, usersIds: [1, 2]};
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE_TWEET, 200, mockMessages, ChatApi.addMessageWithTweet, mockRequest);
        });
    });

    describe("should fetch ChatApi.getParticipant", () => {
        it("[200] should get participant Success", () => {
            const mockRequest = {participantId: 1, chatId: 1};
            testApiCall(mockAdapter, "get", `${API_CHAT_PARTICIPANT}/1/1`, 200, mockUsers[0], ChatApi.getParticipant, mockRequest);
        });
    });

    describe("should fetch ChatApi.leaveFromConversation", () => {
        it("[200] should leave from conversation Success", () => {
            const mockRequest = {participantId: 1, chatId: 1};
            const mockResponse = "Successfully left the chat";
            testApiCall(mockAdapter, "get", `${API_CHAT_LEAVE}/1/1`, 200, mockResponse, ChatApi.leaveFromConversation, mockRequest);
        });
    });

    describe("should fetch ChatApi.searchParticipantsByUsername", () => {
        it("[200] should leave from conversation Success", () => {
            const mockRequest = {username: "test_username", pageNumber: 1};
            testApiCall(mockAdapter, "get", `${API_CHAT_SEARCH}/test_username`, 200, mockUsers, ChatApi.searchParticipantsByUsername, mockRequest);
        });
    });
});
