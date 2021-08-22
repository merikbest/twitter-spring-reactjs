import {LoadingStatus} from "../../types";
import {RootState} from "../../store";
import {ChatsState} from "./contracts/state";

export const selectChats = (state: RootState): ChatsState => state.chats;
export const selectChatsItems = (state: RootState) => selectChats(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectChats(state).loadingState;
export const selectIsChatsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsChatsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

