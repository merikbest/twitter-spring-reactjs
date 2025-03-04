import React, { ReactElement } from "react";
import { ClickAwayListener, List } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useShareActionsModalStyles } from "./ShareActionsModalStyles";
import { MessagesIcon, ShareIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";
import ShareActionsItem from "./ShareActionsItem/ShareActionsItem";
import TweetListAction from "./TweetListAction/TweetListAction";
import CopyListLinkAction from "./CopyListLinkAction/CopyListLinkAction";

const ShareActionsModal = (): ReactElement => {
    const classes = useShareActionsModalStyles();
    const { t } = useTranslation();
    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.root}>
                <ActionIconButton
                    onClick={onClickOpen}
                    actionText={t("SHARE", { defaultValue: "Share" })}
                    icon={ShareIcon}
                />
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            <TweetListAction />
                            <ShareActionsItem
                                title={t("SEND_VIA_DIRECT_MESSAGE", { defaultValue: "Send via Direct Message" })}
                                icon={MessagesIcon}
                            />
                            <CopyListLinkAction onClickClose={onClickClose} />
                            <ShareActionsItem
                                title={t("SHARE_LIST", { defaultValue: "Share List" })}
                                icon={ShareIcon}
                            />
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default ShareActionsModal;
