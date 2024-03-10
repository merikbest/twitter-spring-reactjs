import { RootState } from "../../store";
import { LoadingStatus } from "../../../types/common";

export const selectTweetAdditionalInfoState = (state: RootState) => state.tweetAdditionalInfo;
export const selectTweetAdditionalInfo = (state: RootState) => selectTweetAdditionalInfoState(state).tweetAdditionalInfo;
export const selectIsTweetBookmarkedAdditionalInfo = (state: RootState) => selectTweetAdditionalInfoState(state).isTweetBookmarked;
export const selectTweetInfoText = (state: RootState) => selectTweetAdditionalInfo(state)?.text;
export const selectTweetInfoReplyType = (state: RootState) => selectTweetAdditionalInfo(state)?.replyType;
export const selectTweetInfoAddressedTweetId = (state: RootState) => selectTweetAdditionalInfo(state)?.addressedTweetId;
export const selectTweetInfoUserId = (state: RootState) => selectTweetAdditionalInfo(state)?.author.id;
export const selectTweetInfoUserFullName = (state: RootState) => selectTweetAdditionalInfo(state)?.author.fullName;
export const selectTweetInfoUserUsername = (state: RootState) => selectTweetAdditionalInfo(state)?.author.username;
export const selectTweetInfoUserIsFollower = (state: RootState) => selectTweetAdditionalInfo(state)?.author.isFollower;
export const selectTweetInfoUserIsUserMuted = (state: RootState) => selectTweetAdditionalInfo(state)?.author.isUserMuted;
export const selectTweetInfoUserIsUserBlocked = (state: RootState) => selectTweetAdditionalInfo(state)?.author.isUserBlocked;
export const selectTweetInfoUserIsMyProfileBlocked = (state: RootState) => selectTweetAdditionalInfo(state)?.author.isMyProfileBlocked;
export const selectIsTweetAdditionalInfoLoading = (state: RootState) =>
    selectTweetAdditionalInfoState(state).loadingState === LoadingStatus.LOADING;
