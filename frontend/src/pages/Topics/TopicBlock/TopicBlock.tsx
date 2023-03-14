import React, { FC, ReactElement } from "react";

import { useTopicsStyles } from "../TopicsStyles";
import FollowedTopicButton from "./FollowedTopicButton/FollowedTopicButton";
import { TopicResponse } from "../../../types/topic";
import TopicButton from "./TopicButton/TopicButton";

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
                        <FollowedTopicButton key={topic.id} topic={topic} />
                    ) : (
                        <TopicButton key={topic.id} topic={topic} />
                    )
                ))}
            </div>
        </div>
    );
};

export default TopicBlock;
