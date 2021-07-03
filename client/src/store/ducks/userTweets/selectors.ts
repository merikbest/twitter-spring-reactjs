import {RootState} from "../../store";
import {UserTweetsState} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const selectUserTweetsState = (state: RootState): UserTweetsState => state.userTweets;
export const selectUserTweetsLoadingStatus = (state: RootState): LoadingStatus => selectUserTweetsState(state).loadingState;
export const selectIsUserTweetsLoading = (state: RootState): boolean => selectUserTweetsLoadingStatus(state) === LoadingStatus.LOADING;
export const selectUserTweetsItems = (state: RootState) => selectUserTweetsState(state).items;
