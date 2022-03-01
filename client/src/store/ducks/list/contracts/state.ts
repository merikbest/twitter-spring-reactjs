import {LoadingStatus} from "../../../types";
import {BaseListResponse, ListOwnerResponse} from "../../../types/lists";
import {TweetResponse} from "../../../types/tweet";
import {Image} from "../../../types/common";

export interface EditListsRequest {
    id?: number;
    name?: string;
    listOwner: ListOwnerResponse;
    description?: string;
    isPrivate?: boolean;
    wallpaper?: Image;
}

export interface ListState {
    list?: BaseListResponse;
    listTweets: TweetResponse[];
    loadingState: LoadingStatus;
}
