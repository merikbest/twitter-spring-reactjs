import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ClickAwayListener, IconButton, List, ListItem} from "@material-ui/core";

import {useTweetComponentMoreStyles} from "./TweetComponentActionsStyles";
import {
    AddListsIcon,
    BlockIcon,
    DeleteIcon,
    EditIcon,
    EmbedTweetIcon,
    FollowIcon,
    MuteIcon,
    PinIcon,
    ReplyIcon,
    ReportIcon,
    TweetActivityIcon,
    UnfollowIcon
} from "../../../icons";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {Tweet} from "../../../store/ducks/tweets/contracts/state";
import {fetchPinTweet, fetchUnpinTweet} from "../../../store/ducks/user/actionCreators";
import {pinTweet} from "../../../store/ducks/userTweets/actionCreators";

interface TweetMoreProps {
    tweet: Tweet;
    userId: number;
    username: string;
    activeTab?: number;
}

const TweetComponentActions: FC<TweetMoreProps> = ({tweet, userId, username, activeTab}): ReactElement => {
    const classes = useTweetComponentMoreStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [open, setOpen] = useState(false);
    const follower = myProfile?.followers?.find((follower) => follower.id === userId);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onPinUserTweet = (): void => {
        if (myProfile?.pinnedTweet?.id === tweet.id) {
            dispatch(fetchUnpinTweet(tweet.id));
        } else {
            dispatch(fetchPinTweet(tweet.id));
            dispatch(pinTweet({tweet, activeTab}));
        }
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.root}>
                <IconButton onClick={handleClick}>
                    <span>{EditIcon}</span>
                </IconButton>
                {open ? (
                    <div className={classes.dropdown}>
                        <List>
                            {(myProfile?.id === userId) ? (
                                <>
                                    <ListItem className={classes.delete}>
                                        <span>{DeleteIcon}</span>
                                        <span className={classes.text}>Delete</span>
                                    </ListItem>
                                    <ListItem onClick={onPinUserTweet}>
                                        <span className={classes.textIcon}>{PinIcon}</span>
                                        <span className={classes.text}>
                                            {(myProfile.pinnedTweet?.id === tweet.id) ? (
                                                "Unpin from profile"
                                            ) : (
                                                "Pin to your profile"
                                            )}
                                        </span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{AddListsIcon}</span>
                                        <span className={classes.text}>{`Add/remove @${username} from Lists`}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{ReplyIcon}</span>
                                        <span className={classes.text}>Change who can reply</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{EmbedTweetIcon}</span>
                                        <span className={classes.text}>Embed Tweet</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{TweetActivityIcon}</span>
                                        <span className={classes.text}>View Tweet activity</span>
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem>
                                        {follower ? (
                                            <>
                                                <span className={classes.textIcon}>{UnfollowIcon}</span>
                                                <span className={classes.text}>{`Unfollow @${username}`}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className={classes.textIcon}>{FollowIcon}</span>
                                                <span className={classes.text}>{`Follow @${username}`}</span>
                                            </>
                                        )}
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{AddListsIcon}</span>
                                        <span className={classes.text}>{`Add/remove @${username} from Lists`}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{MuteIcon}</span>
                                        <span className={classes.text}>{`Mute @${username}`}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{BlockIcon}</span>
                                        <span className={classes.text}>{`Block @${username}`}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{EmbedTweetIcon}</span>
                                        <span className={classes.text}>Embed Tweet</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className={classes.textIcon}>{ReportIcon}</span>
                                        <span className={classes.text}>Report Tweet</span>
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
};

export default TweetComponentActions;
