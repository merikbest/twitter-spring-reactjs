import {LoadingStatus} from "../../../types/common";
import {TopicResponse} from "../../../types/topic";

export interface TopicsState {
    topics: TopicResponse[];
    loadingState: LoadingStatus;
}
