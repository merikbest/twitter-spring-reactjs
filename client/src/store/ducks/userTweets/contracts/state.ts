import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";

export interface Image {
    id: number;
    src: string;
}

export interface Tweet {
    id: string;
    text: string;
    dateTime: string;
    images?: Image[];
    likes: User[];
    retweets: User[];
    user: User;
}

export interface UserTweetsState {
    items: Tweet[];
    loadingState: LoadingStatus;
}
