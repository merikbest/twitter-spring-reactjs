import React, { FC, ReactElement } from "react";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useTopicItemStyles } from "./TopicItemStyles";
import { TopicIconContained } from "../../../icons";
import { processFollowTopic } from "../../../store/ducks/topics/actionCreators";
import { TopicResponse } from "../../../types/topic";
import UnfollowTopicButton from "./UnfollowTopicButton/UnfollowTopicButton";
import FollowTopicButton from "./FollowTopicButton/FollowTopicButton";
import { capitalize } from "../../../util/text-formatter";

interface TopicItemProps {
    topic: TopicResponse;
}

const TopicItem: FC<TopicItemProps> = ({ topic }): ReactElement => {
    const classes = useTopicItemStyles();
    const dispatch = useDispatch();

    const onClickFollowTopic = (): void => {
        dispatch(processFollowTopic({ topicsId: topic.id, topicCategory: topic.topicCategory }));
    };

    const converterCategory = (category: string): string | null => {
        if (!category) {
            return null;
        } else {
            const categoryString = category.replace(/_/g, " ").toLowerCase();
            return capitalize(categoryString);
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.iconCircle}>
                {TopicIconContained}
            </div>
            <div className={classes.topicInfo}>
                <Typography variant={"h6"} component={"div"}>
                    {topic.topicName}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
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
