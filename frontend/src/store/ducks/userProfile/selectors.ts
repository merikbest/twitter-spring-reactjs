import { RootState } from "../../store";
import { UserProfileState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectUserProfileState = (state: RootState): UserProfileState => state.userProfile;
export const selectUserProfile = (state: RootState): UserProfileState["user"] => selectUserProfileState(state).user;
export const selectUsersIsLoading = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.LOADING;
export const selectUsersIsSuccessLoaded = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.SUCCESS;
export const selectUsersIsErrorLoaded = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.ERROR;

export const selectUserProfileId = (state: RootState) => selectUserProfileState(state).user?.id;
export const selectUserProfileFullName = (state: RootState) => selectUserProfileState(state).user?.fullName;
export const selectUserProfileUsername = (state: RootState) => selectUserProfileState(state).user?.username;
export const selectUserProfileAbout = (state: RootState) => selectUserProfileState(state).user?.about;
export const selectUserProfileLocation = (state: RootState) => selectUserProfileState(state).user?.location;
export const selectUserProfileWebsite = (state: RootState) => selectUserProfileState(state).user?.website;
export const selectUserProfileBirthday = (state: RootState) => selectUserProfileState(state).user?.birthday;
export const selectUserProfileRegistrationDate = (state: RootState) => selectUserProfileState(state).user?.registrationDate;
export const selectUserProfileWallpaper = (state: RootState) => selectUserProfileState(state).user?.wallpaper;
export const selectUserProfileAvatar = (state: RootState) => selectUserProfileState(state).user?.avatar;
export const selectUserProfileFollowersSize = (state: RootState) => selectUserProfileState(state).user?.followersSize;
export const selectUserProfileFollowingSize = (state: RootState) => selectUserProfileState(state).user?.followingSize;
export const selectUserProfileSameFollowers = (state: RootState) => selectUserProfileState(state).user?.sameFollowers;
export const selectUserProfilePinnedTweetId = (state: RootState) => selectUserProfileState(state).user?.pinnedTweetId;

export const selectUserProfileIsFollower = (state: RootState) => selectUserProfileState(state).user?.isFollower;
export const selectUserProfileIsUserBlocked = (state: RootState) => selectUserProfileState(state).user?.isUserBlocked;
export const selectUserProfileIsUserMuted = (state: RootState) => selectUserProfileState(state).user?.isUserMuted;
export const selectUserProfileIsPrivateProfile = (state: RootState) => selectUserProfileState(state).user?.isPrivateProfile;
export const selectUserProfileIsSubscriber = (state: RootState) => selectUserProfileState(state).user?.isSubscriber;
export const selectUserProfileIsMutedDirectMessages = (state: RootState) => selectUserProfileState(state).user?.isMutedDirectMessages;
export const selectUserProfileIsWaitingForApprove = (state: RootState) => selectUserProfileState(state).user?.isWaitingForApprove;
export const selectUserProfileIsMyProfileBlocked = (state: RootState) => selectUserProfileState(state).user?.isMyProfileBlocked;

export const selectUserProfileMediaTweetCount = (state: RootState) => selectUserProfileState(state).user?.mediaTweetCount;
export const selectUserProfileLikeCount = (state: RootState) => selectUserProfileState(state).user?.likeCount;
export const selectUserProfileTweetCount = (state: RootState) => selectUserProfileState(state).user?.tweetCount;

// images
export const selectImages = (state: RootState): UserProfileState["images"] => selectUserProfileState(state).images;
export const selectImagesIsLoading = (state: RootState): boolean => selectUserProfileState(state).imagesLoadingState === LoadingStatus.LOADING;
export const selectImagesIsSuccessLoaded = (state: RootState): boolean => selectUserProfileState(state).imagesLoadingState === LoadingStatus.SUCCESS;
