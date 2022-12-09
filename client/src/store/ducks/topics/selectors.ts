import {RootState} from "../../store";
import {TopicsState} from "./contracts/state";
import {LoadingStatus} from "../../types/common";

const selectTopics = (state: RootState): TopicsState => state.topics;
const selectTopicsLoadingState = (state: RootState): LoadingStatus => selectTopics(state).loadingState;

export const selectTopicsItems = (state: RootState): TopicsState["topics"] => selectTopics(state).topics;
export const selectIsTopicsLoading = (state: RootState): boolean => selectTopicsLoadingState(state) === LoadingStatus.LOADING;
