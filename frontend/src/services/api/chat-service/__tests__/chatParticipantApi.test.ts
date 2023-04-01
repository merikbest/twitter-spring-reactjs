import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { testApiCall } from "../../../../util/test-utils/api-test-helper";
import { API_CHAT_LEAVE, API_CHAT_PARTICIPANT, API_CHAT_SEARCH } from "../../../../constants/endpoint-constants";
import { mockUsers } from "../../../../util/test-utils/mock-test-data";
import { ChatParticipantApi } from "../chatParticipantApi";

describe("ChatParticipantApi", () => {
    const mockAdapter = new MockAdapter(axios);
    const mockUserErrorResponse = "Participant not found";
    const mockChatErrorResponse = "Chat not found";

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ChatParticipantApi.getParticipant", () => {
        const mockRequest = { participantId: 1, chatId: 1 };
        const mockURL = `${API_CHAT_PARTICIPANT}/1/1`;

        it("[200] should get participant Success", () => {
            testApiCall(mockAdapter, "onGet", mockURL, 200, mockUsers[0], ChatParticipantApi.getParticipant, mockRequest);
        });

        it("[404] should chat not found", () => {
            testApiCall(mockAdapter, "onGet", mockURL, 404, mockChatErrorResponse, ChatParticipantApi.getParticipant, mockRequest);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "onGet", mockURL, 404, mockUserErrorResponse, ChatParticipantApi.getParticipant, mockRequest);
        });
    });

    describe("should fetch ChatParticipantApi.leaveFromConversation", () => {
        const mockRequest = { participantId: 1, chatId: 1 };
        const mockURL = `${API_CHAT_LEAVE}/1/1`;

        it("[200] should leave from conversation Success", () => {
            const mockResponse = "Successfully left the chat";
            testApiCall(mockAdapter, "onGet", mockURL, 200, mockResponse, ChatParticipantApi.leaveFromConversation, mockRequest);
        });

        it("[404] should chat not found", () => {
            testApiCall(mockAdapter, "onGet", mockURL, 404, mockChatErrorResponse, ChatParticipantApi.leaveFromConversation, mockRequest);
        });

        it("[404] should participant not found", () => {
            testApiCall(mockAdapter, "onGet", mockURL, 404, mockUserErrorResponse, ChatParticipantApi.leaveFromConversation, mockRequest);
        });
    });

    describe("should fetch ChatParticipantApi.searchParticipantsByUsername", () => {
        it("[200] should leave from conversation Success", () => {
            const mockRequest = { username: "test_username", pageNumber: 1 };
            testApiCall(mockAdapter, "onGet", `${API_CHAT_SEARCH}/test_username`, 200, mockUsers, ChatParticipantApi.searchParticipantsByUsername, mockRequest);
        });
    });
});
