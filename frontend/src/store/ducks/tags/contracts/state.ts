import { TagResponse } from "../../../../types/tag";
import { LoadingStatus } from "../../../../types/common";

export interface TagsState {
    tags: TagResponse[];
    loadingTagsState: LoadingStatus;
    trends: TagResponse[];
    pagesCount: number;
    loadingTrendsState: LoadingStatus;
}
