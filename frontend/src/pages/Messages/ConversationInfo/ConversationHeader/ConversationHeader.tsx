import React, { memo, ReactElement } from "react";
import classnames from "classnames";
import { Paper, Typography } from "@material-ui/core";

import BackButton from "../../../../components/BackButton/BackButton";
import { useGlobalStyles } from "../../../../util/globalClasses";
import { useConversationInfoStyles } from "../ConversationInfoStyles";

const ConversationHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useConversationInfoStyles();

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
            <BackButton />
            <Typography variant="h5">
                Conversation info
            </Typography>
        </Paper>
    );
});

export default ConversationHeader;
