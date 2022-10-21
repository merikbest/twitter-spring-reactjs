import {RootState} from "../../store";
import {UserState} from "./contracts/state";
import {LoadingStatus} from "../../types";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";

export const selectUserState = (state: RootState): UserState => state.user;
export const selectUserData = (state: RootState): UserState['data'] => selectUserState(state).data;
export const selectUserDataId = (state: RootState): number | undefined => selectUserState(state).data?.id;
export const selectUserDataNotificationsCount = (state: RootState): number | undefined =>
    selectUserState(state).data?.notificationsCount;
export const selectUserDataUnreadMessagesSize = (state: RootState): number | undefined =>
    selectUserState(state).data?.unreadMessagesSize;
export const selectUserDataFollowerRequestsSize = (state: RootState): number | undefined =>
    selectUserState(state).data?.unreadMessagesSize;
export const selectUserDataIsPrivateProfile = (state: RootState): boolean | undefined =>
    selectUserState(state).data?.isPrivateProfile;
export const selectUserProfileAvatar = (state: RootState) =>
    selectUserData(state)?.avatar.src ? selectUserData(state)?.avatar.src : DEFAULT_PROFILE_IMG;
export const selectUserProfileFullName = (state: RootState) => selectUserData(state)?.fullName;
export const selectUserProfileUsername = (state: RootState) => selectUserData(state)?.username;
export const selectIsAuth = (state: RootState): boolean => !!selectUserState(state).data;
export const selectUserStatus = (state: RootState): UserState['status'] => selectUserState(state).status;
export const selectUserIsSuccess = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.SUCCESS;
export const selectUserIsLoading = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.LOADING;
export const selectUserIsLoaded = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.LOADED;
export const selectUserIsError = (state: RootState): boolean => selectUserState(state).status === LoadingStatus.ERROR;
