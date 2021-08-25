import {LoadingStatus} from "../../../types";
import {User} from "../../user/contracts/state";
import {Tweet} from "../../tweets/contracts/state";

export interface Notification {
    id: number;
    date: string;
    notificationType: string;
    user: User;
    tweet: Tweet;
}

export interface NotificationsState {
    items: Notification[];
    loadingState: LoadingStatus;
}
