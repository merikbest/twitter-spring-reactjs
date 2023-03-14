import React, { memo, ReactElement } from "react";
import classnames from "classnames";
import { Paper, Typography } from "@material-ui/core";

import { MESSAGES_SETTINGS } from "../../../constants/path-constants";
import { NewMessageIcon, SettingsIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useMessagesHeaderStyles } from "./MessagesHeaderStyles";
import ActionIcon from "../ActionIcon/ActionIcon";
import MessagesModal from "../MessagesModal/MessagesModal";
import { useMessagesModal } from "../MessagesModal/useMessagesModal";

const MessagesHeader = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useMessagesHeaderStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useMessagesModal();

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
            <Typography variant="h5" className={globalClasses.pageHeaderTitleWrapper}>
                Messages
            </Typography>
            <div className={classes.iconGroup}>
                <ActionIcon
                    path={MESSAGES_SETTINGS}
                    actionText={"Settings"}
                    className={"icon"}
                    icon={SettingsIcon}
                />
                <ActionIcon
                    onClick={onOpenModalWindow}
                    actionText={"New message"}
                    className={"icon"}
                    icon={NewMessageIcon}
                />
            </div>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </Paper>
    );
});

export default MessagesHeader;
