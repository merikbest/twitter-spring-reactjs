import {RootState} from "../../store";
import {LoadingStatus} from "../../types";
import {ListState} from "./contracts/state";
import {Lists} from "../lists/contracts/state";

export const selectList = (state: RootState): ListState => state.list;
export const selectLoadingState = (state: RootState): LoadingStatus => selectList(state).loadingState;
export const selectListItem = (state: RootState): Lists | undefined => selectList(state).list;
export const selectIsListLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
