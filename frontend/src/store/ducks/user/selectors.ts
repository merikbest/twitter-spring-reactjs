import { RootState } from "../../store";
import { UserState } from "./contracts/state";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { LoadingStatus } from "../../../types/common";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserData = (state: RootState): UserState["data"] => selectUserState(state).data;
export const selectUserDataId = (state: RootState) => selectUserData(state)?.id;
export const selectUserDataNotificationsCount = (state: RootState) => {
    const userData = selectUserData(state);
    if (userData) {
        return userData.notificationsCount + userData.mentionsCount;
    } else {
        return 0;
    }
};
export const selectUserDataMentionsCount = (state: RootState) => selectUserData(state)?.mentionsCount;
export const selectUserDataUnreadMessagesCount = (state: RootState) => selectUserData(state)?.unreadMessagesCount;
export const selectUserDataFollowerRequestsSize = (state: RootState) => selectUserData(state)?.followerRequestsSize;
export const selectUserDataIsPrivateProfile = (state: RootState) => selectUserData(state)?.isPrivateProfile;
export const selectUserDataIsProfileStarted = (state: RootState) => selectUserData(state)?.profileStarted;
export const selectUserDataIsMutedDirectMessages = (state: RootState) => selectUserData(state)?.isMutedDirectMessages;
export const selectUserProfileAvatar = (state: RootState) => selectUserData(state)?.avatar ?? DEFAULT_PROFILE_IMG;
export const selectUserProfileFullName = (state: RootState) => selectUserData(state)?.fullName;
export const selectUserProfileUsername = (state: RootState) => selectUserData(state)?.username;
export const selectUserProfileCountryCode = (state: RootState) => selectUserData(state)?.countryCode;
export const selectUserProfilePhone = (state: RootState) => selectUserData(state)?.phone;
export const selectUserProfileLanguage = (state: RootState) => selectUserData(state)?.language;
export const selectUserProfileCountry = (state: RootState) => selectUserData(state)?.country;
export const selectUserProfileGender = (state: RootState) => selectUserData(state)?.gender;
export const selectUserProfileLocation = (state: RootState) => selectUserData(state)?.location;
export const selectUserProfileEmail = (state: RootState) => selectUserData(state)?.email;
export const selectUserProfileWebsite = (state: RootState) => selectUserData(state)?.website;
export const selectUserProfileRegistrationDate = (state: RootState) => selectUserData(state)?.registrationDate;
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
