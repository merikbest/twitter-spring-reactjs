import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    selectFollowedTopicsItems,
    selectIsFollowedTopicsLoading,
    selectIsTopicsLoading,
    selectTopicsItems
} from "../../../store/ducks/topics/selectors";
import { fetchFollowedTopics, fetchTopicsByIds, resetTopicsState } from "../../../store/ducks/topics/actionCreators";
import { topicsIds } from "./Followed";

export const useFollowed = () => {
    const dispatch = useDispatch();
    const topics = useSelector(selectTopicsItems);
    const followedTopics = useSelector(selectFollowedTopicsItems);
    const isTopicsLoading = useSelector(selectIsTopicsLoading);
    const isFollowedTopicsLoading = useSelector(selectIsFollowedTopicsLoading);

    useEffect(() => {
        dispatch(fetchTopicsByIds({ topicsIds }));
        dispatch(fetchFollowedTopics());

        return () => {
            dispatch(resetTopicsState());
        };
    }, []);

    return { topics, followedTopics, isTopicsLoading, isFollowedTopicsLoading };
};