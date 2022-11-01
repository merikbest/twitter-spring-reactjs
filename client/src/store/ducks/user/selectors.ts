import {RootState} from "../../store";
import {UserState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserData = (state: RootState): UserState["data"] => selectUserState(state).data;
export const selectUserDataId = (state: RootState) => selectUserState(state).data?.id;
export const selectUserDataNotificationsCount = (state: RootState) => selectUserState(state).data?.notificationsCount;
export const selectUserDataUnreadMessagesSize = (state: RootState) => selectUserState(state).data?.unreadMessagesSize;
export const selectUserDataFollowerRequestsSize = (state: RootState) => selectUserState(state).data?.unreadMessagesSize;
export const selectUserDataIsPrivateProfile = (state: RootState) => selectUserState(state).data?.isPrivateProfile;
export const selectUserDataIsProfileStarted = (state: RootState) => selectUserState(state).data?.profileStarted;
export const selectUserProfileAvatar = (state: RootState) =>
    selectUserData(state)?.avatar ? selectUserData(state)?.avatar.src : DEFAULT_PROFILE_IMG;
export const selectUserProfileFullName = (state: RootState) => selectUserData(state)?.fullName;
export const selectUserProfileUsername = (state: RootState) => selectUserData(state)?.username;
export const selectUserPinnedTweetId = (state: RootState) => selectUserData(state)?.pinnedTweetId;
export const selectUserFollowingSize = (state: RootState) => selectUserData(state)?.followingSize;
export const selectUserFollowersSize = (state: RootState) => selectUserData(state)?.followersSize;
export const selectUserProfileCustomized = (state: RootState) => selectUserData(state)?.profileCustomized;

export const selectIsAuth = (state: RootState): boolean => !!selectUserState(state).data;
export const selectUserStatus = (state: RootState): UserState["status"] => selectUserState(state).status;
export const selectUserIsSuccess = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.SUCCESS;
export const selectUserIsLoading = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.LOADING;
export const selectUserIsLoaded = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.LOADED;
export const selectUserIsError = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.ERROR;
