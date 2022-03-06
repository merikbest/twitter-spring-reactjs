import {Image} from "./common";

export interface BaseListResponse {
    id: number;
    name: string;
    description: string;
    pinnedDate: string;
    altWallpaper: string;
    wallpaper: Image
    listOwner: ListOwnerResponse;
    isPrivate: boolean;
    isFollower: boolean;
    membersSize: number;
    followersSize: number;
}

export interface ListOwnerResponse {
    id: number;
    fullName: string;
    username: string;
    avatar: Image
}

export interface ListMemberResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    isPrivateProfile: boolean;
    avatar: Image
}

export interface ListsOwnerMemberResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: Image
    isPrivateProfile: boolean;
    isMemberInList?: boolean;
}

export interface ListResponse {
    id: number;
    name: string;
    description: string;
    pinnedDate: string;
    altWallpaper: string;
    wallpaper: Image
    listOwner: ListOwnerResponse;
    isFollower: boolean;
}

export interface ListUserResponse {
    id: number;
    name: string;
    description: string;
    pinnedDate: string;
    altWallpaper: string;
    wallpaper: Image
    listOwner: ListOwnerResponse;
    isPrivate: boolean;
}

export interface PinnedListResponse {
    id: number;
    name: string;
    pinnedDate: string;
    altWallpaper: string;
    wallpaper: Image
    isPrivate: boolean;
}

export interface SimpleListResponse {
    id: number;
    name: string;
    altWallpaper: string;
    wallpaper: Image
    isMemberInList: boolean;
    isPrivate: boolean;
}
