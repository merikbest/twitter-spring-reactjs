import {LoadingStatus} from "../../../types";
import {ListsOwnerMemberResponse} from "../../../types/lists";

export interface AddUserToLists {
    userId: number;
    listId: number;
    lists: { id: number }[];
}

export interface ListMembersState {
    items: ListsOwnerMemberResponse[];
    loadingState: LoadingStatus;
}
