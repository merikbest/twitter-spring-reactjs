import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {ListState} from "./contracts/state";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";

export const selectList = (state: RootState): ListState => state.list;
export const selectListItem = (state: RootState): ListState["list"] => selectList(state).list;
export const selectListItemId = (state: RootState) => selectListItem(state)?.id;
export const selectListItemName = (state: RootState) => selectListItem(state)?.name;
export const selectListItemDescription = (state: RootState) => selectListItem(state)?.description;
export const selectListItemIsPrivate = (state: RootState) => selectListItem(state)?.isPrivate;
export const selectListItemIsFollower = (state: RootState) => selectListItem(state)?.isFollower;
export const selectListItemOwnerId = (state: RootState) => selectListItem(state)?.listOwner.id;
export const selectListItemOwnerAvatar = (state: RootState) =>
    selectListItem(state)?.listOwner.avatar ? selectListItem(state)?.listOwner.avatar.src : DEFAULT_PROFILE_IMG;
export const selectListItemOwnerWallpaper = (state: RootState) =>
    selectListItem(state)?.wallpaper ? selectListItem(state)?.wallpaper.src : selectListItem(state)?.altWallpaper;
export const selectListItemOwnerUsername = (state: RootState) => selectListItem(state)?.listOwner.username;
export const selectListItemOwnerFullName = (state: RootState) => selectListItem(state)?.listOwner.fullName;



export const selectLoadingState = (state: RootState): LoadingStatus => selectList(state).loadingState;
export const selectIsListLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
