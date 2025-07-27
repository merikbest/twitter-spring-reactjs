import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import { useTopicItemStyles } from "./TopicItemStyles";
import { TopicIconContained } from "../../../icons";
import { TopicResponse } from "../../../types/topic";
import UnfollowTopicButton from "./UnfollowTopicButton";
import FollowTopicButton from "./FollowTopicButton";
import { useTopicItem } from "./useTopicItem";

interface TopicItemProps {
    topic: TopicResponse;
}

const TopicItem: FC<TopicItemProps> = ({ topic }): ReactElement => {
    const classes = useTopicItemStyles();
    const { onClickFollowTopic, converterCategory } = useTopicItem(topic);

    return (
        <div className={classes.container}>
            <div className={classes.iconCircle}>
                {TopicIconContained}
            </div>
            <div className={classes.topicInfo}>
                <Typography variant="h6" component="div">
                    {topic.topicName}
                </Typography>
                <Typography variant="subtitle1" component="div">
                    {converterCategory(topic.topicCategory)}
                </Typography>
            </div>
            <div className={classes.buttonWrapper}>
                {topic.isTopicFollowed ? (
                    <UnfollowTopicButton topicName={topic.topicName} onClickFollowTopic={onClickFollowTopic} />
                ) : (
                    <FollowTopicButton onClickButton={onClickFollowTopic} />
                )}
            </div>
        </div>
    );
};

export default TopicItem;
