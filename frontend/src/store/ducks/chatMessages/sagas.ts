import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
    AddChatMessageActionInterface,
    AddChatMessageWithTweetActionInterface,
    ChatMessagesActionsType,
    FetchChatMessagesActionInterface
} from "./contracts/actionTypes";
import { ChatMessageApi } from "../../../services/api/chat-service/chatMessageApi";
import { setChatMessages, setChatMessagesLoadingState } from "./actionCreators";
import { ChatMessageResponse } from "../../../types/chat";
import { LoadingStatus } from "../../../types/common";

export function* fetchChatMessagesRequest({ payload }: FetchChatMessagesActionInterface) {
    try {
        yield put(setChatMessagesLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatMessageResponse[]> = yield call(ChatMessageApi.getChatMessages, payload);
        yield put(setChatMessages(response.data));
    } catch (error) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* addChatMessageRequest({ payload }: AddChatMessageActionInterface) {
    try {
        yield call(ChatMessageApi.addMessage, payload);
    } catch (error) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* addChatMessageWithTweetRequest({ payload }: AddChatMessageWithTweetActionInterface) {
    try {
        yield put(setChatMessagesLoadingState(LoadingStatus.LOADING));
        yield call(ChatMessageApi.addMessageWithTweet, payload);
    } catch (error) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatMessagesSaga() {
    yield takeLatest(ChatMessagesActionsType.FETCH_CHAT_MESSAGES, fetchChatMessagesRequest);
    yield takeLatest(ChatMessagesActionsType.ADD_CHAT_MESSAGE, addChatMessageRequest);
    yield takeLatest(ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET, addChatMessageWithTweetRequest);
}
