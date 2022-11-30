import React, {FC, ReactElement} from "react";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";

import {useNotInterestedTopicStyles} from "./NotInterestedTopicStyles";
import {TopicIconContained} from "../../../../icons";

interface NotInterestedTopicProps {
    topicName: string;
    category: string;
}

const NotInterestedTopic: FC<NotInterestedTopicProps> = ({topicName, category}): ReactElement => {
    const classes = useNotInterestedTopicStyles();

    return (
        <div className={classes.container}>
            <div className={classes.iconCircle}>
                {TopicIconContained}
            </div>
            <div className={classes.topicInfo}>
                <Typography variant={"h6"} component={"div"}>
                    {topicName}
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    {category}
                </Typography>
            </div>
            <div className={classes.buttonWrapper}>
                <Button
                    className={classes.outlinedButton}
                    color="primary"
                    variant="outlined"
                    size="small"
                >
                    Follow
                </Button>
            </div>
        </div>
    );
};

export default NotInterestedTopic;
