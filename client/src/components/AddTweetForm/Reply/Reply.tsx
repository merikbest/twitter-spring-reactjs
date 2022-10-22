import React, {FC, MouseEvent, ReactElement, useState} from 'react';
import {Divider, Popover} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import {useReplyStyles} from "./ReplyStyles";
import {EveryoneReplyIcon, FollowReplyIcon, MentionReplyIcon} from "../../../icons";
import ChangeReplyWindow from "../../ChangeReplyWindow/ChangeReplyWindow";
import {ReplyType} from '../../../store/types/common';

interface ReplyProps {
    replyType: ReplyType;
    setReplyType: (value: ReplyType | ((prevVar: ReplyType) => ReplyType)) => void;
    isUnsentTweet: boolean;
}

const Reply: FC<ReplyProps> = ({replyType, setReplyType, isUnsentTweet}): ReactElement => {
    const classes = useReplyStyles();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    const handleListItemClick = (reply: ReplyType): void => {
        setReplyType(reply);
        setAnchorEl(null);
    };

    const handleOpenPopup = (event: MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
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
                <Divider/>
            </div>
            <Popover
                id={popoverId}
                className={classes.popover}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopup}
            >
                {/* TODO fix (see TweetComponentActions) */}
                {/*<ChangeReplyWindow*/}
                {/*    replyType={replyType}*/}
                {/*    onChangeTweetReplyType={handleListItemClick}*/}
                {/*/>*/}
            </Popover>
        </>
    );
};

export default Reply;
