import {RootState} from '../../store';
import {UserDetailState} from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectUserDetail = (state: RootState): UserDetailState => state.userDetail;
export const selectUserDetailItem = (state: RootState) => selectUserDetail(state).item;
export const selectLoadingState = (state: RootState): LoadingStatus => selectUserDetail(state).loadingState;
export const selectIsUserDetailLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsUserDetailLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
