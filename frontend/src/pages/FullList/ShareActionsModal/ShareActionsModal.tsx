import React, { ReactElement } from "react";
import { ClickAwayListener, List } from "@material-ui/core";

import { useShareActionsModalStyles } from "./ShareActionsModalStyles";
import { LinkIcon, MessagesIcon, ShareIcon, TweetThisIcon } from "../../../icons";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import { useClickAway } from "../../../hook/useClickAway";
import ShareActionsItem from "./ShareActionsItem/ShareActionsItem";

const ShareActionsModal = (): ReactElement => {
    const classes = useShareActionsModalStyles();
    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.root}>
                <ActionIconButton onClick={onClickOpen} actionText={"Share"} icon={ShareIcon} />
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            <ShareActionsItem title={"Tweet this"} icon={TweetThisIcon} />
                            <ShareActionsItem title={"Send via Direct Message"} icon={MessagesIcon} />
                            <ShareActionsItem title={"Copy link to List"} icon={LinkIcon} />
                            <ShareActionsItem title={"Share List"} icon={ShareIcon} />
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default ShareActionsModal;
