import { RootState } from "../../store";
import { TweetState } from "./contracts/state";
import { TweetResponse } from "../../../types/tweet";
import { UserResponse } from "../../../types/user";

import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { LoadingStatus } from "../../../types/common";

const selectTweetState = (state: RootState): TweetState => state.tweet;
const selectLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).loadingState;
export const selectIsTweetLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsTweetLoadedSuccess = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.SUCCESS;
export const selectIsTweetError = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.ERROR;
export const selectTweetData = (state: RootState): TweetResponse | undefined => selectTweetState(state).tweet;
export const selectUsersPagesCount = (state: RootState): number => selectTweetState(state).usersPagesCount;
export const selectErrorMessage = (state: RootState): string => selectTweetState(state).errorMessage;

export const selectTweetId = (state: RootState) => selectTweetState(state).tweet?.id;
export const selectTweetText = (state: RootState) => selectTweetState(state).tweet?.text;
export const selectTweetReplyType = (state: RootState) => selectTweetState(state).tweet?.replyType;

export const selectIsTweetLiked = (state: RootState) => selectTweetState(state).tweet?.isTweetLiked;
export const selectIsTweetRetweeted = (state: RootState) => selectTweetState(state).tweet?.isTweetRetweeted;
export const selectRepliesCount = (state: RootState) => selectTweetState(state).tweet?.repliesCount;
export const selectRetweetsCount = (state: RootState) => selectTweetState(state).tweet?.retweetsCount;
export const selectQuotesCount = (state: RootState) => selectTweetState(state).tweet?.quotesCount;
export const selectLikedTweetsCount = (state: RootState) => selectTweetState(state).tweet?.likedTweetsCount;
export const selectTweetDateTime = (state: RootState) => selectTweetState(state).tweet?.dateTime;
export const selectTweetImages = (state: RootState) => selectTweetState(state).tweet?.images;
export const selectTweetImageDescription = (state: RootState) => selectTweetState(state).tweet?.imageDescription;
export const selectTweetTaggedImageUsers = (state: RootState) => selectTweetState(state).tweet?.taggedImageUsers;
export const selectTweetPoll = (state: RootState) => selectTweetState(state).tweet?.poll;
export const selectTweetQuote = (state: RootState) => selectTweetState(state).tweet?.quoteTweet;
export const selectTweetList = (state: RootState) => selectTweetState(state).tweet?.tweetList;
export const selectTweetGifImage = (state: RootState) => selectTweetState(state).tweet?.gifImage;

// user
export const selectTweetUser = (state: RootState) => selectTweetState(state).tweet?.user;
export const selectTweetUserId = (state: RootState) => selectTweetState(state).tweet?.user.id;
export const selectTweetUserAvatar = (state: RootState) => (
    selectTweetState(state).tweet?.user.avatar ?? DEFAULT_PROFILE_IMG
);
export const selectTweetUserUsername = (state: RootState) => selectTweetState(state).tweet?.user.username;
export const selectTweetUserFullName = (state: RootState) => selectTweetState(state).tweet?.user.fullName;
export const selectTweetUserIsFollower = (state: RootState) => selectTweetState(state).tweet?.user.isFollower;

export const selectTweetLink = (state: RootState) => selectTweetState(state).tweet?.link;
export const selectLinkCover = (state: RootState) => selectTweetState(state).tweet?.linkCover;
export const selectLinkCoverSize = (state: RootState) => selectTweetState(state).tweet?.linkCoverSize;
export const selectLinkTitle = (state: RootState) => selectTweetState(state).tweet?.linkTitle;
export const selectLinkDescription = (state: RootState) => selectTweetState(state).tweet?.linkDescription;

// liked and retweeted users
export const selectLikedUsers = (state: RootState): UserResponse[] => selectTweetState(state).likedUsers;
const selectLikedUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).likedUsersLoadingState;
export const selectIsLikedUsersLoading = (state: RootState): boolean => selectLikedUsersLoadingState(state) === LoadingStatus.LOADING;

export const selectRetweetedUsers = (state: RootState): UserResponse[] => selectTweetState(state).retweetedUsers;
const selectRetweetedUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).retweetedUsersLoadingState;
export const selectIsRetweetedUsersLoading = (state: RootState): boolean => selectRetweetedUsersLoadingState(state) === LoadingStatus.LOADING;

export const selectTaggedImageUsers = (state: RootState): UserResponse[] => selectTweetState(state).taggedImageUsers;
const selectTaggedImageUsersLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).taggedImageUsersLoadingState;
export const selectIsTaggedImageUsersLoading = (state: RootState): boolean => selectTaggedImageUsersLoadingState(state) === LoadingStatus.LOADING;

// replies
export const selectReplies = (state: RootState): TweetResponse[] => selectTweetState(state).replies;
const selectRepliesLoadingState = (state: RootState): LoadingStatus => selectTweetState(state).repliesLoadingState;
export const selectIsRepliesLoading = (state: RootState): boolean => selectRepliesLoadingState(state) === LoadingStatus.LOADING;
