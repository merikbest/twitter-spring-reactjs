import {LoadingStatus} from "../../../types";
import {Tweet} from "../../tweets/contracts/state";

export interface Image {
    id: number;
    src: string;
}

export interface UserTweetsState {
    items: Tweet[];
    loadingState: LoadingStatus;
}
