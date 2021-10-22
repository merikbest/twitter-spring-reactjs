import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Button, Hidden, IconButton, List, ListItem, Popover, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import CreateIcon from '@material-ui/icons/Create';

import {
    AnalyticsIcon,
    BookmarksIcon,
    BookmarksIconFilled,
    ExploreIcon,
    ExploreIconFilled,
    HelpCenterIcon,
    HomeIcon,
    HomeIconFilled,
    KeyboardShortcutsIcon,
    ListsIcon,
    ListsIconFilled,
    MessagesIcon,
    MessagesIconFilled,
    MoreIcon,
    NewslettersIcon,
    NotificationsIcon,
    NotificationsIconFilled,
    ProfileIcon,
    ProfileIconFilled,
    SettingsIcon,
    TwitterAdsIcon
} from "../../icons";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useSideMenuStyles} from "./SideMenuStyles";
import AddTweetModal from "../AddTweetModal/AddTweetModal";
import {selectLoadingState} from "../../store/ducks/tweets/selectors";
import {LoadingStatus} from "../../store/types";

const SideMenu: FC = (): ReactElement => {
    const classes = useSideMenuStyles();
    const location = useLocation();
    const myProfile = useSelector(selectUserData);
    const userData = useSelector(selectUserData);
    const loadingStatus = useSelector(selectLoadingState);

    const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);
    const [visibleHomeNotification, setVisibleHomeNotification] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            setVisibleHomeNotification(true);
        } else {
            setVisibleHomeNotification(false);
        }
    }, [loadingStatus]);

    const handleClickOpenAddTweet = (): void => {
        setVisibleAddTweet(true);
    };

    const onCloseAddTweet = (): void => {
        setVisibleAddTweet(false);
    };

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    return (
        <>
            <ul className={classes.container}>
                <li className={classes.itemWrapper}>
                    <NavLink to="/home" activeClassName={"selected"}>
                        <IconButton color="primary">
                            <TwitterIcon className={classes.logoIcon}/>
                        </IconButton>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/home" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {visibleHomeNotification && <span className={classes.homeNotification}/>}
                                    {(location.pathname.includes("/home")) ? (
                                        <span>{HomeIconFilled}</span>
                                    ) : (
                                        <span>{HomeIcon}</span>
                                    )} Home
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/search" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(location.pathname.includes("/search")) ? (
                                        <span>{ExploreIconFilled}</span>
                                    ) : (
                                        <span>{ExploreIcon}</span>
                                    )} Explore
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/notifications" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(myProfile?.notificationsCount !== 0) ? (
                                        <span className={classes.count}>
                                            {myProfile?.notificationsCount}
                                        </span>
                                    ) : null}
                                    {(location.pathname.includes("/notifications")) ? (
                                        <span>{NotificationsIconFilled}</span>
                                    ) : (
                                        <span>{NotificationsIcon}</span>
                                    )} Notifications
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/messages" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(myProfile?.unreadMessages?.length !== 0) ? (
                                        <span className={classes.count}>
                                            {myProfile?.unreadMessages?.length}
                                        </span>
                                    ) : null}
                                    {(location.pathname.includes("/messages")) ? (
                                        <span>{MessagesIconFilled}</span>
                                    ) : (
                                        <span>{MessagesIcon}</span>
                                    )} Messages
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/bookmarks" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(location.pathname.includes("/bookmarks")) ? (
                                        <span>{BookmarksIconFilled}</span>
                                    ) : (
                                        <span>{BookmarksIcon}</span>
                                    )} Bookmarks
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={"/lists"} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(location.pathname.includes("/lists")) ? (
                                        <span>{ListsIconFilled}</span>
                                    ) : (
                                        <span>{ListsIcon}</span>
                                    )} Lists
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={`/user/${userData?.id}`} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(location.pathname.includes(`/user/${myProfile?.id}`)) ? (
                                        <span>{ProfileIconFilled}</span>
                                    ) : (
                                        <span>{ProfileIcon}</span>
                                    )} Profile
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <div aria-describedby={id} onClick={handleOpenPopup}>
                        <Hidden smDown>
                            <Typography className={classes.label} variant="h6">
                                <span>{MoreIcon}</span> More
                            </Typography>
                        </Hidden>
                    </div>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClosePopup}
                        classes={{
                            paper: classes.popover,
                        }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    >
                        <div className={classes.listItemWrapper}>
                            <List>
                                {/*<ListItem>*/}
                                {/*    {TopicIcon}*/}
                                {/*    <Typography component={"span"}>*/}
                                {/*        Topics*/}
                                {/*    </Typography>*/}
                                {/*</ListItem>*/}
                                {/*<ListItem>*/}
                                {/*    {MomentsIcon}*/}
                                {/*    <Typography component={"span"}>*/}
                                {/*        Moments*/}
                                {/*    </Typography>*/}
                                {/*</ListItem>*/}
                                <ListItem>
                                    {NewslettersIcon}
                                    <Typography component={"span"}>
                                        Newsletters
                                    </Typography>
                                </ListItem>
                                <a href="https://ads.twitter.com/login" target="_blank">
                                    <ListItem>
                                        {TwitterAdsIcon}
                                        <Typography component={"span"}>
                                            Twitter Ads
                                        </Typography>
                                    </ListItem>
                                </a>
                                <a href="https://analytics.twitter.com/about" target="_blank">
                                    <ListItem>
                                        {AnalyticsIcon}
                                        <Typography component={"span"}>
                                            Analytics
                                        </Typography>
                                    </ListItem>
                                </a>
                                <div className={classes.divider}/>
                                <Link to={"/settings"}>
                                    <ListItem onClick={handleClosePopup}>
                                        {SettingsIcon}
                                        <Typography component={"span"}>
                                            Settings and privacy
                                        </Typography>
                                    </ListItem>
                                </Link>
                                <a href="https://help.twitter.com" target="_blank">
                                    <ListItem>
                                        {HelpCenterIcon}
                                        <Typography component={"span"}>
                                            Help Center
                                        </Typography>
                                    </ListItem>
                                </a>
                                {/*<ListItem>*/}
                                {/*    {DisplayIcon}*/}
                                {/*    <Typography component={"span"}>*/}
                                {/*        Display*/}
                                {/*    </Typography>*/}
                                {/*</ListItem>*/}
                                <ListItem>
                                    {KeyboardShortcutsIcon}
                                    <Typography component={"span"}>
                                        Keyboard shortcuts
                                    </Typography>
                                </ListItem>
                            </List>
                        </div>
                    </Popover>
                </li>
                <li className={classes.itemWrapper}>
                    <Button
                        onClick={handleClickOpenAddTweet}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        <Hidden smDown>
                            Tweet
                        </Hidden>
                        <Hidden mdUp>
                            <CreateIcon/>
                        </Hidden>
                    </Button>
                    <AddTweetModal onClose={onCloseAddTweet} visible={visibleAddTweet}/>
                </li>
            </ul>
            <UserSideProfile/>
        </>
    );
};

export default SideMenu;
