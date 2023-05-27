import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { ReplyType } from "../../../types/common";
import { CheckIcon } from "../../../icons";
import { useChangeReplyWindowComponentStyles } from "./ChangeReplyWindowComponentStyles";

interface ChangeReplyWindowComponentProps {
    id?: string;
    replyType: ReplyType;
    replyTypeIcon: JSX.Element;
    replyTypeTitle: string;
    currentReplyType: ReplyType;
    onChangeTweetReplyType: (replyType: ReplyType) => void;
}

const ChangeReplyWindowComponent: FC<ChangeReplyWindowComponentProps> = (
    {
        id,
        replyType,
        replyTypeIcon,
        replyTypeTitle,
        currentReplyType,
        onChangeTweetReplyType
    }
): ReactElement => {
    const classes = useChangeReplyWindowComponentStyles();

    return (
        <ListItem
            id={id}
            className={classes.listItem}
            onClick={() => onChangeTweetReplyType(currentReplyType)}
            button
        >
            <div className={classes.iconCircle}>
                <span className={classes.icon}>
                    {replyTypeIcon}
                </span>
            </div>
            <Typography variant={"body1"} component={"span"}>
                {replyTypeTitle}
            </Typography>
            {(replyType === currentReplyType) && (
                <span className={classes.checkIcon}>
                    {CheckIcon}
                </span>
            )}
        </ListItem>
    );
};

export default ChangeReplyWindowComponent;
