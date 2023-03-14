import { RootState } from "../../store";
import { ListMembersState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

const selectListMembers = (state: RootState): ListMembersState => state.listMembers;

export const selectListMembersItems = (state: RootState) => selectListMembers(state).members;
export const selectMembersLoadingState = (state: RootState): LoadingStatus => selectListMembers(state).membersLoadingState;
export const selectIsListMembersLoading = (state: RootState): boolean => selectMembersLoadingState(state) === LoadingStatus.LOADING;

export const selectListSuggestedItems = (state: RootState) => selectListMembers(state).suggested;
export const selectSuggestedLoadingState = (state: RootState): LoadingStatus => selectListMembers(state).suggestedLoadingState;
export const selectIsListSuggestedError = (state: RootState): boolean => selectSuggestedLoadingState(state) === LoadingStatus.ERROR;
