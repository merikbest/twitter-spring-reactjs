import React, {FC, ReactElement} from "react";

import {useTopicsStyles} from "../TopicsStyles";
import FollowedTopicItem from "./FollowedTopicItem/FollowedTopicItem";
import {TopicResponse} from "../../../store/types/topic";
import TopicItem from "./TopicItem/TopicItem";

interface TopicBlockProps {
    topics: TopicResponse[];
    startTopicValue: number;
    endTopicValue: number;
    isFollowedTopic?: boolean;
}

const TopicBlock: FC<TopicBlockProps> = (
    {
        topics,
        startTopicValue,
        endTopicValue,
        isFollowedTopic = false
    }
): ReactElement => {
    const topicClasses = useTopicsStyles();

    return (
        <div className={topicClasses.topicsBlock}>
            <div className={topicClasses.topicsContainer}>
                {topics.slice(startTopicValue, endTopicValue).map((topic) => (
                    isFollowedTopic ? (
                        <FollowedTopicItem key={topic.id} topic={topic}/>
                    ) : (
                        <TopicItem key={topic.id} topic={topic}/>
                    )
                ))}
            </div>
        </div>
    );
};

export default TopicBlock;
