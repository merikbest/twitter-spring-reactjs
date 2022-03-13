import {RootState} from '../../store';
import {UserProfileState} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const selectUserProfileState = (state: RootState): UserProfileState => state.userProfile;
export const selectUserProfile = (state: RootState): UserProfileState['user'] => selectUserProfileState(state).user;
export const selectUsersIsLoading = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.LOADING;
export const selectUsersIsSuccessLoaded = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.SUCCESS;
export const selectUsersIsErrorLoaded = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.ERROR;
// images
export const selectImages = (state: RootState): UserProfileState['images'] => selectUserProfileState(state).images;
export const selectImagesIsLoading = (state: RootState): boolean => selectUserProfileState(state).imagesLoadingState === LoadingStatus.LOADING;
export const selectImagesIsSuccessLoaded = (state: RootState): boolean => selectUserProfileState(state).imagesLoadingState === LoadingStatus.SUCCESS;
