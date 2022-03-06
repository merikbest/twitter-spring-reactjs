import {LoadingStatus} from "../../../types";
import {ListResponse, ListUserResponse, PinnedListResponse, SimpleListResponse} from "../../../types/lists";
import {Image} from "../../../types/common";

export interface AddLists {
    name: string;
    description?: string;
    isPrivate: boolean;
    altWallpaper: string;
    wallpaper?: Image;
}

export interface AddUserToListsRequest {
    userId: number;
    lists: { listId: number; isMemberInList: boolean; }[];
}

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
