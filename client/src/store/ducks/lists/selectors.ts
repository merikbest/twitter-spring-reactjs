import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {Lists, ListsState} from "./contracts/state";
import {ListResponse, ListUserResponse, PinnedListResponse} from "../../types/lists";

export const selectLists = (state: RootState): ListsState => state.lists;
export const selectLoadingState = (state: RootState): LoadingStatus => selectLists(state).loadingState;
export const selectListsItems = (state: RootState): ListResponse[] => selectLists(state).lists;
export const selectUserListsItems = (state: RootState): ListUserResponse[] => selectLists(state).userLists;
export const selectPinnedListsItems = (state: RootState): PinnedListResponse[] => selectLists(state).pinnedLists;
export const selectIsListsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
