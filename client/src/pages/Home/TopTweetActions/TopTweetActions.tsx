import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {ClickAwayListener, Divider, IconButton, List, ListItem, Typography} from "@material-ui/core";

import {useTopTweetActionsStyles} from "./TopTweetActionsStyles";
import {SeeLatestIcon, SettingsIcon, ShowLatestTweets, ShowTopTweets, TopTweets} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {HoverActionProps, HoverActions, withHoverAction} from "../../../hoc/withHoverAction";
import HoverAction from "../../../components/HoverAction/HoverAction";

interface TopTweetActionsProps {
    switchTweets: boolean;
    handleSwitchTweets: () => void;
}

const TopTweetActions: FC<TopTweetActionsProps & HoverActionProps> = (
    {
        switchTweets,
        handleSwitchTweets,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useTopTweetActionsStyles();
    const [openTopTweetActions, setOpenTopTweetActions] = useState<boolean>(false);

    const handleCLickTopTweetActions = (): void => {
        setOpenTopTweetActions((prevState) => !prevState);
    };

    const handleClickAwayTopTweetActions = (): void => {
        setOpenTopTweetActions(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAwayTopTweetActions}>
            <div>
                <div className={classes.headerIcon}>
                    <IconButton
                        color="primary"
                        onClick={handleCLickTopTweetActions}
                        onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                        onMouseLeave={handleLeaveAction}
                    >
                        <>{TopTweets}</>
                        <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={"Top Tweets"}/>
                    </IconButton>
                </div>
                {!openTopTweetActions ? null : (
                    <div className={classes.dropdown}>
                        <div className={classes.dropdownHeader}>
                            <div className={classes.dropdownHeaderImage}>
                                {switchTweets ? ShowLatestTweets : ShowTopTweets}
                            </div>
                            <Typography variant={"h5"} component={"div"}>
                                {switchTweets ? "Latest Tweets show up as they happen" : "Home shows you top Tweets first"}
                            </Typography>
                        </div>
                        <Divider/>
                        <List>
                            <ListItem onClick={handleSwitchTweets}>
                                <div className={classes.listItemWrapper}>
                                    <span className={classes.textIcon}>
                                        {SeeLatestIcon}
                                    </span>
                                    <div>
                                        <Typography variant={"body1"} component={"div"}>
                                            {switchTweets ? "Go back Home" : "See latest Tweets instead"}
                                        </Typography>
                                        <Typography variant={"subtitle2"} component={"div"}>
                                            {switchTweets ? "You’ll see top Tweets first." : "You’ll see Tweets show up as they happen."}
                                        </Typography>
                                    </div>
                                </div>
                            </ListItem>
                            <Link to={"/settings/content_preferences"} className={globalClasses.linkWrapper}>
                                <ListItem>
                                    <div className={classes.listItemWrapper}>
                                    <span className={classes.textIcon}>
                                        {SettingsIcon}
                                    </span>
                                        <div>
                                            <Typography variant={"body1"} component={"div"}>
                                                View content preferences
                                            </Typography>
                                        </div>
                                    </div>
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default withHoverAction(TopTweetActions);