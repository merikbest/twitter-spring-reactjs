import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {TweetState} from "./contracts/state";
import {TweetResponse} from "../../types/tweet";
import {UserResponse} from "../../types/user";

const selectTweetState = (state: RootState): TweetState => state.tweet;
const selectLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).loadingState;
export const selectIsTweetLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetLoadedSuccess = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.SUCCESS;
export const selectIsTweetError = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.ERROR;
export const selectTweetData = (state: RootState): TweetResponse | undefined => selectTweetState(state).tweet;
export const selectUsersPagesCount = (state: RootState): number => selectTweetState(state).usersPagesCount;
export const selectErrorMessage = (state: RootState): string => selectTweetState(state).errorMessage;

export const selectTweetId = (state: RootState): number | undefined => selectTweetState(state).tweet?.id;
export const selectIsTweetLiked = (state: RootState): boolean | undefined => selectTweetState(state).tweet?.isTweetLiked;
export const selectIsTweetRetweeted = (state: RootState): boolean | undefined => selectTweetState(state).tweet?.isTweetRetweeted;
export const selectRetweetsCount = (state: RootState): number | undefined => selectTweetState(state).tweet?.retweetsCount;
export const selectQuotesCount = (state: RootState): number | undefined => selectTweetState(state).tweet?.quotesCount;
export const selectLikedTweetsCount = (state: RootState): number | undefined => selectTweetState(state).tweet?.likedTweetsCount;
export const selectTweetDateTime = (state: RootState): string | undefined => selectTweetState(state).tweet?.dateTime;

// liked and retweeted users
export const selectLikedUsers = (state: RootState): UserResponse[] => selectTweetState(state).likedUsers;
const selectLikedUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).likedUsersLoadingState;
export const selectIsLikedUsersLoading = (state: RootState): boolean => selectLikedUsersLoadingState(state) === LoadingStatus.LOADING;

export const selectRetweetedUsers = (state: RootState): UserResponse[] => selectTweetState(state).retweetedUsers;
const selectRetweetedUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).retweetedUsersLoadingState;
export const selectIsRetweetedUsersLoading = (state: RootState): boolean => selectRetweetedUsersLoadingState(state) === LoadingStatus.LOADING;

// replies
export const selectReplies = (state: RootState): TweetResponse[] => selectTweetState(state).replies;
const selectRepliesLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).repliesLoadingState;
export const selectIsRepliesLoading = (state: RootState): boolean => selectRepliesLoadingState(state) === LoadingStatus.LOADING;
