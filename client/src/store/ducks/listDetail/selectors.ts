import {RootState} from '../../store';
import {ListDetailState} from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectListDetail = (state: RootState): ListDetailState => state.listDetail;
export const selectListDetailItem = (state: RootState) => selectListDetail(state).item;
export const selectLoadingState = (state: RootState): LoadingStatus => selectListDetail(state).loadingState;
export const selectIsListDetailLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListDetailLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
