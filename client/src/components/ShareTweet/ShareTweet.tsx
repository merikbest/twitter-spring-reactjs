import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import CopyToClipboard from 'react-copy-to-clipboard';
import {ClickAwayListener, IconButton, List, ListItem, Snackbar} from "@material-ui/core";

import {useShareTweetModalStyles} from "./ShareTweetStyles";
import {AddBookmarksIcon, LinkIcon, MessagesIcon, ShareIcon} from "../../icons";
import {selectUserData} from "../../store/ducks/user/selectors";
import {addTweetToBookmarks} from "../../store/ducks/user/actionCreators";
import {removeTweetFromBookmarks} from "../../store/ducks/tweets/actionCreators";
import {CLIENT_URL} from "../../util/url";
import {TweetActions} from "../TweetComponent/TweetComponent";
import HoverAction from "../HoverAction/HoverAction";
import SendDirectTweetModal from "./SendDirectTweetModal/SendDirectTweetModal";
import {Tweet} from "../../store/ducks/tweets/contracts/state";

interface ShareTweetProps {
    tweet: Tweet;
    isFullTweet: boolean;
    visibleShareAction?: boolean;
    handleHoverAction?: (action: TweetActions) => void;
    handleLeaveAction?: () => void;
}

const ShareTweet: FC<ShareTweetProps> = (
    {
        tweet,
        isFullTweet,
        visibleShareAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const classes = useShareTweetModalStyles({isFullTweet});
    const dispatch = useDispatch();
    const location = useLocation();
    const myProfile = useSelector(selectUserData);
    const [open, setOpen] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const [snackBarMessage, setSnackBarMessage] = useState<string>("");
    const [visibleSendDirectTweetModal, setVisibleSendDirectTweetModal] = useState<boolean>(false);
    const isBookmarked = myProfile?.bookmarks?.find((bookmark) => bookmark.tweet.id === tweet.id);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onClickSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(true);
    };

    const onCloseSendViaDirectMessage = (): void => {
        setVisibleSendDirectTweetModal(false);
    };

    const onClickAddTweetToBookmarks = (): void => {
        dispatch(addTweetToBookmarks(tweet.id));

        if (location.pathname.includes("/bookmarks")) {
            dispatch(removeTweetFromBookmarks(tweet.id));
        }
        setOpenSnackBar(true);
        setSnackBarMessage("Tweet added to your Bookmarks");
        setOpen(false);
    };

    const onCopyLinkToTweet = (): void => {
        setOpenSnackBar(true);
        setSnackBarMessage("Copied to clipboard");
        setOpen(false);
    };

    const onSendDirectTweet = (): void => {
        setOpenSnackBar(true);
        setSnackBarMessage("Your Tweet was sent");
        setOpen(false);
    };

    const onCloseSnackBar = (): void => {
        setOpenSnackBar(false);
    };

    const closeShareTweet = (): void => {
        setOpen(false);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <IconButton
                        onClick={handleClick}
                        onMouseEnter={() => handleHoverAction?.(TweetActions.SHARE)}
                        onMouseLeave={handleLeaveAction}
                    >
                        <>{ShareIcon}</>
                        {visibleShareAction && <HoverAction actionText={"Share"}/>}
                    </IconButton>
                    {open ? (
                        <div className={classes.dropdown}>
                            <List>
                                <ListItem onClick={onClickSendViaDirectMessage}>
                                    <span className={classes.textIcon}>{MessagesIcon}</span>
                                    <span className={classes.text}>Send via Direct Message</span>
                                </ListItem>
                                <ListItem onClick={onClickAddTweetToBookmarks}>
                                    <span className={classes.textIcon}>{AddBookmarksIcon}</span>
                                    <span className={classes.text}>
                                        {isBookmarked ? "Remove Tweet from Bookmarks" : "Add Tweet to Bookmarks"}
                                    </span>
                                </ListItem>
                                <CopyToClipboard text={CLIENT_URL + location.pathname}>
                                    <ListItem onClick={onCopyLinkToTweet}>
                                        <span className={classes.textIcon}>{LinkIcon}</span>
                                        <span className={classes.text}>Copy link to Tweet</span>
                                    </ListItem>
                                </CopyToClipboard>
                                <ListItem>
                                    <span className={classes.textIcon}>{ShareIcon}</span>
                                    <span className={classes.text}>Share Tweet via ...</span>
                                </ListItem>
                            </List>
                        </div>
                    ) : null}
                    <SendDirectTweetModal
                        tweet={tweet}
                        visible={visibleSendDirectTweetModal}
                        onSendDirectTweet={onSendDirectTweet}
                        closeShareTweet={closeShareTweet}
                        onClose={onCloseSendViaDirectMessage}
                    />
                    <Snackbar
                        className={classes.snackBar}
                        anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                        open={openSnackBar}
                        message={snackBarMessage}
                        onClose={onCloseSnackBar}
                        autoHideDuration={3000}
                    />
                </div>
            </ClickAwayListener>
        </>
    );
};

export default ShareTweet;
