import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";

import {useTopTweetsActionsModalStyles} from "./TopTweetsActionsModalStyles";
import {EditIcon, NotShowIcon, SeeLatestIcon} from "../../../icons";

const TopTweetsActionsModal: FC = (): ReactElement => {
    const classes = useTopTweetsActionsModalStyles();
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    return (
        <>
            <ClickAwayListener onClickAway={handleClickAway}>
                <div className={classes.root}>
                    <IconButton onClick={handleClick}>
                        <>{EditIcon}</>
                    </IconButton>
                    {open ? (
                        <div className={classes.dropdown}>
                            <List>
                                <ListItem>
                                    <div className={classes.listItemWrapper}>
                                        <span className={classes.textIcon}>
                                            {SeeLatestIcon}
                                        </span>
                                        <div>
                                            <Typography component={"div"} className={classes.title}>
                                                See top Tweets
                                            </Typography>
                                            <Typography component={"div"} className={classes.text}>
                                                You’re seeing top Tweets first. Latest Tweets will show up as they happen.
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <div className={classes.listItemWrapper}>
                                        <span className={classes.textIcon}>
                                            {NotShowIcon}
                                        </span>
                                        <div>
                                            <Typography component={"div"} className={classes.title}>
                                                Don’t show these Tweets in Home
                                            </Typography>
                                            <Typography component={"div"} className={classes.text}>
                                                Top Tweets from this List will no longer show up in your Home timeline.
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                            </List>
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        </>
    );
};

export default TopTweetsActionsModal;
