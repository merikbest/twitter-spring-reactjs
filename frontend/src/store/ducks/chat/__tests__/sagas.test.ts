import { AxiosResponse } from "axios";

import { ChatResponse } from "../../../../types/chat";
import { testCall, testLoadingStatus, testSetResponse } from "../../../../util/test-utils/test-helper";
import { LoadingStatus } from "../../../../types/common";
import { ChatApi } from "../../../../services/api/chat-service/chatApi";
import { fetchChatRequest } from "../sagas";
import { fetchChat, setChat, setChatLoadingState } from "../actionCreators";
import { mockChats } from "../../../../util/test-utils/mock-test-data";

describe("chatSaga:", () => {
    describe("fetchChatRequest:", () => {
        const mockChatMessageResponse = { data: mockChats[0] } as AxiosResponse<ChatResponse>;
        const worker = fetchChatRequest(fetchChat(1));
        testLoadingStatus(worker, setChatLoadingState, LoadingStatus.LOADING);
        testCall(worker, ChatApi.getChatById, 1);
        testSetResponse(worker, mockChatMessageResponse, setChat, mockChatMessageResponse.data, "ChatResponse");
        testLoadingStatus(worker, setChatLoadingState, LoadingStatus.ERROR);
    });
});
