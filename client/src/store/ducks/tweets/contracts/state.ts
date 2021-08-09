import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export interface Image {
    id: number;
    src: string;
}

export interface Tweet {
    id: string;
    text: string;
    addressedUsername: string;
    addressedId: number;
    dateTime: string;
    images?: Image[];
    likedTweets: LikeTweet[];
    retweets: Retweet[];
    replies: Tweet[];
    user: User;
}

export interface LikeTweet {
    id: number;
    likeTweetDate: string;
    user: User;
    tweet: Tweet;
}

export interface Retweet {
    id: number;
    retweetDate: string;
    user: User;
    tweet: Tweet;
}

export interface AddTweet {
    profileId: number,
    text: string;
    images: Image[];
}

export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingStatus;
}
