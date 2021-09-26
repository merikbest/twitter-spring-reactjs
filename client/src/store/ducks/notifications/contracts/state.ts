import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";
import {Tweet} from "../../tweets/contracts/state";

export interface Notification {
    id: number;
    date: string;
    notificationType: NotificationType;
    user: User;
    userToFollow: User;
    tweet: Tweet;
}

export enum NotificationType {
    LIKE = "LIKE",
    RETWEET = "RETWEET",
    FOLLOW = "FOLLOW"
}

export interface NotificationsState {
    items: Notification[];
    loadingState: LoadingStatus;
}
