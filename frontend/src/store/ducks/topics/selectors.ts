import { RootState } from "../../store";
import { TopicsState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

const selectTopics = (state: RootState): TopicsState => state.topics;

export const selectTopicsItems = (state: RootState): TopicsState["topics"] => selectTopics(state).topics;
export const selectFollowedTopicsItems = (state: RootState): TopicsState["followedTopics"] => selectTopics(state).followedTopics;
export const selectTopicsByCategories = (state: RootState): TopicsState["topicsByCategories"] => selectTopics(state).topicsByCategories;
export const selectIsTopicsLoading = (state: RootState): boolean => selectTopics(state).topicsLoadingState === LoadingStatus.LOADING;
export const selectIsFollowedTopicsLoading = (state: RootState): boolean => selectTopics(state).followedTopicsLoadingState === LoadingStatus.LOADING;
export const selectIsTopicsByCategoriesLoading = (state: RootState): boolean =>
    selectTopics(state).topicsByCategoriesLoadingState === LoadingStatus.LOADING;
