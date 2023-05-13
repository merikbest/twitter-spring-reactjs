import { ListResponse, ListUserResponse, PinnedListResponse, SimpleListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

export interface ListsState {
    lists: ListResponse[];
    listsLoadingState: LoadingStatus;
    userLists: ListUserResponse[];
    userListsLoadingState: LoadingStatus;
    pinnedLists: PinnedListResponse[];
    pinnedListsLoadingState: LoadingStatus;
    simpleLists: SimpleListResponse[];
    simpleListsLoadingState: LoadingStatus;
    loadingState: LoadingStatus;
}

export interface ListsRequest {
    name: string;
    description?: string;
    isPrivate: boolean;
    altWallpaper?: string;
    wallpaper?: string;
}

export interface AddUserToListsRequest {
    userId: number;
    lists: {
        listId: number;
        isMemberInList: boolean;
    }[];
}

export interface UpdateListsPayload {
    listId: number;
    isMember: boolean;
}
