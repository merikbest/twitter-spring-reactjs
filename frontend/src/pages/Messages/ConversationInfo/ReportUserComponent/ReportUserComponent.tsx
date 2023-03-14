import React, { FC, memo, ReactElement } from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface ReportUserComponentProps {
    username?: string;
}

const ReportUserComponent: FC<ReportUserComponentProps> = memo(({ username }): ReactElement => {
    const classes = useConversationInfoStyles();

    return (
        <div className={classnames(classes.conversationInfoButton, classes.blockUser)}>
            <Typography variant={"body1"} component={"span"}>
                Report @{username}
            </Typography>
        </div>
    );
});

export default ReportUserComponent;
