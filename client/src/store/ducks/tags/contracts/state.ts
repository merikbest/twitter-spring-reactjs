import {LoadingStatus} from "../../../types";
import {Tweet} from "../../tweets/contracts/state";

export interface Tag {
    id: string;
    tagName: string;
    tweetsQuantity: number;
    tweets: Tweet[];
}

export interface TagsState {
    items: Tag[];
    loadingState: LoadingStatus;
}
