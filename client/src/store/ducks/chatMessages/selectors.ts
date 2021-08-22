import {LoadingStatus} from "../../types";
import {RootState} from "../../store";
import {ChatMessageState} from "./contracts/state";

export const selectChatMessages = (state: RootState): ChatMessageState => state.chatMessages;
export const selectChatMessagesItems = (state: RootState) => selectChatMessages(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectChatMessages(state).loadingState;
export const selectIsChatsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsChatsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
