import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {TweetState} from "./contracts/state";
import {TweetResponse} from "../../types/tweet";
import {UserResponse} from "../../types/user";

export const selectTweetState = (state: RootState): TweetState => state.tweet;
export const selectLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).loadingState;
export const selectIsTweetLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetLoadedSuccess = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.SUCCESS;
export const selectIsTweetError = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.ERROR;
export const selectTweetData = (state: RootState): TweetResponse | undefined => selectTweetState(state).tweet;

// liked and retweeted users
export const selectLikedUsers = (state: RootState): UserResponse[] => selectTweetState(state).likedUsers;
export const selectLikedUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).likedUsersLoadingState;
export const selectIsLikedUsersLoading = (state: RootState): boolean => selectLikedUsersLoadingState(state) === LoadingStatus.LOADING;
export const selectIsLikedUsersLoadedSuccess = (state: RootState): boolean => selectLikedUsersLoadingState(state) === LoadingStatus.SUCCESS;

export const selectRetweetedUsers = (state: RootState): UserResponse[] => selectTweetState(state).retweetedUsers;
export const selectRetweetedUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).retweetedUsersLoadingState;
export const selectIsRetweetedUsersLoading = (state: RootState): boolean => selectRetweetedUsersLoadingState(state) === LoadingStatus.LOADING;
export const selectIsRetweetedUsersLoadedSuccess = (state: RootState): boolean => selectRetweetedUsersLoadingState(state) === LoadingStatus.SUCCESS;

// replies
export const selectReplies = (state: RootState): TweetResponse[] => selectTweetState(state).replies;
export const selectRepliesLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).repliesLoadingState;
export const selectIsRepliesLoading = (state: RootState): boolean => selectRepliesLoadingState(state) === LoadingStatus.LOADING;
export const selectIsRepliesLoadedSuccess = (state: RootState): boolean => selectRepliesLoadingState(state) === LoadingStatus.SUCCESS;
