import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { ChatResponse } from "../../../types/chat";
import { ChatApi } from "../../../services/api/chat-service/chatApi";
import { ChatActionsType, FetchChatActionInterface } from "./contracts/actionTypes";
import { setChat, setChatLoadingState } from "./actionCreators";
import { LoadingStatus } from "../../../types/common";

export function* fetchChatRequest({ payload }: FetchChatActionInterface) {
    try {
        yield put(setChatLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<ChatResponse> = yield call(ChatApi.getChatById, payload);
        yield put(setChat(response.data));
    } catch (error) {
        yield put(setChatLoadingState(LoadingStatus.ERROR));
    }
}

export function* chatSaga() {
    yield takeLatest(ChatActionsType.FETCH_CHAT, fetchChatRequest);
}
