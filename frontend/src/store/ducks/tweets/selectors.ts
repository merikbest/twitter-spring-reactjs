import { RootState } from "../../store";
import { TweetsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectTweetsState = (state: RootState): TweetsState => state.tweets;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweetsState(state).loadingState;
export const selectIsTweetsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;

export const selectTweetsItems = (state: RootState) => selectTweetsState(state).items;
export const selectTweetsItemsSize = (state: RootState) => selectTweetsState(state).items.length;
export const selectPagesCount = (state: RootState) => selectTweetsState(state).pagesCount;
