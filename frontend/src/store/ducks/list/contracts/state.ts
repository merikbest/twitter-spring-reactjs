import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";

export interface ListState {
    list?: BaseListResponse;
    loadingState: LoadingStatus;
}

export interface EditListsRequest {
    id?: number;
    listName?: string;
    description?: string;
    isPrivate?: boolean;
    wallpaper?: string;
}
