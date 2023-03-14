import { RootState } from "../../store";
import { BlockedAndMutedUsersState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectBlockedAndMutedUsersState = (state: RootState): BlockedAndMutedUsersState => state.blockedAndMutedUsers;
export const selectMutedUsersItems = (state: RootState) => selectBlockedAndMutedUsersState(state).mutedUsers;
export const selectBlockedUsersItems = (state: RootState) => selectBlockedAndMutedUsersState(state).blockedUsers;
export const selectUsersPagesCount = (state: RootState) => selectBlockedAndMutedUsersState(state).pagesCount;
export const selectLoadingState = (state: RootState): LoadingStatus => selectBlockedAndMutedUsersState(state).loadingState;
export const selectIsBlockedAndMutedUsersLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsBlockedAndMutedUsersLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
