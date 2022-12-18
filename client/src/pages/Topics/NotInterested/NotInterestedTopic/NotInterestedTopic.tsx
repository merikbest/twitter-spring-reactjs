import React, {FC, ReactElement} from "react";
import {Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";

import {useNotInterestedTopicStyles} from "./NotInterestedTopicStyles";
import {TopicIconContained} from "../../../../icons";
import {processFollowTopic} from "../../../../store/ducks/topics/actionCreators";
import {TopicResponse} from "../../../../store/types/topic";
import UnfollowTopicButton from "./UnfollowTopicButton/UnfollowTopicButton";
import FollowTopicButton from "./FollowTopicButton/FollowTopicButton";

interface NotInterestedTopicProps {
    topic: TopicResponse;
}

const NotInterestedTopic: FC<NotInterestedTopicProps> = ({topic}): ReactElement => {
    const classes = useNotInterestedTopicStyles();
    const dispatch = useDispatch();

    const onClickFollowTopic = (): void => {
        dispatch(processFollowTopic({topicsId: topic.id, topicCategory: topic.topicCategory}));
    };

    const converterCategory = (category: string): string | null => {
        if (!category) {
            return null;
        } else {
            const categoryString = category.replace(/_/g, " ").toLowerCase();
            return categoryString.charAt(0).toUpperCase() + categoryString.slice(1);
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
                    <UnfollowTopicButton topicName={topic.topicName} onClickFollowTopic={onClickFollowTopic}/>
                ) : (
                    <FollowTopicButton onClickButton={onClickFollowTopic}/>
                )}
            </div>
        </div>
    );
};

export default NotInterestedTopic;
