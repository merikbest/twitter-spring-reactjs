import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    AddChatMessageActionInterface, AddChatMessageWithTweetActionInterface,
    ChatMessagesActionsType,
    FetchChatMessagesActionInterface
} from "./contracts/actionTypes";
import {ChatApi} from "../../../services/api/chatApi";
import {setChatMessages, setChatMessagesLoadingState} from "./actionCreators";
import {ChatMessage} from "./contracts/state";

export function* fetchChatMessagesRequest({payload}: FetchChatMessagesActionInterface) {
    try {
        setChatMessagesLoadingState(LoadingStatus.LOADING);
        const items: ChatMessage[] = yield call(ChatApi.getChatMessages, payload);
        yield put(setChatMessages(items));
    } catch (error) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* addChatMessageRequest({payload}: AddChatMessageActionInterface) {
    try {
        setChatMessagesLoadingState(LoadingStatus.LOADING);
        yield call(ChatApi.addMessage, payload);
    } catch (error) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* addChatMessageWithTweetRequest({payload}: AddChatMessageWithTweetActionInterface) {
    try {
        setChatMessagesLoadingState(LoadingStatus.LOADING);
        yield call(ChatApi.addMessageWithTweet, payload);
    } catch (error) {
        yield put(setChatMessagesLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatMessagesSaga() {
    yield takeLatest(ChatMessagesActionsType.FETCH_CHAT_MESSAGES, fetchChatMessagesRequest);
    yield takeLatest(ChatMessagesActionsType.ADD_CHAT_MESSAGE, addChatMessageRequest);
    yield takeLatest(ChatMessagesActionsType.ADD_CHAT_MESSAGE_WITH_TWEET, addChatMessageWithTweetRequest);
}
