import { RootState } from "../../store";
import { FollowerRequestsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectFollowerRequests = (state: RootState): FollowerRequestsState => state.followerRequests;
export const selectFollowerRequestsItems = (state: RootState) => selectFollowerRequests(state).items;
export const selectFollowerRequestsPagesCount = (state: RootState) => selectFollowerRequests(state).pagesCount;
export const selectLoadingState = (state: RootState): LoadingStatus => selectFollowerRequests(state).loadingState;
export const selectIsFollowerRequestsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
