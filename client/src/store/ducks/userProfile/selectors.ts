import {RootState} from '../../store';
import {UserProfileState} from "./contracts/state";
import {LoadingStatus} from "../../types";

export const selectUserProfileState = (state: RootState): UserProfileState => state.userProfile;
export const selectUserProfile = (state: RootState): UserProfileState['user'] => selectUserProfileState(state).user;
export const selectUsersIsLoading = (state: RootState): boolean => selectUserProfileState(state).loadingState === LoadingStatus.LOADING;
