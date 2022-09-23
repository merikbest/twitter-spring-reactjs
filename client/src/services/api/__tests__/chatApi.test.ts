import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {API_CHAT_CREATE, API_CHAT_MESSAGES, API_CHAT_READ_MESSAGES, API_CHAT_USERS} from "../../../util/endpoints";
import {testApiCall} from "../../../util/testHelper";
import {ChatApi} from "../chatApi";
import {mockChats, mockMessages} from "../../../util/mockData/mockData";

describe("ChatApi", () => {
    const mockAdapter = new MockAdapter(axios);

    beforeEach(() => mockAdapter.reset());

    describe("should fetch ChatApi.getUserChats", () => {
        it("[200] should get user chats Success", () => {
            mockAdapter.onGet(API_CHAT_USERS).reply(200, mockChats);
            ChatApi.getUserChats().then((response) => {
                testApiCall(200, response, API_CHAT_USERS, mockChats);
            });
        });
    });

    describe("should fetch ChatApi.createChat", () => {
        it("[200] should create chat Success", () => {
            mockAdapter.onGet(API_CHAT_CREATE).reply(200, mockChats[0]);
            ChatApi.createChat(1).then((response) => {
                testApiCall(200, response, API_CHAT_CREATE, mockChats[0]);
            });
        });
    });

    describe("should fetch ChatApi.getChatMessages", () => {
        it("[200] should create chat Success", () => {
            mockAdapter.onGet(API_CHAT_MESSAGES(1)).reply(200, mockMessages);
            ChatApi.getChatMessages(1).then((response) => {
                testApiCall(200, response, API_CHAT_MESSAGES(1), mockMessages);
            });
        });
    });

    describe("should fetch ChatApi.readChatMessages", () => {
        it("[200] should read chat messages Success", () => {
            console.log(API_CHAT_READ_MESSAGES(1))
            mockAdapter.onGet(API_CHAT_READ_MESSAGES(1)).reply(200, 7);
            ChatApi.readChatMessages(1).then((response) => {
                testApiCall(200, response, API_CHAT_READ_MESSAGES(1), 7);
            });
        });
    });
});
