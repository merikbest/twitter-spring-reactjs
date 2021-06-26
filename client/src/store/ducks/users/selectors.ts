import {RootState} from '../../store';
import {UsersState} from './contracts/state';
import {LoadingStatus} from "../../types";

export const selectUsersState = (state: RootState): UsersState => state.users;
export const selectUser = (state: RootState): UsersState['user'] => selectUsersState(state).user;
export const selectUsersItems = (state: RootState): UsersState["users"] => state.users.users;
export const selectUsersIsLoading = (state: RootState): boolean => selectUsersState(state).loadingState === LoadingStatus.LOADING;
