import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {useShareTweetModalStyles} from "./ShareTweetStyles";
import {AddBookmarksIcon, LinkIcon, MessagesIcon, ShareIcon} from "../../../icons";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {addTweetToBookmarks} from "../../../store/ducks/user/actionCreators";

interface ShareTweet {
    tweetId: string;
}

const ShareTweet: FC<ShareTweet> = ({tweetId}): ReactElement => {
    const classes = useShareTweetModalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onClickAddTweetToBookmarks = (): void => {
        dispatch(addTweetToBookmarks(tweetId));
    };

    return (
        <div>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <IconButton onClick={handleClick}>
                        <span>{ShareIcon}</span>
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
                                    <span className={classes.text}>Add Tweets to Bookmarks</span>
                                </ListItem>
                                <ListItem>
                                    <span className={classes.textIcon}>{LinkIcon}</span>
                                    <span className={classes.text}>Copy link to Tweet</span>
                                </ListItem>
                                <ListItem>
                                    <span className={classes.textIcon}>{ShareIcon}</span>
                                    <span className={classes.text}>Share Tweet via ...</span>
                                </ListItem>
                            </List>
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        </div>
    );
};

export default ShareTweet;
