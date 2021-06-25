import {RootState} from '../../store';
import {UsersState} from './contracts/state';

export const selectUsersState = (state: RootState): UsersState => state.users;
export const selectUser = (state: RootState): UsersState['user'] => selectUsersState(state).user;
export const selectUsersItems = (state: RootState): UsersState["users"] => state.users.users;

