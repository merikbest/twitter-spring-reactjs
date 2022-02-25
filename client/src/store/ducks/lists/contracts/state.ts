import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";
import {User} from "../../user/contracts/state";
import {ListResponse, ListUserResponse, PinnedListResponse} from "../../../types/lists";

export interface Lists {
    id: number;
    name: string;
    description: string;
    private: boolean;
    pinnedDate?: string;
    listOwner: User;
    altWallpaper: string;
    wallpaper?: Image;
    tweets: Tweet[];
    members: User[];
    followers: User[];
}

export interface AddLists {
    name: string;
    description?: string;
    isPrivate: boolean;
    altWallpaper: string;
    wallpaper?: Image;
}

export interface EditLists {
    id?: number;
    name?: string;
    listOwner: User;
    description?: string;
    isPrivate?: boolean;
    wallpaper?: Image;
}

export interface MemberToList {
    userId: number;
    listId: number;
}

export interface ListsState {
    lists: ListResponse[];
    userLists: ListUserResponse[];
    pinnedLists: PinnedListResponse[];
    loadingState: LoadingStatus;
}
