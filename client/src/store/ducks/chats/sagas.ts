import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    ChatsActionsType,
    CreateChatActionInterface,
    LeaveFromConversationActionInterface
} from "./contracts/actionTypes";
import {setChat, setChats, setChatsLoadingState} from "./actionCreators";
import {ChatApi} from "../../../services/api/chatApi";
import {ChatResponse} from "../../types/chat";

export function* fetchChatsRequest() {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const items: ChatResponse[] = yield call(ChatApi.getUserChats);
        yield put(setChats(items));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createChatRequest({payload}: CreateChatActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        const item: ChatResponse = yield call(ChatApi.createChat, payload);
        yield put(setChat(item));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* leaveFromConversationRequest({payload}: LeaveFromConversationActionInterface) {
    try {
        yield put(setChatsLoadingState(LoadingStatus.LOADING));
        yield call(ChatApi.leaveFromConversation, payload);
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatsSaga() {
    yield takeLatest(ChatsActionsType.FETCH_CHATS, fetchChatsRequest);
    yield takeLatest(ChatsActionsType.CREATE_CHAT, createChatRequest);
    yield takeLatest(ChatsActionsType.LEAVE_FROM_CONVERSATION, leaveFromConversationRequest);
}
