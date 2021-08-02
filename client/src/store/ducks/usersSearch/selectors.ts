import {RootState} from '../../store';
import {UsersSearchState} from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectUsersSearchState = (state: RootState): UsersSearchState => state.usersSearch;
export const selectUsersSearch = (state: RootState): UsersSearchState["users"] => state.usersSearch.users;
export const selectUsersSearchIsLoading = (state: RootState): boolean => selectUsersSearchState(state).loadingState === LoadingStatus.LOADING;
