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
    const mockUserErrorResponse = "Participant not found";
    const mockUserBlockedErrorResponse = "Participant is blocked";
    const mockChatErrorResponse = "Chat not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ChatApi.getUserChats", () => {
        it("[200] should get user chats Success", () => {
            testApiCall(mockAdapter, "get", API_CHAT_USERS, 200, mockChats, ChatApi.getUserChats);
        });
    });

    describe("should fetch ChatApi.createChat", () => {
        const mockURL = `${API_CHAT_CREATE}/1`;

        it("[200] should create chat Success", () => {
            testApiCall(mockAdapter, "get", mockURL, 200, mockChats[0], ChatApi.createChat, 1);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "get", mockURL, 404, mockUserErrorResponse, ChatApi.createChat, 1);
        });

        it("[400] should participant is blocked", () => {
            testApiCall(mockAdapter, "get", mockURL, 400, mockUserBlockedErrorResponse, ChatApi.createChat, 1);
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
        const mockChatMessage = {chatId: 1, text: "text"};

        it("[200] should add message Success", () => {
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE, 200, mockMessages[0], ChatApi.addMessage, mockChatMessage);
        });

        it("[404] should chat not found", () => {
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE, 404, mockChatErrorResponse, ChatApi.addMessage, mockChatMessage);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE, 404, mockUserErrorResponse, ChatApi.addMessage, mockChatMessage);
        });

        it("[400] should participant is blocked", () => {
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE, 400, mockUserBlockedErrorResponse, ChatApi.addMessage, mockChatMessage);
        });
    });

    describe("should fetch ChatApi.addMessageWithTweet", () => {
        const mockRequest = {text: "text", tweetId: 1, usersIds: [1, 2]};

        it("[200] should add message with tweet Success", () => {
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE_TWEET, 200, mockMessages, ChatApi.addMessageWithTweet, mockRequest);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "post", API_CHAT_ADD_MESSAGE_TWEET, 404, "Tweet not found", ChatApi.addMessageWithTweet, mockRequest);
        });
    });

    describe("should fetch ChatApi.getParticipant", () => {
        const mockRequest = {participantId: 1, chatId: 1};
        const mockURL = `${API_CHAT_PARTICIPANT}/1/1`;

        it("[200] should get participant Success", () => {
            testApiCall(mockAdapter, "get", mockURL, 200, mockUsers[0], ChatApi.getParticipant, mockRequest);
        });

        it("[404] should chat not found", () => {
            testApiCall(mockAdapter, "get", mockURL, 404, mockChatErrorResponse, ChatApi.getParticipant, mockRequest);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "get", mockURL, 404, mockUserErrorResponse, ChatApi.getParticipant, mockRequest);
        });
    });

    describe("should fetch ChatApi.leaveFromConversation", () => {
        const mockRequest = {participantId: 1, chatId: 1};
        const mockURL = `${API_CHAT_LEAVE}/1/1`;

        it("[200] should leave from conversation Success", () => {
            const mockResponse = "Successfully left the chat";
            testApiCall(mockAdapter, "get", mockURL, 200, mockResponse, ChatApi.leaveFromConversation, mockRequest);
        });

        it("[404] should chat not found", () => {
            testApiCall(mockAdapter, "get", mockURL, 404, mockChatErrorResponse, ChatApi.leaveFromConversation, mockRequest);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "get", mockURL, 404, mockUserErrorResponse, ChatApi.leaveFromConversation, mockRequest);
        });
    });

    describe("should fetch ChatApi.searchParticipantsByUsername", () => {
        it("[200] should leave from conversation Success", () => {
            const mockRequest = {username: "test_username", pageNumber: 1};
            testApiCall(mockAdapter, "get", `${API_CHAT_SEARCH}/test_username`, 200, mockUsers, ChatApi.searchParticipantsByUsername, mockRequest);
        });
    });
});
