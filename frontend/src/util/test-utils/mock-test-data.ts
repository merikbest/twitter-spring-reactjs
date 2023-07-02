import { QuoteTweetResponse, TweetAdditionalInfoResponse, TweetImageResponse, TweetResponse } from "../../types/tweet";
import {
    AuthUserResponse,
    BlockedUserResponse,
    FollowerUserResponse,
    MutedUserResponse,
    UserDetailResponse,
    UserProfileResponse,
    UserResponse
} from "../../types/user";
import {
    BaseListResponse,
    ListResponse,
    ListsOwnerMemberResponse,
    ListUserResponse,
    PinnedListResponse,
    SimpleListResponse
} from "../../types/lists";
import { ChatMessageResponse, ChatResponse } from "../../types/chat";
import { NotificationInfoResponse, NotificationResponse, NotificationUserResponse } from "../../types/notification";
import { TagResponse } from "../../types/tag";
import { SameFollowerResponse } from "../../types/common";
import { TopicCategory, TopicResponse } from "../../types/topic";

export const mockTweets = [
    {
        "id": 1,
        "text": "My #FirstTweet :slightly_smiling_face:",
        "dateTime": "2021-10-15T21:20:15",
        "scheduledDate": null,
        "addressedUsername": null,
        "addressedId": null,
        "addressedTweetId": null,
        "replyType": "EVERYONE",
        "link": null,
        "linkTitle": null,
        "linkDescription": null,
        "linkCover": null,
        "linkCoverSize": null,
        "user": {
            "id": 1,
            "email": "user2015@gmail.com",
            "fullName": "Random",
            "username": "Random",
            "avatar": {
                "id": 11,
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
            },
            "isPrivateProfile": false,
            "isFollower": true,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [],
        "quoteTweet": null,
        "poll": null,
        "retweetsCount": 0,
        "likedTweetsCount": 2,
        "repliesCount": 0,
        "isTweetLiked": true,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": true,
        "isTweetDeleted": false,
        "isTweetBookmarked": true
    },
    {
        "id": 15,
        "text": "Hello :wave:",
        "dateTime": "2021-10-15T22:11:59",
        "scheduledDate": null,
        "addressedUsername": null,
        "addressedId": null,
        "addressedTweetId": null,
        "replyType": "EVERYONE",
        "link": null,
        "linkTitle": null,
        "linkDescription": null,
        "linkCover": null,
        "linkCoverSize": null,
        "user": {
            "id": 1,
            "email": "user2015@gmail.com",
            "fullName": "Random",
            "username": "Random",
            "avatar": {
                "id": 11,
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
            },
            "isPrivateProfile": false,
            "isFollower": true,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [],
        "quoteTweet": {
            "id": 13,
            "text": "#JavaScript",
            "dateTime": "2021-10-15T21:57:21",
            "link": null,
            "linkTitle": null,
            "linkDescription": null,
            "linkCover": null,
            "linkCoverSize": null,
            "user": {
                "id": 4,
                "email": "user2019@gmail.com",
                "fullName": "JavaCat",
                "username": "JavaCat",
                "avatar": {
                    "id": 5,
                    "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png"
                },
                "isPrivateProfile": false,
                "isFollower": false,
                "isMyProfileBlocked": false,
                "isUserBlocked": false,
                "isUserMuted": false
            }
        },
        "poll": null,
        "retweetsCount": 0,
        "likedTweetsCount": 1,
        "repliesCount": 0,
        "isTweetLiked": true,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": true,
        "isTweetDeleted": false,
        "isTweetBookmarked": true
    }
] as unknown as TweetResponse[];

export const mockUser = {
    "id": 2,
    "email": "user2016@gmail.com",
    "fullName": "MrCat",
    "username": "Cat",
    "location": "New York",
    "about": "Hello twitter!",
    "website": "https://www.google.com",
    "countryCode": "UA",
    "phone": 666966623,
    "country": "UA",
    "gender": "Cat",
    "language": "Ukrainian - українська",
    "birthday": "Jan 15, 2005",
    "registrationDate": "2021-08-01T23:34:32",
    "tweetCount": 4,
    "mediaTweetCount": 25,
    "likeCount": 30,
    "notificationsCount": 0,
    "mentionsCount": 0,
    "active": true,
    "profileCustomized": false,
    "profileStarted": true,
    "backgroundColor": "DEFAULT",
    "colorScheme": "BLUE",
    "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
    "wallpaper": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg",
    "pinnedTweetId": 102,
    "followersSize": 1,
    "followingSize": 1,
    "followerRequestsSize": null,
    "unreadMessagesCount": 0,
    "isMutedDirectMessages": false,
    "isPrivateProfile": false
} as unknown as AuthUserResponse;

export const mockUsers = [
    {
        "id": 4,
        "fullName": "JavaCat",
        "username": "JavaCat",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
        "isPrivateProfile": false,
        "isMutedDirectMessages": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": false
    },
    {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "about": null,
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "isPrivateProfile": false,
        "isMutedDirectMessages": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": true
    }
] as unknown as UserResponse[];

export const createMockMyProfile = (followersSize: number = 1, followingSize: number = 1): UserProfileResponse => {
    return {
        "id": 2,
        "fullName": "MrCat",
        "username": "Cat",
        "location": "New York",
        "about": "Hello twitter!",
        "website": "https://www.google.com",
        "country": "UA",
        "birthday": "Jan 15, 2005",
        "registrationDate": "2021-08-01T23:34:32",
        "tweetCount": 4,
        "mediaTweetCount": 25,
        "likeCount": 30,
        "notificationsCount": 0,
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
        "wallpaper": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg",
        "pinnedTweetId": 0,
        "followersSize": followersSize,
        "followingSize": followingSize,
        "sameFollowers": [{
            "id": 1,
            "fullName": "Random",
            "username": "Random",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
        }],
        "isMutedDirectMessages": false,
        "isPrivateProfile": false,
        "isUserMuted": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": false,
        "isSubscriber": false
    } as unknown as UserProfileResponse;
};

export const mockMyProfile = {
    "id": 2,
    "fullName": "MrCat",
    "username": "Cat",
    "location": "New York",
    "about": "Hello twitter!",
    "website": "https://www.google.com",
    "country": "UA",
    "birthday": null,
    "registrationDate": "2021-08-01T23:34:32",
    "tweetCount": 4,
    "mediaTweetCount": 25,
    "likeCount": 30,
    "notificationsCount": 0,
    "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
    "wallpaper": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg",
    "pinnedTweetId": 0,
    "followersSize": 1,
    "followingSize": 1,
    "sameFollowers": [{
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
    }],
    "isMutedDirectMessages": false,
    "isPrivateProfile": false,
    "isUserMuted": false,
    "isUserBlocked": false,
    "isMyProfileBlocked": false,
    "isWaitingForApprove": false,
    "isFollower": false,
    "isSubscriber": false
} as unknown as UserProfileResponse;

export const createMockUserProfile = (followersSize: number = 1, followingSize: number = 1): UserProfileResponse => {
    return {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "location": null,
        "about": null,
        "website": null,
        "country": null,
        "birthday": null,
        "registrationDate": "2021-11-15T14:05:08",
        "tweetCount": 0,
        "mediaTweetCount": 0,
        "likeCount": 1,
        "notificationsCount": 1,
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "wallpaper": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/dfc8a223-45fc-43da-8b7c-f76e2c2507cd_82ecbca14eb4999212c07257f41c70e7.jpg",
        "pinnedTweetId": 1,
        "followersSize": followersSize,
        "followingSize": followingSize,
        "sameFollowers": [],
        "isMutedDirectMessages": false,
        "isPrivateProfile": false,
        "isUserMuted": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": true,
        "isSubscriber": false
    } as unknown as UserProfileResponse;
};

export const mockUserProfile = {
    "id": 1,
    "fullName": "Random",
    "username": "Random",
    "location": null,
    "about": null,
    "website": null,
    "country": null,
    "birthday": null,
    "registrationDate": "2021-11-15T14:05:08",
    "tweetCount": 0,
    "mediaTweetCount": 0,
    "likeCount": 1,
    "notificationsCount": 1,
    "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
    "wallpaper": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/dfc8a223-45fc-43da-8b7c-f76e2c2507cd_82ecbca14eb4999212c07257f41c70e7.jpg",
    "pinnedTweetId": 1,
    "followersSize": 2,
    "followingSize": 4,
    "sameFollowers": [],
    "isMutedDirectMessages": false,
    "isPrivateProfile": false,
    "isUserMuted": false,
    "isUserBlocked": false,
    "isMyProfileBlocked": false,
    "isWaitingForApprove": false,
    "isFollower": true,
    "isSubscriber": false
} as unknown as UserProfileResponse;

export const mockUserPrivateProfile = {
    "id": 3,
    "fullName": "Kitty",
    "username": "Kitty",
    "location": "New York",
    "about": "Hello twitter!",
    "website": "https://www.google.com",
    "country": null,
    "birthday": null,
    "registrationDate": "2021-08-01T23:34:32",
    "tweetCount": 0,
    "mediaTweetCount": 0,
    "likeCount": 0,
    "notificationsCount": 2,
    "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg",
    "wallpaper": null,
    "pinnedTweetId": 0,
    "followersSize": 1,
    "followingSize": 0,
    "sameFollowers": [{
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
    }],
    "isMutedDirectMessages": true,
    "isPrivateProfile": true,
    "isUserMuted": false,
    "isUserBlocked": false,
    "isMyProfileBlocked": false,
    "isWaitingForApprove": false,
    "isFollower": false,
    "isSubscriber": false
} as unknown as UserProfileResponse;

export const mockUserDetailResponse = {
    id: 1,
    followersSize: 2,
    followingSize: 4,
    fullName: "Random",
    isFollower: true,
    isMyProfileBlocked: false,
    isPrivateProfile: false,
    isUserBlocked: false,
    isWaitingForApprove: false,
    sameFollowers: [],
    username: "Random",
    about: "About",
    avatar: "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
} as unknown as UserDetailResponse;

export const mockProfileImages = [
    {
        "tweetId": 6,
        "imageId": 1,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/0a6c735d-def8-4587-a29f-221915ef6cb4_ff2d023b3220f93bbc79233614dea542.jpg"
    },
    {
        "tweetId": 5,
        "imageId": 1001,
        "src": "https://pbs.twimg.com/media/FNsBisCVQAEVY4K?format=jpg&name=medium"
    }
] as unknown as TweetImageResponse[];

export const mockBlockedUsers = [
    {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "about": "about",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "isPrivateProfile": false,
        "isUserBlocked": true
    },
    {
        "id": 3,
        "fullName": "Kitty",
        "username": "Kitty",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg",
        "isPrivateProfile": true,
        "isUserBlocked": true
    }
] as unknown as BlockedUserResponse[];

export const mockMutedUsers = [
    {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "about": "about",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "isPrivateProfile": false,
        "isUserMuted": true
    },
    {
        "id": 3,
        "fullName": "Kitty",
        "username": "Kitty",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg",
        "isPrivateProfile": true,
        "isUserMuted": true
    }
] as unknown as MutedUserResponse[];

export const mockFollowerUserResponse = [
    {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "about": "about",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
    },
    {
        "id": 3,
        "fullName": "Kitty",
        "username": "Kitty",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg"
    }
] as unknown as FollowerUserResponse[];

export const mockSameFollowers = [
    {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
    },
    {
        "id": 11,
        "fullName": "Random11",
        "username": "Random11",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
    }
] as unknown as SameFollowerResponse[];

export const mockMediaTweets = [
    {
        "id": 12,
        "text": "#myCat  :smiley_cat:",
        "dateTime": "2021-10-15T21:23:41",
        "scheduledDate": null,
        "addressedUsername": null,
        "addressedId": null,
        "addressedTweetId": null,
        "replyType": "MENTION",
        "link": null,
        "linkTitle": null,
        "linkDescription": null,
        "linkCover": null,
        "linkCoverSize": null,
        "user": {
            "id": 5,
            "email": "user2018@gmail.com",
            "fullName": "КотБегемот",
            "username": "Кот Бегемот",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif",
            "isPrivateProfile": false,
            "isFollower": false,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [{
            "id": 8,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a2692fac-4b70-4828-845c-2fe439473f82_Cl5DjoUWYAAslnd.jfif"
        }],
        "quoteTweet": null,
        "poll": null,
        "retweetsCount": 0,
        "likedTweetsCount": 0,
        "repliesCount": 0,
        "isTweetLiked": false,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": false,
        "isTweetDeleted": false,
        "isTweetBookmarked": false
    },
    {
        "id": 10,
        "text": "#myCat  :kissing_cat:",
        "dateTime": "2021-10-15T21:21:48",
        "scheduledDate": null,
        "addressedUsername": null,
        "addressedId": null,
        "addressedTweetId": null,
        "replyType": "EVERYONE",
        "link": null,
        "linkTitle": null,
        "linkDescription": null,
        "linkCover": null,
        "linkCoverSize": null,
        "user": {
            "id": 4,
            "email": "user2019@gmail.com",
            "fullName": "JavaCat",
            "username": "JavaCat",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
            "isPrivateProfile": false,
            "isFollower": false,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [{
            "id": 6,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ac48eb0e-73e7-4887-a523-47c5a557d1ad_Ec1OBK3XsAEjVZR.png"
        }],
        "quoteTweet": null,
        "poll": null,
        "retweetsCount": 2,
        "likedTweetsCount": 1,
        "repliesCount": 1,
        "isTweetLiked": true,
        "isTweetRetweeted": true,
        "isUserFollowByOtherUser": false,
        "isTweetDeleted": false,
        "isTweetBookmarked": false
    }
];

export const mockVideoTweets = [
    {
        "id": 4,
        "text": "https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO",
        "dateTime": "2021-10-15T21:20:22",
        "scheduledDate": null,
        "addressedUsername": null,
        "addressedId": null,
        "addressedTweetId": null,
        "replyType": "EVERYONE",
        "link": "https://www.youtube.com/watch?v=hTWKbfoikeg&ab_channel=NirvanaVEVO",
        "linkTitle": "Nirvana - Smells Like Teen Spirit (Official Music Video)",
        "linkDescription": null,
        "linkCover": "https://i.ytimg.com/vi/hTWKbfoikeg/mqdefault.jpg",
        "linkCoverSize": null,
        "user": {
            "id": 1,
            "email": "user2015@gmail.com",
            "fullName": "Random",
            "username": "Random",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isPrivateProfile": false,
            "isFollower": true,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [],
        "quoteTweet": null,
        "poll": null,
        "retweetsCount": 0,
        "likedTweetsCount": 1,
        "repliesCount": 0,
        "isTweetLiked": true,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": true,
        "isTweetDeleted": false,
        "isTweetBookmarked": false
    }
];

// lists
export const mockFullList = {
    "id": 3,
    "name": "Hello World!",
    "description": "Hello from my list",
    "isListPinned": true,
    "altWallpaper": "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small",
    "wallpaper": null,
    "listOwner": {
        "id": 2,
        "fullName": "MrCat",
        "username": "Cat",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
        "isPrivateProfile": false
    },
    "membersSize": 2,
    "followersSize": 0,
    "isPrivate": false,
    "isFollower": false
} as unknown as BaseListResponse;

export const mockUserFullList = {
    "id": 1,
    "name": "Random List",
    "description": "Random List Description",
    "isListPinned": true,
    "altWallpaper": "https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small",
    "wallpaper": null,
    "listOwner": {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "isPrivateProfile": false
    },
    "membersSize": 2,
    "followersSize": 0,
    "isPrivate": false,
    "isFollower": false
} as unknown as BaseListResponse;

export const mockListsOwnerMember = [
    {
        "id": 2,
        "fullName": "MrCat",
        "username": "Cat",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
        "isPrivateProfile": false
    },
    {
        "id": 4,
        "fullName": "JavaCat",
        "username": "JavaCat",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
        "isPrivateProfile": false
    },
    {
        "id": 5,
        "fullName": "JavaCat",
        "username": "JavaCat",
        "about": "Hello twitter!",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
        "isPrivateProfile": false,
        "isMemberInList": true
    }
] as unknown as ListsOwnerMemberResponse[];

export const mockPinnedLists = [
    {
        "id": 3,
        "name": "Hello World!",
        "isListPinned": true,
        "altWallpaper": "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small",
        "wallpaper": null,
        "isPrivate": false
    }
] as unknown as PinnedListResponse[];

export const mockLists = [
    {
        "id": 2,
        "name": "Internal",
        "description": "Some description",
        "isListPinned": false,
        "altWallpaper": "https://pbs.twimg.com/media/EXZ2w_qUcAMwN3x?format=png&name=small",
        "wallpaper": null,
        "listOwner": {
            "id": 1,
            "fullName": "Random",
            "username": "Random",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isPrivateProfile": false
        },
        "isFollower": false
    },
    {
        "id": 1,
        "name": "Random List",
        "description": "Random List Description",
        "isListPinned": true,
        "altWallpaper": "https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small",
        "wallpaper": null,
        "listOwner": {
            "id": 1,
            "fullName": "Random",
            "username": "Random",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isPrivateProfile": false
        },
        "isFollower": false
    },
    {
        "id": 3,
        "name": "Hello World!",
        "description": "Hello from my list",
        "isListPinned": true,
        "altWallpaper": "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small",
        "wallpaper": null,
        "listOwner": {
            "id": 2,
            "fullName": "MrCat",
            "username": "Cat",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
            "isPrivateProfile": false
        },
        "isFollower": false
    }
] as unknown as ListResponse[];

export const mockUserLists = [
    {
        "id": 3,
        "name": "Hello World!",
        "description": "Hello from my list",
        "isListPinned": true,
        "altWallpaper": "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small",
        "wallpaper": null,
        "listOwner": {
            "id": 2,
            "fullName": "MrCat",
            "username": "Cat",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
            "isPrivateProfile": false
        },
        "isPrivate": false
    }
] as unknown as ListUserResponse[];

export const mockSimpleList = [
    {
        "id": 3,
        "name": "Hello World!",
        "altWallpaper": "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small",
        "wallpaper": null,
        "isMemberInList": true,
        "isPrivate": false
    }
] as unknown as SimpleListResponse[];

// fulltweet
export const mockFullTweet = {
    "id": 9,
    "text": "#FirstTweet",
    "dateTime": "2021-10-15T21:20:33",
    "scheduledDate": null,
    "addressedUsername": null,
    "addressedId": null,
    "addressedTweetId": null,
    "replyType": "EVERYONE",
    "link": "https://www.youtube.com/watch?v=ewZZNeYDiLo&ab_channel=TeamSESH",
    "linkTitle": "Bones - RestInPeace",
    "linkDescription": null,
    "linkCover": "https://i.ytimg.com/vi/ewZZNeYDiLo/mqdefault.jpg",
    "linkCoverSize": null,
    "user": {
        "id": 4,
        "email": "user2019@gmail.com",
        "fullName": "JavaCat",
        "username": "JavaCat",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
        "isPrivateProfile": false,
        "isFollower": false,
        "isMyProfileBlocked": false,
        "isUserBlocked": false,
        "isUserMuted": false
    },
    "images": [
        {
            "id": 8,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a2692fac-4b70-4828-845c-2fe439473f82_Cl5DjoUWYAAslnd.jfif"
        }
    ],
    "imageDescription": "test description",
    "taggedImageUsers": [],
    "quoteTweet": {
        "id": 13,
        "dateTime": "2021-10-15T21:57:21",
        "link": null,
        "linkCover": null,
        "linkCoverSize": null,
        "linkDescription": null,
        "linkTitle": null,
        "text": "#JavaScript",
        "user": {
            "id": 4,
            "email": "user2019@gmail.com",
            "fullName": "JavaCat",
            "username": "JavaCat",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
            "isFollower": false,
            "isMyProfileBlocked": false,
            "isPrivateProfile": false,
            "isUserBlocked": false,
            "isUserMuted": false
        }
    },
    "tweetList": {
        "id": 1,
        "name": "Random List",
        "altWallpaper": "https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small",
        "wallpaper": null,
        "listOwner": {
            "id": 1,
            "fullName": "Random",
            "username": "Random",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isPrivateProfile": false
        },
        "membersSize": 2,
        "isPrivate": false
    },
    "poll": {
        "id": 100,
        "dateTime": "2022-04-11T16:53:49.696909",
        "pollChoices": [
            { "id": 100, "choice": "test choice 1", "votedUser": [{ "id": 2 }] },
            { "id": 101, "choice": "test choice 2", "votedUser": [] },
            { "id": 102, "choice": "test choice 3", "votedUser": [] }]
    },
    "retweetsUserIds": [1, 2],
    "retweetsCount": 2,
    "likedTweetsCount": 2,
    "quotesCount": 2,
    "repliesCount": 2,
    "isTweetLiked": true,
    "isTweetRetweeted": true,
    "isUserFollowByOtherUser": false,
    "isTweetDeleted": false,
    "isTweetBookmarked": false,
    "gifImage": null
} as unknown as TweetResponse;

export const mockUserTweetAdditionalInfo = {
    "text": "Feels Good Man  :sunglasses:",
    "replyType": "MENTION",
    "addressedTweetId": null,
    "user": {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "isFollower": false,
        "isMyProfileBlocked": false,
        "isUserBlocked": false,
        "isUserMuted": false
    }
} as unknown as TweetAdditionalInfoResponse;

export const mockMyTweetAdditionalInfo = {
    "text": "Another #FirstTweet",
    "replyType": "EVERYONE",
    "addressedTweetId": null,
    "user": {
        "id": 2,
        "fullName": "MrCat",
        "username": "Cat",
        "isFollower": false,
        "isMyProfileBlocked": false,
        "isUserBlocked": false,
        "isUserMuted": false
    }
} as unknown as TweetAdditionalInfoResponse;

export const mockMyFullTweet = {
    "id": 102,
    "text": "hello23",
    "dateTime": "2022-03-22T21:49:28",
    "scheduledDate": null,
    "addressedUsername": null,
    "addressedId": null,
    "addressedTweetId": null,
    "replyType": "EVERYONE",
    "link": "testlink",
    "linkTitle": "test",
    "linkDescription": "test",
    "linkCover": null,
    "linkCoverSize": null,
    "user": {
        "id": 2,
        "email": "user2016@gmail.com",
        "fullName": "MrCat",
        "username": "Cat",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
        "isPrivateProfile": false,
        "isFollower": false,
        "isMyProfileBlocked": false,
        "isUserBlocked": false,
        "isUserMuted": false
    },
    "images": [],
    "quoteTweet": null,
    "poll": null,
    "retweetsCount": 0,
    "likedTweetsCount": 0,
    "repliesCount": 0,
    "isTweetLiked": true,
    "isTweetRetweeted": true,
    "isUserFollowByOtherUser": false,
    "isTweetDeleted": false,
    "isTweetBookmarked": false
} as unknown as TweetResponse;

export const mockQuoteTweet = {
    "id": 13,
    "text": "#JavaScript",
    "dateTime": "2021-10-15T21:57:21",
    "link": null,
    "linkCover": null,
    "linkCoverSize": null,
    "linkDescription": null,
    "linkTitle": null,
    "user": {
        "id": 4,
        "email": "user2019@gmail.com",
        "fullName": "JavaCat",
        "isFollower": true,
        "isMyProfileBlocked": false,
        "isPrivateProfile": false,
        "isUserBlocked": false,
        "isUserMuted": false,
        "username": "JavaCat",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png"
    }
} as unknown as QuoteTweetResponse;

// chat
export const mockChats = [
    {
        "id": 1,
        "creationDate": "2021-10-16T16:40:07",
        "participants": [
            {
                "id": 1,
                "user": {
                    "id": 1,
                    "fullName": "Random",
                    "username": "Random",
                    "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
                    "isMutedDirectMessages": false,
                    "isUserBlocked": false,
                    "isMyProfileBlocked": false
                },
                "isLeftChat": false
            },
            {
                "id": 2,
                "user": {
                    "id": 2,
                    "fullName": "MrCat",
                    "username": "Cat",
                    "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
                    "isMutedDirectMessages": false,
                    "isUserBlocked": false,
                    "isMyProfileBlocked": false
                },
                "isLeftChat": false
            }
        ]
    }
] as unknown as ChatResponse[];

export const mockMessages = [
    {
        "id": 1,
        "text": "Hello Cat",
        "date": "2021-10-16T16:40:07",
        "author": { "id": 1 },
        "tweet": null,
        "chat": { "id": 1 }
    },
    {
        "id": 2,
        "text": "How are you?",
        "date": "2021-10-16T16:40:41",
        "author": { "id": 1 },
        "tweet": null,
        "chat": { "id": 1 }
    },
    {
        "id": 3,
        "text": "I'm fine, thanks, and you? ",
        "date": "2021-10-16T16:41:59",
        "author": { "id": 2 },
        "tweet": null,
        "chat": { "id": 1 }
    },
    {
        "id": 4,
        "text": "Good)",
        "date": "2021-10-16T16:42:50",
        "author": { "id": 1 },
        "tweet": {
            "id": 14,
            "text": "Feels Good Man  :sunglasses:",
            "dateTime": "2021-10-15T22:10:14",
            "user": {
                "id": 1,
                "fullName": "Random",
                "username": "Random",
                "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
            }
        },
        "chat": { "id": 1 }
    },
    {
        "id": 100,
        "text": "helo",
        "date": "2022-03-10T20:47:10",
        "author": { "id": 2 },
        "tweet": null,
        "chat": { "id": 1 }
    }
] as unknown as ChatMessageResponse[];

// notifications
export const mockNotifications = [
    {
        "id": 13,
        "date": "2021-10-15T21:43:52",
        "notificationType": "FOLLOW",
        "user": {
            "id": 1,
            "username": "Random",
            "fullName": null,
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isFollower": false
        },
        "userToFollow": {
            "id": 2,
            "username": "Cat",
            "fullName": null,
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
            "isFollower": false
        },
        "tweet": null
    },
    {
        "id": 12,
        "date": "2021-10-15T21:43:39",
        "notificationType": "LIKE",
        "user": {
            "id": 1,
            "username": "Random",
            "fullName": null,
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isFollower": false
        },
        "userToFollow": null,
        "tweet": { "id": 6, "text": "#myCat  :smile_cat:", "user": { "id": 2 }, "notificationCondition": false }
    },
    {
        "id": 11,
        "date": "2021-10-15T21:43:36",
        "notificationType": "RETWEET",
        "user": {
            "id": 1,
            "username": "Random",
            "fullName": null,
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "isFollower": false
        },
        "userToFollow": null,
        "tweet": { "id": 5, "text": "Another #FirstTweet", "user": { "id": 2 }, "notificationCondition": false }
    }
] as unknown as NotificationResponse[];

export const mockTweetAuthors = [
    {
        "id": 1,
        "username": "Random",
        "fullName": "Random",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "isFollower": false
    },
    {
        "id": 4,
        "username": "JavaCat",
        "fullName": "JavaCat",
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png",
        "isFollower": false
    }
] as unknown as NotificationUserResponse[];

export const mockNotificationInfo = {
    "id": 12,
    "date": "2021-10-15T21:43:39",
    "notificationType": "LIKE",
    "user": {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "about": null,
        "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
        "isPrivateProfile": false,
        "isMutedDirectMessages": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": true
    },
    "tweet": {
        "id": 6,
        "text": "#myCat  :smile_cat:",
        "dateTime": "2021-10-15T21:20:26",
        "scheduledDate": null,
        "addressedUsername": null,
        "addressedId": null,
        "addressedTweetId": null,
        "replyType": "EVERYONE",
        "link": null,
        "linkTitle": null,
        "linkDescription": null,
        "linkCover": null,
        "linkCoverSize": null,
        "user": {
            "id": 2,
            "email": "user2016@gmail.com",
            "fullName": "MrCat",
            "username": "Cat",
            "avatar": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg",
            "isPrivateProfile": false,
            "isFollower": false,
            "isMyProfileBlocked": false,
            "isUserBlocked": false,
            "isUserMuted": false
        },
        "images": [
            {
                "id": 1,
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/0a6c735d-def8-4587-a29f-221915ef6cb4_ff2d023b3220f93bbc79233614dea542.jpg"
            }
        ],
        "quoteTweet": null,
        "poll": null,
        "retweetsCount": 0,
        "likedTweetsCount": 2,
        "repliesCount": 0,
        "isTweetLiked": true,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": false,
        "isTweetDeleted": false,
        "isTweetBookmarked": false
    }
} as unknown as NotificationInfoResponse;

// tag
export const mockTags = [
    {
        "id": 1,
        "tagName": "#FirstTweet",
        "tweetsQuantity": 5
    },
    {
        "id": 2,
        "tagName": "#myCat",
        "tweetsQuantity": 4
    },
    {
        "id": 3,
        "tagName": "#JavaScript",
        "tweetsQuantity": 1
    }
] as unknown as TagResponse[];

// topic
export const mockTopics = [
    {
        "id": 1,
        "topicName": "Elon Musk",
        "topicCategory": TopicCategory.ENTERTAINMENT,
        "isTopicFollowed": false,
        "isTopicNotInterested": false
    },
    {
        "id": 2,
        "topicName": "PewDiePie",
        "topicCategory": TopicCategory.GAMING,
        "isTopicFollowed": true,
        "isTopicNotInterested": false
    },
    {
        "id": 3,
        "topicName": "Funny Tweets",
        "topicCategory": TopicCategory.ONLY_ON_TWITTER,
        "isTopicFollowed": false,
        "isTopicNotInterested": true
    }
] as unknown as TopicResponse[];

// GiphyData
export const mockGiphyData = [
    {
        "id": "1",
        "title": "Cat",
        "images": {
            "downsized": {
                "id": 1,
                "url": "test_giphy_url_1",
                "width": 400,
                "height": 400
            },
            "downsized_still": {
                "id": 2,
                "url": "test_giphy_url_2",
                "width": 400,
                "height": 400
            }
        }
    },
    {
        "id": "2",
        "title": "Dog",
        "images": {
            "downsized": {
                "id": 2,
                "url": "test_giphy_url_2",
                "width": 400,
                "height": 400
            },
            "downsized_still": {
                "id": 2,
                "url": "test_giphy_url_2",
                "width": 400,
                "height": 400
            }
        }
    }
];
