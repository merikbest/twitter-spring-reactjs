import React, {FC, ReactElement} from "react";
import {Button, Typography} from "@material-ui/core";

import {useTopicsItemStyles} from "./TopicsItemStyles";
import {PlusIcon} from "../../../../icons";

interface TopicsItemProps {
    topicName: string;
}

const TopicsItem: FC<TopicsItemProps> = ({topicName}): ReactElement => {
    const classes = useTopicsItemStyles();

    return (
        <div className={classes.topicItem}>
            <Button className={classes.topicItemTextInfo}>
                <Typography variant={"h6"} component={"div"}>
                    {topicName}
                </Typography>
                <>{PlusIcon}</>
            </Button>
        </div>
    );
};

export default TopicsItem;
