import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {Tweet} from "../tweets/contracts/state";
import {TweetState} from "./contracts/state";

export const selectTweet = (state: RootState): TweetState => state.tweet;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweet(state).loadingState;
export const selectIsTweetLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetLoadedSuccess = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.SUCCESS;
export const selectIsTweetError = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.ERROR;
export const selectTweetData = (state: RootState): Tweet | undefined => selectTweet(state).data;
