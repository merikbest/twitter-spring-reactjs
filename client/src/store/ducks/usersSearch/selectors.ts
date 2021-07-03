import {RootState} from '../../store';
import {UsersSearchState} from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectUsersSearchState = (state: RootState): UsersSearchState => state.users;
export const selectUsersSearch = (state: RootState): UsersSearchState["users"] => state.users.users;
export const selectUsersSearchIsLoading = (state: RootState): boolean =>
    selectUsersSearchState(state).loadingState === LoadingStatus.LOADING;
