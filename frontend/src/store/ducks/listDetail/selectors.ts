import { RootState } from "../../store";
import { ListDetailState } from "./contracts/state";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { LoadingStatus } from "../../../types/common";

export const selectListDetail = (state: RootState): ListDetailState => state.listDetail;
export const selectListDetailItem = (state: RootState) => selectListDetail(state).item;
export const selectListDetailItemId = (state: RootState) => selectListDetailItem(state)?.id;
export const selectListDetailItemName = (state: RootState) => selectListDetailItem(state)?.name;
export const selectListDetailItemDescription = (state: RootState) => selectListDetailItem(state)?.description;
export const selectListDetailItemFollowersSize = (state: RootState) => selectListDetailItem(state)?.followersSize;
export const selectListDetailItemMembersSize = (state: RootState) => selectListDetailItem(state)?.membersSize;
export const selectListDetailItemIsFollower = (state: RootState) => selectListDetailItem(state)?.isFollower;
export const selectListDetailItemWallpaper = (state: RootState) =>
    selectListDetailItem(state)?.wallpaper ?? selectListDetailItem(state)?.altWallpaper;
export const selectListDetailItemOwnerId = (state: RootState) => selectListDetailItem(state)?.listOwner.id;
export const selectListDetailItemOwnerFullName = (state: RootState) => selectListDetailItem(state)?.listOwner.fullName;
export const selectListDetailItemOwnerUsername = (state: RootState) => selectListDetailItem(state)?.listOwner.username;
export const selectListDetailItemOwnerAvatar = (state: RootState) =>
    selectListDetailItem(state)?.listOwner.avatar ?? DEFAULT_PROFILE_IMG;
export const selectLoadingState = (state: RootState): LoadingStatus => selectListDetail(state).loadingState;
export const selectIsListDetailLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListDetailLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
