import { SameFollowerResponse } from "./common";

export interface UserProfileResponse {
    id: number;
    fullName: string;
    username: string;
    location: string;
    about: string;
    website: string;
    country: string;
    birthday: string;
    registrationDate: string;
    tweetCount: number;
    mediaTweetCount: number;
    likeCount: number;
    isMutedDirectMessages: boolean;
    isPrivateProfile: boolean;
    avatar: string;
    wallpaper: string;
    pinnedTweetId: number;
    followersSize: number;
    followingSize: number;
    isUserMuted: boolean;
    isUserBlocked: boolean;
    isMyProfileBlocked: boolean;
    isWaitingForApprove: boolean;
    isFollower: boolean;
    isSubscriber: boolean;
    sameFollowers: SameFollowerResponse[];
}

export interface UserResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: string | null;
    isPrivateProfile: boolean;
    isMutedDirectMessages: boolean;
    isUserBlocked: boolean;
    isMyProfileBlocked: boolean;
    isWaitingForApprove: boolean;
    isUserChatParticipant?: boolean;
    isFollower: boolean;
}

export interface CommonUserResponse {
    id: number;
    fullName: string;
    username: string;
    avatar: string;
    isPrivateProfile: boolean;
}

export interface TaggedUserResponse {
    id: number;
    fullName: string;
}

export interface SearchResultResponse {
    text: string;
    tweetCount: number;
    tags: string[];
    users: CommonUserResponse[];
}

export interface AuthUserResponse {
    id: number;
    email: string;
    fullName: string;
    username: string;
    location: string;
    about: string;
    website: string;
    countryCode: string;
    phone: number;
    country: string;
    gender: string;
    language: string;
    birthday: string;
    registrationDate: string;
    tweetCount: number;
    mediaTweetCount: number;
    likeCount: number;
    notificationsCount: number;
    mentionsCount: number;
    active: boolean;
    profileCustomized: boolean;
    profileStarted: boolean;
    isMutedDirectMessages: boolean;
    isPrivateProfile: boolean;
    backgroundColor: string;
    colorScheme: string;
    avatar: string;
    wallpaper: string;
    pinnedTweetId: number;
    followersSize: number;
    followingSize: number;
    followerRequestsSize: number;
    unreadMessagesCount: number;
}

export interface BlockedUserResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: string;
    isPrivateProfile: boolean;
    isUserBlocked: boolean;
}

export interface MutedUserResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: string;
    isPrivateProfile: boolean;
    isUserMuted: boolean;
}

export interface FollowerUserResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: string;
}

export interface UserDetailResponse {
    id: number;
    fullName: string;
    username: string;
    about: string;
    avatar: string;
    isPrivateProfile: boolean;
    isUserBlocked: boolean;
    isMyProfileBlocked: boolean;
    isWaitingForApprove: boolean;
    isFollower: boolean;
    followersSize: number;
    followingSize: number;
    sameFollowers: SameFollowerResponse[];
}
