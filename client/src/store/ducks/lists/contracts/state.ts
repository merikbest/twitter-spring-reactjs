import {LoadingStatus} from "../../../types";
import {Image, Tweet} from "../../tweets/contracts/state";
import {User} from "../../user/contracts/state";

export interface Lists {
    id: number;
    name: string;
    description: string;
    isPrivate: boolean;
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

export interface AddTweetToLists {
    tweetId: string;
    lists: Lists[];
}

export interface AddUserToLists {
    userId: number;
    lists: Lists[];
}

export interface ListsState {
    lists: Lists[];
    userLists: Lists[];
    loadingState: LoadingStatus;
}
