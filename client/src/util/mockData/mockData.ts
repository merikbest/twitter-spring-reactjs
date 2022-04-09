import {TweetImageResponse, TweetResponse} from "../../store/types/tweet";
import {AuthUserResponse, UserProfileResponse, UserResponse} from "../../store/types/user";
import {BaseListResponse, ListsOwnerMemberResponse} from "../../store/types/lists";

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
    "birthday": null,
    "registrationDate": "2021-08-01T23:34:32",
    "tweetCount": 4,
    "mediaTweetCount": 25,
    "likeCount": 30,
    "notificationsCount": 0,
    "active": true,
    "profileCustomized": false,
    "profileStarted": true,
    "backgroundColor": "DEFAULT",
    "colorScheme": "BLUE",
    "avatar": {
        "id": 33,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg"
    },
    "wallpaper": {
        "id": 44,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg"
    },
    "pinnedTweetId": 0,
    "followersSize": 1,
    "followingSize": 1,
    "followerRequestsSize": null,
    "unreadMessagesSize": 0,
    "isMutedDirectMessages": false,
    "isPrivateProfile": false
} as unknown as AuthUserResponse;

export const mockUsers = [
    {
        "id": 4,
        "fullName": "JavaCat",
        "username": "JavaCat",
        "about": "Hello twitter!",
        "avatar": {
            "id": 5,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png"
        },
        "isPrivateProfile": false,
        "isMutedDirectMessages": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": false
    }, {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "about": null,
        "avatar": {
            "id": 11,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
        },
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
        "birthday": null,
        "registrationDate": "2021-08-01T23:34:32",
        "tweetCount": 4,
        "mediaTweetCount": 25,
        "likeCount": 30,
        "notificationsCount": 0,
        "avatar": {
            "id": 33,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg"
        },
        "wallpaper": {
            "id": 44,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg"
        },
        "pinnedTweetId": 0,
        "followersSize": followersSize,
        "followingSize": followingSize,
        "sameFollowers": [{
            "id": 1,
            "fullName": "Random",
            "username": "Random",
            "avatar": {
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
                "id": 11
            }
        }],
        "isMutedDirectMessages": false,
        "isPrivateProfile": false,
        "isUserMuted": false,
        "isUserBlocked": false,
        "isMyProfileBlocked": false,
        "isWaitingForApprove": false,
        "isFollower": false,
        "isSubscriber": false
    } as unknown as UserProfileResponse
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
    "avatar": {
        "id": 33,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg"
    },
    "wallpaper": {
        "id": 44,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/d0e5b95f-acc0-47ef-b499-477f7e5a1a06_PrMnWa2z.jpg"
    },
    "pinnedTweetId": 0,
    "followersSize": 1,
    "followingSize": 1,
    "sameFollowers": [{
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": {
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "id": 11
        }
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
        "avatar": {
            "id": 11,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
        },
        "wallpaper": {
            "id": 22,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/dfc8a223-45fc-43da-8b7c-f76e2c2507cd_82ecbca14eb4999212c07257f41c70e7.jpg"
        },
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
    } as unknown as UserProfileResponse
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
    "avatar": {
        "id": 11,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
    },
    "wallpaper": {
        "id": 22,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/dfc8a223-45fc-43da-8b7c-f76e2c2507cd_82ecbca14eb4999212c07257f41c70e7.jpg"
    },
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
    "avatar": {
        "id": 3,
        "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/a7e03e7c-c05f-4e30-ba8c-2271fd0b4b43_779301.jpg"
    },
    "wallpaper": null,
    "pinnedTweetId": 0,
    "followersSize": 1,
    "followingSize": 0,
    "sameFollowers": [{
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": {
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg",
            "id": 11
        }
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
            "avatar": {
                "id": 7,
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/68a7b0d5-2b0c-493e-85ff-098725c52ecc_Cl5DjoUWYAAslnd.jfif"
            },
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
            "avatar": {
                "id": 5,
                "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png"
            },
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
    },
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
        "likedTweetsCount": 1,
        "repliesCount": 0,
        "isTweetLiked": true,
        "isTweetRetweeted": false,
        "isUserFollowByOtherUser": true,
        "isTweetDeleted": false,
        "isTweetBookmarked": false
    },
];

// lists
export const mockFullList = {
    "id": 3,
    "name": "Hello World!",
    "description": "Hello from my list",
    "pinnedDate": "2022-03-29T20:03:47",
    "altWallpaper": "https://pbs.twimg.com/media/EXZ27UwVcAIcDfd?format=png&name=small",
    "wallpaper": null,
    "listOwner": {
        "id": 2,
        "fullName": "MrCat",
        "username": "Cat",
        "avatar": {
            "id": 33,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg"
        },
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
    "pinnedDate": "2021-10-16T16:36:08",
    "altWallpaper": "https://pbs.twimg.com/media/EXZ1_hkUYAA56JA?format=png&name=small",
    "wallpaper": null,
    "listOwner": {
        "id": 1,
        "fullName": "Random",
        "username": "Random",
        "avatar": {
            "id": 11,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/ae83099c-885b-499a-bb6f-5e34e1b69e7d_4ec7201fd370bd9870cdb326f0511f38.jpg"
        },
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
        "avatar": {
            "id": 33,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/348b7dbe-3ac5-477f-8483-edc24f53091b_814370.jpg"
        },
        "isPrivateProfile": false
    },
    {
        "id": 4,
        "fullName": "JavaCat",
        "username": "JavaCat",
        "about": "Hello twitter!",
        "avatar": {
            "id": 5,
            "src": "https://twitterclonestorage.s3.eu-central-1.amazonaws.com/b999d944-c9ec-4a9c-b356-db937211df5c_Ec1OBK3XsAEjVZR.png"
        },
        "isPrivateProfile": false
    }
] as unknown as ListsOwnerMemberResponse[];