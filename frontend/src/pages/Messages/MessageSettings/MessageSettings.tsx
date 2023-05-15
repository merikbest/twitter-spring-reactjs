import React, { memo, ReactElement } from "react";
import { Paper, Typography } from "@material-ui/core";
import classnames from "classnames";

import { useMessageSettingsStyles } from "./MessageSettingsStyles";
import BackButton from "../../../components/BackButton/BackButton";
import DirectMessages from "../../Settings/PrivacyAndSafety/DirectMessages/DirectMessages";
import { useGlobalStyles } from "../../../util/globalClasses";

const MessageSettings = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessageSettingsStyles();

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
            <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)} variant="outlined">
                <BackButton />
                <Typography variant="h5">
                    Direct Messages
                </Typography>
            </Paper>
            <div className={globalClasses.contentWrapper}>
                <DirectMessages />
            </div>
        </Paper>
    );
});

export default MessageSettings;
