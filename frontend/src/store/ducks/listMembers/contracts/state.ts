import { ListsOwnerMemberResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

export interface ListMembersState {
    members: ListsOwnerMemberResponse[];
    membersLoadingState: LoadingStatus;
    suggested: ListsOwnerMemberResponse[];
    suggestedLoadingState: LoadingStatus;
}


export interface ListUsersRequest {
    listId: number;
    listOwnerId: number;
}

export interface SearchListUsersRequest {
    listId: number;
    username: string;
}

export interface ProcessUserListRequest {
    userId: number;
    listId: number;
    isSuggested?: boolean;
}

export interface UserToListPayload {
    userId: number;
    isUserAdded: boolean;
    isSuggested?: boolean;
}
