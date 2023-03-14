import { RootState } from "../../store";
import { UsersState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const selectUsersState = (state: RootState): UsersState => state.users;
export const selectUsers = (state: RootState): UsersState["users"] => state.users.users;
export const selectPagesCount = (state: RootState): UsersState["pagesCount"] => selectUsersState(state).pagesCount;
export const selectUsersIsLoading = (state: RootState): boolean => selectUsersState(state).loadingState === LoadingStatus.LOADING;
