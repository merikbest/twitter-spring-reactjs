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
    likes: User[];
    retweets: User[];
    replies: Tweet[];
    user: User;
}

export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingStatus;
}
