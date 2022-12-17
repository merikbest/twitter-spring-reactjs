import React, {FC, ReactElement} from "react";
import {useDispatch} from "react-redux";
import {Button, Typography} from "@material-ui/core";

import {useTopicItemStyles} from "./TopicItemStyles";
import {CheckIcon, PlusIcon} from "../../../../icons";
import {processFollowTopic} from "../../../../store/ducks/topics/actionCreators";
import {TopicResponse} from "../../../../store/types/topic";

interface TopicsItemProps {
    topic: TopicResponse;
}

const TopicItem: FC<TopicsItemProps> = ({topic}): ReactElement => {
    const classes = useTopicItemStyles({
        isTopicFollowed: topic.isTopicFollowed,
        isTopicNotInterested: topic.isTopicNotInterested
    });
    const dispatch = useDispatch();

    const onClickFollowTopic = (): void => {
        dispatch(processFollowTopic({topicsId: topic.id, topicCategory: topic.topicCategory}));
    };

    return (
        <div className={classes.topicItem}>
            <Button className={classes.topicItemTextInfo} onClick={onClickFollowTopic} disabled={topic.isTopicNotInterested}>
                <Typography variant={"h6"} component={"div"}>
                    {topic.topicName}
                </Typography>
                <>{topic.isTopicFollowed ? CheckIcon : PlusIcon}</>
            </Button>
        </div>
    );
};

export default TopicItem;
