import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {ListsState} from "./contracts/state";
import {ListResponse, ListUserResponse, PinnedListResponse} from "../../types/lists";

export const selectLists = (state: RootState): ListsState => state.lists;
export const selectLoadingState = (state: RootState): LoadingStatus => selectLists(state).loadingState;
export const selectListsItems = (state: RootState): ListResponse[] => selectLists(state).lists;
export const selectUserListsItems = (state: RootState): ListUserResponse[] => selectLists(state).userLists;
export const selectPinnedListsItems = (state: RootState): PinnedListResponse[] => selectLists(state).pinnedLists;
export const selectIsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectListsLoadingState = (state: RootState): LoadingStatus => selectLists(state).listsLoadingState;
export const selectIsListsLoading = (state: RootState): boolean => selectListsLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListsLoaded = (state: RootState): boolean => selectListsLoadingState(state) === LoadingStatus.LOADED;

export const selectUserListsLoadingState = (state: RootState): LoadingStatus => selectLists(state).userListsLoadingState;
export const selectIsUserListsLoading = (state: RootState): boolean => selectUserListsLoadingState(state) === LoadingStatus.LOADING;
export const selectIsUserListsLoaded = (state: RootState): boolean => selectUserListsLoadingState(state) === LoadingStatus.LOADED;

export const selectPinnedListsLoadingState = (state: RootState): LoadingStatus => selectLists(state).pinnedListsLoadingState;
export const selectIsPinnedListsLoading = (state: RootState): boolean => selectPinnedListsLoadingState(state) === LoadingStatus.LOADING;
export const selectIsPinnedListsLoaded = (state: RootState): boolean => selectPinnedListsLoadingState(state) === LoadingStatus.LOADED;
