import { BaseListResponse } from "../../../../types/lists";
import { LoadingStatus } from "../../../../types/common";
import { TweetResponse } from "../../../../types/tweet";

export interface ListState {
    list?: BaseListResponse;
    loadingState: LoadingStatus;
    tweets: TweetResponse[];
    pagesCount: number;
    loadingTweetsState: LoadingStatus;
}

export interface EditListsRequest {
    id?: number;
    listName?: string;
    description?: string;
    isPrivate?: boolean;
    wallpaper?: string;
}

export interface TweetsByListIdRequest {
    listId: number,
    pageNumber: number
}
