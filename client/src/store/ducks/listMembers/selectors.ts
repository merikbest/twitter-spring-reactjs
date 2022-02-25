import {RootState} from '../../store';
import {ListMembersState} from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectListMembers = (state: RootState): ListMembersState => state.listMembers;
export const selectListMembersItems = (state: RootState) => selectListMembers(state).items;
export const selectLoadingState = (state: RootState): LoadingStatus => selectListMembers(state).loadingState;
export const selectIsListMembersLoading = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADING;
export const selectIsListMembersLoaded = (state: RootState): boolean => selectLoadingState(state) === LoadingStatus.LOADED;
