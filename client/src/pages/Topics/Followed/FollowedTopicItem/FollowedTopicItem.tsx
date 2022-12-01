import React, {FC, ReactElement} from "react";
import {Button, ButtonGroup, Divider, Typography} from "@material-ui/core";

import {CloseIcon, PlusIcon} from "../../../../icons";
import {useFollowedTopicItemStyles} from "./FollowedTopicItemStyles";

interface TopicItemProps {
    topicName: string;
}

const FollowedTopicItem: FC<TopicItemProps> = ({topicName}): ReactElement => {
    const classes = useFollowedTopicItemStyles();

    return (
        <div className={classes.topicItem}>
            <ButtonGroup variant="outlined">
                <Button className={classes.topicItemTextInfo}>
                    <Typography variant={"h6"} component={"div"}>
                        {topicName}
                    </Typography>
                    <>{PlusIcon}</>
                </Button>
                <Button className={classes.topicItemCloseButton}>
                    <Divider orientation="vertical" flexItem />
                    <>{CloseIcon}</>
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default FollowedTopicItem;
