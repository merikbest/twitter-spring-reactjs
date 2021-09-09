import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {NavLink, useLocation} from 'react-router-dom';
import {Button, Hidden, IconButton, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import CreateIcon from '@material-ui/icons/Create';

import {
    BookmarksIcon,
    BookmarksIconFilled,
    ExploreIcon,
    ExploreIconFilled,
    HomeIcon,
    HomeIconFilled,
    ListsIcon, ListsIconFilled,
    MessagesIcon,
    MessagesIconFilled,
    MoreIcon,
    NotificationsIcon,
    NotificationsIconFilled,
    ProfileIcon,
    ProfileIconFilled
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

    return (
        <>
            <ul className={classes.container}>
                <li className={classes.itemWrapper} style={{marginBottom: 2,}}>
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
                                    {visibleHomeNotification && <span className={classes.homeNotification}></span>}
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
                    <NavLink to={`/lists/${userData?.id}`} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.label} variant="h6">
                                    {(location.pathname.includes(`/lists/${userData?.id}`)) ? (
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
                    <div>
                        <Hidden smDown>
                            <Typography className={classes.label} variant="h6">
                                <span>{MoreIcon}</span> More
                            </Typography>
                        </Hidden>
                    </div>
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
