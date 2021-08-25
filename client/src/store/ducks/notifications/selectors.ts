import {LoadingStatus} from "../../types";
import {RootState} from "../../store";
import {NotificationsState} from "./contracts/state";

export const selectNotifications = (state: RootState): NotificationsState => state.notifications;
export const selectNotificationsItems = (state: RootState) => selectNotifications(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectNotifications(state).loadingState;
export const selectIsNotificationsLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsNotificationsLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
