import { RootState } from "../../store";
import { TagsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

const selectTags = (state: RootState): TagsState => state.tags;
export const selectTagsItems = (state: RootState): TagsState["tags"] => selectTags(state).tags;
export const selectTagsLoadingState = (state: RootState): LoadingStatus => selectTags(state).loadingTagsState;
export const selectIsTagsLoading = (state: RootState): boolean => selectTagsLoadingState(state) === LoadingStatus.LOADING;

export const selectTrendsItems = (state: RootState): TagsState["trends"] => selectTags(state).trends;
export const selectTrendsPagesCount = (state: RootState): TagsState["pagesCount"] => selectTags(state).pagesCount;
export const selectTrendsLoadingState = (state: RootState): TagsState["loadingTrendsState"] => selectTags(state).loadingTrendsState;
export const selectIsTrendsLoading = (state: RootState): boolean => selectTrendsLoadingState(state) === LoadingStatus.LOADING;
