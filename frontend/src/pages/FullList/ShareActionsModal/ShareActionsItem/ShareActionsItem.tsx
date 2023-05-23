import React, { FC, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { useShareActionsItemStyles } from "./ShareActionsItemStyles";

interface ShareActionsItemProps {
    icon: JSX.Element;
    title: string;
    onClick?: () => void;
}

const ShareActionsItem: FC<ShareActionsItemProps> = ({ icon, title, onClick }): ReactElement => {
    const classes = useShareActionsItemStyles();

    return (
        <ListItem className={classes.listItem} onClick={onClick}>
            <>{icon}</>
            <Typography variant={"body1"} component={"span"}>
                {title}
            </Typography>
        </ListItem>
    );
};

export default ShareActionsItem;
