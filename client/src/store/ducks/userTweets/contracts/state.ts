import {LoadingStatus} from "../../../types";
import {Tweet} from "../../tweets/contracts/state";

export interface Image {
    id: number;
    src: string;
}

export interface PinnedTweet {
    tweet: Tweet;
    activeTab: number | undefined;
}

export interface UserTweetsState {
    items: Tweet[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
