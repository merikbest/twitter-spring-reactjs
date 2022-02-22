import {LoadingStatus} from "../../types";
import {RootState} from "../../store";
import {FollowerRequestsState} from "./contracts/state";

export const selectFollowerRequests = (state: RootState): FollowerRequestsState => state.followerRequests;
export const selectFollowerRequestsItems = (state: RootState) => selectFollowerRequests(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectFollowerRequests(state).loadingState;
export const selectIsFollowerRequestsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsFollowerRequestsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
