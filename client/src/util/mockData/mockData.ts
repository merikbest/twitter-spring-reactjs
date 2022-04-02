import {TweetResponse} from "../../store/types/tweet";
import {AuthUserResponse, UserResponse} from "../../store/types/user";

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