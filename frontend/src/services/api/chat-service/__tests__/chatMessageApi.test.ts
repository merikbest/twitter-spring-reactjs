import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import {
    UI_V1_CHAT_ADD_MESSAGE,
    UI_V1_CHAT_ADD_MESSAGE_TWEET,
    UI_V1_CHAT_ID_MESSAGES,
    UI_V1_CHAT_ID_READ_MESSAGES
} from "../../../../constants/endpoint-constants";
import { mockMessages } from "../../../../util/test-utils/mock-test-data";
import { ChatMessageApi } from "../chatMessageApi";

describe("ChatMessageApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "Participant not found";
    const mockUserBlockedErrorResponse = "Participant is blocked";
    const mockChatErrorResponse = "Chat not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ChatMessageApi.getChatMessages", () => {
        it("[200] should create chat Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_CHAT_ID_MESSAGES(1), 200, mockMessages, ChatMessageApi.getChatMessages, 1);
        });
    });

    describe("should fetch ChatMessageApi.readChatMessages", () => {
        it("[200] should read chat messages Success", () => {
            testApiCall(mockAdapter, "onGet", UI_V1_CHAT_ID_READ_MESSAGES(1), 200, 7, ChatMessageApi.readChatMessages, 1);
        });
    });

    describe("should fetch ChatMessageApi.addMessage", () => {
        const mockChatMessage = { chatId: 1, text: "text" };

        it("[200] should add message Success", () => {
            testApiCall(mockAdapter, "onPost", UI_V1_CHAT_ADD_MESSAGE, 200, mockMessages[0], ChatMessageApi.addMessage, mockChatMessage);
        });

        it("[404] should chat not found", () => {
            testApiCall(mockAdapter, "onPost", UI_V1_CHAT_ADD_MESSAGE, 404, mockChatErrorResponse, ChatMessageApi.addMessage, mockChatMessage);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "onPost", UI_V1_CHAT_ADD_MESSAGE, 404, mockUserErrorResponse, ChatMessageApi.addMessage, mockChatMessage);
        });

        it("[400] should participant is blocked", () => {
            testApiCall(mockAdapter, "onPost", UI_V1_CHAT_ADD_MESSAGE, 400, mockUserBlockedErrorResponse, ChatMessageApi.addMessage, mockChatMessage);
        });
    });

    describe("should fetch ChatMessageApi.addMessageWithTweet", () => {
        const mockRequest = { text: "text", tweetId: 1, usersIds: [1, 2] };

        it("[200] should add message with tweet Success", () => {
            testApiCall(mockAdapter, "onPost", UI_V1_CHAT_ADD_MESSAGE_TWEET, 200, mockMessages, ChatMessageApi.addMessageWithTweet, mockRequest);
        });

        it("[404] should tweet not found", () => {
            testApiCall(mockAdapter, "onPost", UI_V1_CHAT_ADD_MESSAGE_TWEET, 404, "Tweet not found", ChatMessageApi.addMessageWithTweet, mockRequest);
        });
    });
});
