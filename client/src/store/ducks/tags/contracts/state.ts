import {LoadingStatus} from "../../../types";
import {TagResponse} from "../../../types/tag";

export interface TagsState {
    tags: TagResponse[];
    loadingTagsState: LoadingStatus;
    trends: TagResponse[];
    pagesCount: number;
    loadingTrendsState: LoadingStatus;
}
