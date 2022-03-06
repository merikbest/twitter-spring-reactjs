import {LoadingStatus} from "../../types";
import {RootState} from "../../store";
import {ChatMessageState} from "./contracts/state";

export const selectChatMessages = (state: RootState): ChatMessageState => state.chatMessages;
export const selectChatMessagesItems = (state: RootState) => selectChatMessages(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectChatMessages(state).loadingState;
export const selectIsChatMessagesLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsChatMessagesLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
