import produce, { Draft } from "immer";

import { UsersSearchState } from "./contracts/state";
import { UsersSearchActions, UsersSearchActionsType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialUsersSearchState: UsersSearchState = {
    users: [],
    pagesCount: 1,
    followers: [],
    loadingState: LoadingStatus.LOADING
};

export const usersSearchReducer = produce((draft: Draft<UsersSearchState>, action: UsersSearchActions) => {
    switch (action.type) {
        case UsersSearchActionsType.SET_USERS:
            draft.users = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersSearchActionsType.SET_PAGEABLE_USERS:
            draft.users = [...draft.users, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersSearchActionsType.SET_PAGEABLE_FOLLOWERS:
            draft.followers = [...draft.followers, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE:
            const userIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            if (userIndex !== -1) draft.users[userIndex].isFollower = action.payload.isFollower;
            const followerIndex = draft.followers.findIndex((user) => user.id === action.payload.userId);
            if (followerIndex !== -1) draft.followers[followerIndex].isFollower = action.payload.isFollower;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE:
            const followUserRequestIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            if (followUserRequestIndex !== -1) draft.users[followUserRequestIndex].isWaitingForApprove = action.payload.isWaitingForApprove;
            const followerRequestIndex = draft.followers.findIndex((user) => user.id === action.payload.userId);
            if (followerRequestIndex !== -1) draft.followers[followerRequestIndex].isWaitingForApprove = action.payload.isWaitingForApprove;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE:
            const userBlockIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            if (userBlockIndex !== -1) draft.users[userBlockIndex].isUserBlocked = action.payload.isUserBlocked;
            const followerBlockIndex = draft.followers.findIndex((user) => user.id === action.payload.userId);
            if (followerBlockIndex !== -1) draft.followers[followerBlockIndex].isUserBlocked = action.payload.isUserBlocked;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersSearchActionsType.RESET_USERS_STATE:
            draft.users = [];
            draft.followers = [];
            draft.pagesCount = 1;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UsersSearchActionsType.SET_USERS_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersSearchState);
