import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {TweetState} from "./contracts/state";
import {TweetResponse} from "../../types/tweet";

export const selectTweet = (state: RootState): TweetState => state.tweet;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweet(state).loadingState;
export const selectIsTweetLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetLoadedSuccess = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.SUCCESS;
export const selectIsTweetError = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.ERROR;
export const selectTweetData = (state: RootState): TweetResponse | undefined => selectTweet(state).data;
