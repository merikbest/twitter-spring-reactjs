import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {Lists, ListsState} from "./contracts/state";

export const selectLists = (state: RootState): ListsState => state.lists;
export const selectLoadingState = (state: RootState): LoadingStatus => selectLists(state).loadingState;
export const selectListsItems = (state: RootState): Lists[] => selectLists(state).lists;
export const selectUserListsItems = (state: RootState): Lists[] => selectLists(state).userLists;
export const selectPinnedListsItems = (state: RootState): Lists[] => selectLists(state).pinnedLists;
export const selectIsListsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
