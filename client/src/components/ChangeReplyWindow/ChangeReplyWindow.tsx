import React, {FC, memo, ReactElement} from 'react';
import {List, ListItem, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";

import {useChangeReplyWindowStyles} from "./ChangeReplyWindowStyles";
import {CheckIcon, EveryoneReplyOutlinedIcon, FollowReplyOutlinedIcon, MentionReplyOutlinedIcon} from "../../icons";
import {ReplyType} from "../../store/types/common";
import {useSnackbar} from "../../hook/useSnackbar";
import {changeReplyType} from "../../store/ducks/tweets/actionCreators";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";

interface ChangeReplyWindowProps {
    tweetId: number;
    replyType: ReplyType;
    handleClickReplyDropdown: () => void;
    onCloseActionsDropdown: () => void;
}

const ChangeReplyWindow: FC<ChangeReplyWindowProps> = memo((
    {
        tweetId,
        replyType,
        handleClickReplyDropdown,
        onCloseActionsDropdown
    }
): ReactElement => {
    const classes = useChangeReplyWindowStyles();
    const dispatch = useDispatch();
    const {snackBarMessage, openSnackBar, setSnackBarMessage, setOpenSnackBar, onCloseSnackBar} = useSnackbar();

    const onChangeTweetReplyType = (replyType: ReplyType): void => {
        dispatch(changeReplyType({tweetId, replyType}));

        if (replyType === ReplyType.EVERYONE) {
            setSnackBarMessage("Everyone can reply now");
        } else if (replyType === ReplyType.FOLLOW) {
            setSnackBarMessage("People you follow can reply now");
        } else {
            setSnackBarMessage("Only you can reply now");
        }
        setOpenSnackBar(true);
        handleClickReplyDropdown();
        onCloseActionsDropdown();
    };

    return (
        <div className={classes.dropdown}>
            <div className={classes.infoWrapper}>
                <Typography variant={"h6"} component={"div"}>
                    Who can reply?
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    Choose who can reply to this Tweet.
                    Anyone mentioned can always reply.
                </Typography>
            </div>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem
                    className={classes.listItem}
                    onClick={() => onChangeTweetReplyType(ReplyType.EVERYONE)}
                    button
                >
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {EveryoneReplyOutlinedIcon}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        Everyone
                    </Typography>
                    {(replyType === ReplyType.EVERYONE) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    onClick={() => onChangeTweetReplyType(ReplyType.FOLLOW)}
                    button
                >
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {FollowReplyOutlinedIcon}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        People you follow
                    </Typography>
                    {(replyType === ReplyType.FOLLOW) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
                <ListItem
                    id={"lastItem"}
                    className={classes.listItem}
                    onClick={() => onChangeTweetReplyType(ReplyType.MENTION)}
                    button
                >
                    <div className={classes.iconCircle}>
                        <span className={classes.icon}>
                            {MentionReplyOutlinedIcon}
                        </span>
                    </div>
                    <Typography variant={"body1"} component={"span"}>
                        Only people you mention
                    </Typography>
                    {(replyType === ReplyType.MENTION) && (
                        <span className={classes.checkIcon}>
                            {CheckIcon}
                        </span>
                    )}
                </ListItem>
            </List>
            <ActionSnackbar
                snackBarMessage={snackBarMessage}
                openSnackBar={openSnackBar}
                onCloseSnackBar={onCloseSnackBar}
            />
        </div>
    );
});

export default ChangeReplyWindow;
