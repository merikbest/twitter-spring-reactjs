import {LoadingStatus} from "../../../types";

export interface Tag {
    id: string;
    tagName: string;
    tweetsQuantity: number;
}

export interface TagsState {
    items: Tag[];
    loadingState: LoadingStatus;
}
