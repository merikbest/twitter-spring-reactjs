import {LoadingStatus} from "../../../types";
import {TagResponse} from "../../../types/tag";

export interface TagsState {
    items: TagResponse[];
    loadingState: LoadingStatus;
}
