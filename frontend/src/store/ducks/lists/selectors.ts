import { RootState } from "../../store";
import { ListsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectLists = (state: RootState): ListsState => state.lists;
export const selectLoadingState = (state: RootState): LoadingStatus => selectLists(state).loadingState;
export const selectListsItems = (state: RootState): ListsState["lists"] => selectLists(state).lists;
export const selectUserListsItems = (state: RootState): ListsState["userLists"] => selectLists(state).userLists;
export const selectPinnedListsItems = (state: RootState): ListsState["pinnedLists"] => selectLists(state).pinnedLists;
export const selectSimpleListsItems = (state: RootState): ListsState["simpleLists"] => selectLists(state).simpleLists;
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

export const selectSimpleListsLoadingState = (state: RootState): LoadingStatus => selectLists(state).simpleListsLoadingState;
export const selectIsSimpleListsLoading = (state: RootState): boolean => selectSimpleListsLoadingState(state) === LoadingStatus.LOADING;
export const selectIsSimpleListsLoaded = (state: RootState): boolean => selectSimpleListsLoadingState(state) === LoadingStatus.LOADED;
