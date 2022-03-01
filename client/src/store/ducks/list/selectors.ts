import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {ListState} from "./contracts/state";
import {BaseListResponse} from "../../types/lists";
import {TweetResponse} from "../../types/tweet";

export const selectList = (state: RootState): ListState => state.list;
export const selectLoadingState = (state: RootState): LoadingStatus => selectList(state).loadingState;
export const selectListItem = (state: RootState): BaseListResponse | undefined => selectList(state).list;
export const selectListItemTweets = (state: RootState): TweetResponse[] => selectList(state).listTweets;
export const selectIsListLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
