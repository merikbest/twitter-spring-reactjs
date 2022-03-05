import {LoadingStatus} from "../../../types";
import {ListsOwnerMemberResponse} from "../../../types/lists";

export interface ListMembersState {
    members: ListsOwnerMemberResponse[];
    membersLoadingState: LoadingStatus;
    suggested: ListsOwnerMemberResponse[];
    suggestedLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
}
