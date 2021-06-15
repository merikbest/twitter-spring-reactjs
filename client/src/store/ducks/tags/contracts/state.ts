import {LoadingStatus} from "../../../types";

export interface Tag {
    id: string;
    name: string;
    count: number;
}

export interface TagsState {
    items: Tag[];
    loadingState: LoadingStatus;
}
