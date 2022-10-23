import React, {FC, memo, ReactElement, useState} from 'react';
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useShareTweetModalStyles} from "./ShareTweetStyles";
import {ShareIcon} from "../../icons";
import {useGlobalStyles} from "../../util/globalClasses";
import ActionIconButton from "../ActionIconButton/ActionIconButton";
import SendViaDirectMessageButton from "./SendViaDirectMessageButton/SendViaDirectMessageButton";
import AddTweetToBookmarksButton from "./AddTweetToBookmarksButton/AddTweetToBookmarksButton";
import CopyLinkToTweetButton from "./CopyLinkToTweetButton/CopyLinkToTweetButton";

interface ShareTweetProps {
    tweetId: number;
    isTweetBookmarked: boolean;
    isFullTweet: boolean;
}

const ShareTweet: FC<ShareTweetProps> = memo(({tweetId, isTweetBookmarked, isFullTweet}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useShareTweetModalStyles({isFullTweet});
    const [shareTweetOpen, setShareTweetOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setShareTweetOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setShareTweetOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <ActionIconButton
                    actionText={"Share"}
                    onClick={handleClick}
                    size={isFullTweet ? "medium" : "small"}
                    icon={ShareIcon}
                />
                {shareTweetOpen && (
                    <div className={classnames(classes.dropdown, globalClasses.svg)}>
                        <List>
                            <SendViaDirectMessageButton
                                tweetId={tweetId}
                                closeShareTweet={handleClickAway}
                            />
                            <AddTweetToBookmarksButton
                                tweetId={tweetId}
                                isTweetBookmarked={isTweetBookmarked}
                                closeShareTweet={handleClickAway}
                            />
                            <CopyLinkToTweetButton closeShareTweet={handleClickAway}/>
                            <ListItem>
                                <>{ShareIcon}</>
                                <Typography variant={"body1"} component={"span"}>
                                    Share Tweet via ...
                                </Typography>
                            </ListItem>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
});

export default ShareTweet;
