import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {AddFormState, TweetsState} from "./contracts/state";

export const selectTweetsState = (state: RootState): TweetsState => state.tweets;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweetsState(state).loadingState;
export const selectAddFormState = (state: RootState): AddFormState => selectTweetsState(state).addFormState;
export const selectIsTweetsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items;
