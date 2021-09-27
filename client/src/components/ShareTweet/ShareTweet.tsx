import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, List, ListItem, Snackbar} from "@material-ui/core";

import {useShareTweetModalStyles} from "./ShareTweetStyles";
import {AddBookmarksIcon, LinkIcon, MessagesIcon, ShareIcon} from "../../icons";
import {selectUserData} from "../../store/ducks/user/selectors";
import {addTweetToBookmarks} from "../../store/ducks/user/actionCreators";
import {useLocation} from "react-router-dom";
import {removeTweetFromBookmarks} from "../../store/ducks/tweets/actionCreators";
import {CLIENT_URL} from "../../util/url";
import CopyToClipboard from 'react-copy-to-clipboard';

interface ShareTweetProps {
    tweetId: string;
    isFullTweet: boolean;
}

const ShareTweet: FC<ShareTweetProps> = ({tweetId, isFullTweet}): ReactElement => {
    const classes = useShareTweetModalStyles({isFullTweet});
    const dispatch = useDispatch();
    const location = useLocation();
    const myProfile = useSelector(selectUserData);
    const [open, setOpen] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
    const isBookmarked = myProfile?.bookmarks?.find((bookmark) => bookmark.tweet.id === tweetId);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onClickAddTweetToBookmarks = (): void => {
        dispatch(addTweetToBookmarks(tweetId));

        if (location.pathname.includes("/bookmarks")) {
            dispatch(removeTweetFromBookmarks(tweetId));
        }
        setOpen(false);
    };

    const onCopyLinkToTweet = (): void => {
        setOpenSnackBar(true);
        setOpen(false);
    };

    const onCloseSnackBar = (): void => {
        setOpenSnackBar(false);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <IconButton onClick={handleClick}>
                        <>{ShareIcon}</>
                    </IconButton>
                    {open ? (
                        <div className={classes.dropdown}>
                            <List>
                                <ListItem>
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
                    <Snackbar
                        className={classes.snackBar}
                        anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                        open={openSnackBar}
                        message="Copied to clipboard"
                        onClose={onCloseSnackBar}
                        autoHideDuration={3000}
                    />
                </div>
            </ClickAwayListener>
        </>
    );
};

export default ShareTweet;
