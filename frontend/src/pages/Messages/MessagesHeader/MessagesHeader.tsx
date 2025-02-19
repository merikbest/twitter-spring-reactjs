import React, { memo, ReactElement } from "react";
import classnames from "classnames";
import { Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { MESSAGES_SETTINGS } from "../../../constants/path-constants";
import { NewMessageIcon, SettingsIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import { useMessagesHeaderStyles } from "./MessagesHeaderStyles";
import ActionIcon from "../ActionIcon/ActionIcon";
import MessagesModal from "../MessagesModal/MessagesModal";
import { useModalWindow } from "../../../hook/useModalWindow";

const MessagesHeader = memo((): ReactElement => {
    const { t } = useTranslation();
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesHeaderStyles();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
            <Typography variant="h5" className={globalClasses.pageHeaderTitleWrapper}>
                {t("MESSAGES", { defaultValue: "Messages" })}
            </Typography>
            <div className={classes.iconGroup}>
                <ActionIcon
                    path={MESSAGES_SETTINGS}
                    actionText={"Settings"}
                    translationKey={"SETTINGS"}
                    className={"icon"}
                    icon={SettingsIcon}
                />
                <ActionIcon
                    onClick={onOpenModalWindow}
                    actionText={"New message"}
                    translationKey={"NEW_MESSAGE"}
                    className={"icon"}
                    icon={NewMessageIcon}
                />
            </div>
            <MessagesModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </Paper>
    );
});

export default MessagesHeader;
