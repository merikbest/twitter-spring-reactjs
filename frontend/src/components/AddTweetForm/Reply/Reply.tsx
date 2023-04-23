import React, { FC, memo, ReactElement } from "react";
import { Divider, Popover } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import { useReplyStyles } from "./ReplyStyles";
import { EveryoneReplyIcon, FollowReplyIcon, MentionReplyIcon } from "../../../icons";
import ChangeReplyWindow from "../../ChangeReplyWindow/ChangeReplyWindow";
import { ReplyType } from "../../../types/common";
import { usePopup } from "../../../hook/usePopup";

interface ReplyProps {
    replyType: ReplyType;
    setReplyType: (value: ReplyType | ((prevVar: ReplyType) => ReplyType)) => void;
    isUnsentTweet: boolean;
}

const Reply: FC<ReplyProps> = memo(({ replyType, setReplyType, isUnsentTweet }): ReactElement => {
    const classes = useReplyStyles();
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();

    const handleListItemClick = (reply: ReplyType): void => {
        setReplyType(reply);
        handleClosePopup();
    };

    return (
        <>
            <div className={classes.reply}>
                <Button onClick={handleOpenPopup} color="primary" disabled={isUnsentTweet} variant="text">
                    <span>
                        {replyType === ReplyType.EVERYONE && EveryoneReplyIcon}
                        {replyType === ReplyType.FOLLOW && FollowReplyIcon}
                        {replyType === ReplyType.MENTION && MentionReplyIcon}
                    </span>
                    <span>
                        {replyType === ReplyType.EVERYONE && "Everyone can reply"}
                        {replyType === ReplyType.FOLLOW && "People you follow"}
                        {replyType === ReplyType.MENTION && "Only people you mention"}
                    </span>
                </Button>
                <Divider />
            </div>
            <Popover
                id={popoverId}
                className={classes.popover}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
            >
                <ChangeReplyWindow replyType={replyType} onChangeTweetReplyType={handleListItemClick} />
            </Popover>
        </>
    );
});

export default Reply;
