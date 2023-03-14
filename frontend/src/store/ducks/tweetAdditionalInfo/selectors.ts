import { RootState } from "../../store";
import { LoadingStatus } from "../../../types/common";

export const selectTweetAdditionalInfoState = (state: RootState) => state.tweetAdditionalInfo;
export const selectTweetAdditionalInfo = (state: RootState) => selectTweetAdditionalInfoState(state).tweetAdditionalInfo;
export const selectIsTweetBookmarkedAdditionalInfo = (state: RootState) => selectTweetAdditionalInfoState(state).isTweetBookmarked;
export const selectTweetInfoText = (state: RootState) => selectTweetAdditionalInfo(state)?.text;
export const selectTweetInfoReplyType = (state: RootState) => selectTweetAdditionalInfo(state)?.replyType;
export const selectTweetInfoAddressedTweetId = (state: RootState) => selectTweetAdditionalInfo(state)?.addressedTweetId;
export const selectTweetInfoUserId = (state: RootState) => selectTweetAdditionalInfo(state)?.user.id;
export const selectTweetInfoUserFullName = (state: RootState) => selectTweetAdditionalInfo(state)?.user.fullName;
export const selectTweetInfoUserUsername = (state: RootState) => selectTweetAdditionalInfo(state)?.user.username;
export const selectTweetInfoUserIsFollower = (state: RootState) => selectTweetAdditionalInfo(state)?.user.isFollower;
export const selectTweetInfoUserIsUserMuted = (state: RootState) => selectTweetAdditionalInfo(state)?.user.isUserMuted;
export const selectTweetInfoUserIsUserBlocked = (state: RootState) => selectTweetAdditionalInfo(state)?.user.isUserBlocked;
export const selectTweetInfoUserIsMyProfileBlocked = (state: RootState) => selectTweetAdditionalInfo(state)?.user.isMyProfileBlocked;
export const selectIsTweetAdditionalInfoLoading = (state: RootState) =>
    selectTweetAdditionalInfoState(state).loadingState === LoadingStatus.LOADING;
