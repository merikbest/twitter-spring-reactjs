import React, {FC, ReactElement} from "react";
import {useSelector} from "react-redux";

import {useTopicsStyles} from "../../TopicsStyles";
import FollowedTopicItem from "../FollowedTopicItem/FollowedTopicItem";
import {selectTopicsItems} from "../../../../store/ducks/topics/selectors";

interface FollowedTopicBlockProps {
    startTopicValue: number;
    endTopicValue: number;
}

const FollowedTopicBlock: FC<FollowedTopicBlockProps> = ({startTopicValue, endTopicValue}): ReactElement => {
    const topicClasses = useTopicsStyles();
    const topics = useSelector(selectTopicsItems);

    return (
        <div className={topicClasses.topicsBlock}>
            <div className={topicClasses.topicsContainer}>
                {topics.slice(startTopicValue, endTopicValue).map((topic) => (
                    <FollowedTopicItem topicName={topic.topicName}/>
                ))}
            </div>
        </div>
    );
};

export default FollowedTopicBlock;
