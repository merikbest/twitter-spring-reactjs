import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import {
    ChatsActionsType,
    CreateChatActionInterface,
    LeaveFromConversationActionInterface
} from "./contracts/actionTypes";
import { setChat, setChats, setChatsLoadingState } from "./actionCreators";
import { ChatApi } from "../../../services/api/chat-service/chatApi";
import { ChatParticipantApi } from "../../../services/api/chat-service/chatParticipantApi";
import { ChatResponse } from "../../../types/chat";
import { LoadingStatus } from "../../../types/common";

export function* fetchChatsRequest() {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatResponse[]> = yield call(ChatApi.getUserChats);
        yield put(setChats(response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createChatRequest({ payload }: CreateChatActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatResponse> = yield call(ChatApi.createChat, payload);
        yield put(setChat(response.data));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* leaveFromConversationRequest({ payload }: LeaveFromConversationActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        yield call(ChatParticipantApi.leaveFromConversation, payload);
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatsSaga() {
    yield takeLatest(ChatsActionsType.FETCH_CHATS, fetchChatsRequest);
    yield takeLatest(ChatsActionsType.CREATE_CHAT, createChatRequest);
    yield takeLatest(ChatsActionsType.LEAVE_FROM_CONVERSATION, leaveFromConversationRequest);
}
