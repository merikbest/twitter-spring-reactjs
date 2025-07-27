import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { processFollowTopic } from "../../../store/ducks/topics/actionCreators";
import { capitalize } from "../../../util/text-formatter";
import { TopicResponse } from "../../../types/topic";

export const useTopicItem = (topic: TopicResponse) => {
    const dispatch = useDispatch();

    const onClickFollowTopic = useCallback((): void => {
        dispatch(processFollowTopic({ topicsId: topic.id, topicCategory: topic.topicCategory }));
    }, [dispatch, topic]);

    const converterCategory = useCallback((category: string): string | null => {
        if (!category) {
            return null;
        } else {
            const categoryString = category.replace(/_/g, " ").toLowerCase();
            return capitalize(categoryString);
        }
    }, []);

    return { onClickFollowTopic, converterCategory };
};