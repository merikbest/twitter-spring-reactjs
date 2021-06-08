import {RootState} from "../../store";
import { Tweet } from "../tweets/contracts/state";
import {LoadingState, TweetState} from "./contracts/state";

export const selectTweet = (state: RootState): TweetState => state.tweet;
export const selectLoadingState = (state: RootState): LoadingState => selectTweet(state).loadingState;
export const selectIsTweetLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingState.LOADING;
export const selectIsTweetLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingState.LOADED;
export const selectTweetData = (state: RootState): Tweet | undefined => selectTweet(state).data;
// export const selectTweetData = createSelector(selectTweet, (tweet) => tweet.data);
// export const selectTweetData = (state: RootState): TweetState['data'] => selectTweet(state).data;
