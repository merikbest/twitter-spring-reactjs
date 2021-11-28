import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {ChatsActionsType, CreateChatActionInterface} from "./contracts/actionTypes";
import {setChat, setChats, setChatsLoadingState} from "./actionCreators";
import {Chat} from "./contracts/state";
import {ChatApi} from "../../../services/api/chatApi";

export function* fetchChatsRequest() {
    try {
        setChatsLoadingState(LoadingStatus.LOADING);
        const items: Chat[] = yield call(ChatApi.getUserChats);
        yield put(setChats(items));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* createChatRequest({payload}: CreateChatActionInterface) {
    try {
        setChatsLoadingState(LoadingStatus.LOADING);
        const item: Chat = yield call(ChatApi.createChat, payload);
        yield put(setChat(item));
    } catch (error) {
        yield put(setChatsLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatsSaga() {
    yield takeLatest(ChatsActionsType.FETCH_CHATS, fetchChatsRequest);
    yield takeLatest(ChatsActionsType.CREATE_CHAT, createChatRequest);
}
