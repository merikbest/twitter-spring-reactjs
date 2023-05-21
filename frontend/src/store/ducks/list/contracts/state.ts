import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";
import { CommonUserResponse } from "../../../../types/user";

export interface ListState {
    list?: BaseListResponse;
    loadingState: LoadingStatus;
}

export interface EditListsRequest {
    id?: number;
    name?: string;
    listOwner: CommonUserResponse;
    description?: string;
    isPrivate?: boolean;
    wallpaper?: string;
}
