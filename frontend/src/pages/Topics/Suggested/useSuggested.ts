import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchTopicsByCategories,
    fetchTopicsByIds,
    resetTopicsState
} from "../../../store/ducks/topics/actionCreators";
import {
    selectIsTopicsByCategoriesLoading,
    selectIsTopicsLoading,
    selectTopicsByCategories,
    selectTopicsItems
} from "../../../store/ducks/topics/selectors";

export const useSuggested = () => {
    const dispatch = useDispatch();
    const topics = useSelector(selectTopicsItems);
    const topicsByCategories = useSelector(selectTopicsByCategories);
    const isTopicsLoading = useSelector(selectIsTopicsLoading);
    const isTopicsByCategoriesLoading = useSelector(selectIsTopicsByCategoriesLoading);
    const [showMoreCategories, setShowMoreCategories] = useState(false);
    const topicsIds = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020];

    const onClickShowMoreCategories = () => {
        setShowMoreCategories(true);
    };

    useEffect(() => {
        dispatch(fetchTopicsByIds({ topicsIds }));
        dispatch(fetchTopicsByCategories({ categories: ["GAMING", "ONLY_ON_TWITTER"] }));

        return () => {
            dispatch(resetTopicsState());
        };
    }, [dispatch]);

    return {
        topics,
        topicsByCategories,
        isTopicsLoading,
        isTopicsByCategoriesLoading,
        showMoreCategories,
        onClickShowMoreCategories,
    };
};