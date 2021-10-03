import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";
import {User} from "../../user/contracts/state";

export interface Lists {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
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
    description?: string;
    isPrivate?: boolean;
    wallpaper?: Image;
}

export interface AddUserToLists {
    userId: number;
    listId: number;
    lists: Lists[];
}

export interface MemberToList {
    userId: number;
    listId: number;
}

export interface ListsState {
    lists: Lists[];
    userLists: Lists[];
    pinnedLists: Lists[];
    loadingState: LoadingStatus;
}
