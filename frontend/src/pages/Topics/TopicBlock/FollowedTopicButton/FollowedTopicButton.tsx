import React, { FC, ReactElement } from "react";
import { Button, ButtonGroup, Divider, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { CheckIcon, CloseIcon, PlusIcon } from "../../../../icons";
import { useFollowedTopicItemButton } from "./FollowedTopicItemButton";
import { TopicResponse } from "../../../../types/topic";
import { processFollowTopic, processNotInterestedTopic } from "../../../../store/ducks/topics/actionCreators";

interface TopicButtonProps {
    topic: TopicResponse;
}

const FollowedTopicButton: FC<TopicButtonProps> = ({ topic }): ReactElement => {
    const classes = useFollowedTopicItemButton({
        isTopicFollowed: topic.isTopicFollowed,
        isTopicNotInterested: topic.isTopicNotInterested
    });
    const dispatch = useDispatch();

    const onClickFollowTopic = (): void => {
        dispatch(processFollowTopic({ topicsId: topic.id, topicCategory: topic.topicCategory }));
    };

    const onClickNotInterestedTopic = (): void => {
        dispatch(processNotInterestedTopic(topic.id));
    };

    return (
        <div className={classes.topicItem} onClick={topic.isTopicFollowed ? onClickFollowTopic : undefined}>
            <ButtonGroup variant="outlined">
                <Button
                    className={classes.topicItemTextInfo}
                    disabled={topic.isTopicNotInterested}
                    onClick={topic.isTopicFollowed ? undefined : onClickFollowTopic}
                >
                    <Typography variant={"h6"} component={"div"}>
                        {topic.topicName}
                    </Typography>
                    <>{PlusIcon}</>
                </Button>
                <Button
                    className={classes.topicItemCloseButton}
                    disabled={topic.isTopicNotInterested}
                    onClick={topic.isTopicFollowed ? undefined : onClickNotInterestedTopic}
                >
                    {!topic.isTopicNotInterested && <Divider orientation="vertical" flexItem />}
                    <>{topic.isTopicFollowed ? CheckIcon : CloseIcon}</>
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default FollowedTopicButton;
