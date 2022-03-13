import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useLocation} from 'react-router-dom';
import {Button, Divider, Hidden, IconButton, List, ListItem, Popover, Typography} from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import classnames from "classnames";

import {
    AnalyticsIcon,
    BookmarksIcon,
    BookmarksIconFilled,
    DisplayIcon,
    ExploreIcon,
    ExploreIconFilled,
    FollowerRequestIcon,
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
    TweetIcon,
    TwitterAdsIcon
} from "../../icons";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useSideMenuStyles} from "./SideMenuStyles";
import AddTweetModal from "../AddTweetModal/AddTweetModal";
import {selectLoadingState} from "../../store/ducks/tweets/selectors";
import {LoadingStatus} from "../../store/types";
import DisplayModal from "./DisplayModal/DisplayModal";
import {DisplayProps} from "../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";
import FollowerRequestsModal from "./FollowerRequestsModal/FollowerRequestsModal";
import {useGlobalStyles} from "../../util/globalClasses";
import {resetFollowerRequestsState} from "../../store/ducks/followerRequests/actionCreators";

const SideMenu: FC<DisplayProps> = ({changeBackgroundColor, changeColorScheme}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useSideMenuStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const myProfile = useSelector(selectUserData);
    const userData = useSelector(selectUserData);
    const loadingStatus = useSelector(selectLoadingState);

    const [visibleAddTweet, setVisibleAddTweet] = useState<boolean>(false);
    const [visibleHomeNotification, setVisibleHomeNotification] = useState<boolean>(false);
    const [visibleDisplayModal, setVisibleDisplayModal] = useState<boolean>(false);
    const [visibleFollowerRequestsModal, setVisibleFollowerRequestsModal] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

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

    const onOpenDisplayModal = (): void => {
        setVisibleDisplayModal(true);
        handleClosePopup();
    };

    const onCloseDisplayModal = (): void => {
        setVisibleDisplayModal(false);
    };

    const onOpenFollowerRequestsModal = (): void => {
        setVisibleFollowerRequestsModal(true);
        handleClosePopup();
    };

    const onCloseFollowerRequestsModal = (): void => {
        setVisibleFollowerRequestsModal(false);
        dispatch(resetFollowerRequestsState());
    };

    return (
        <>
            <ul className={classes.container}>
                <li>
                    <NavLink to="/home" activeClassName={"selected"}>
                        <div className={classes.logoIcon}>
                            <IconButton color="primary">
                                {TweetIcon}
                            </IconButton>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/home" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {visibleHomeNotification && <span className={classes.homeNotification}/>}
                                    {(location.pathname.includes("/home")) ? (
                                        <span>{HomeIconFilled}</span>
                                    ) : (
                                        <span>{HomeIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Home
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/search" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes("/search")) ? (
                                        <span>{ExploreIconFilled}</span>
                                    ) : (
                                        <span>{ExploreIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Explore
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/notifications" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(myProfile?.notificationsCount !== 0) ? (
                                        <span className={classes.count}>
                                            {myProfile?.notificationsCount}
                                        </span>
                                    ) : null}
                                    {(location.pathname.includes("/notifications")) ? (
                                        <span>{NotificationsIconFilled}</span>
                                    ) : (
                                        <span>{NotificationsIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Notifications
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/messages" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(myProfile?.unreadMessagesSize !== 0) ? (
                                        <span className={classes.count}>
                                            {myProfile?.unreadMessagesSize}
                                        </span>
                                    ) : null}
                                    {(location.pathname.includes("/messages")) ? (
                                        <span>{MessagesIconFilled}</span>
                                    ) : (
                                        <span>{MessagesIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Messages
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to="/bookmarks" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes("/bookmarks")) ? (
                                        <span>{BookmarksIconFilled}</span>
                                    ) : (
                                        <span>{BookmarksIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Bookmarks
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={"/lists"} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes("/lists")) ? (
                                        <span>{ListsIconFilled}</span>
                                    ) : (
                                        <span>{ListsIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Lists
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={`/profile/${userData?.id}`} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(`/profile/${myProfile?.id}`)) ? (
                                        <span>{ProfileIconFilled}</span>
                                    ) : (
                                        <span>{ProfileIcon}</span>
                                    )}
                                    <Typography variant={"h5"}>
                                        Profile
                                    </Typography>
                                </>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <div aria-describedby={popoverId} onClick={handleOpenPopup}>
                        <Hidden smDown>
                            <>
                                <span>{MoreIcon}</span>
                                <Typography variant={"h5"}>
                                    More
                                </Typography>
                            </>
                        </Hidden>
                    </div>
                    <Popover
                        id={popoverId}
                        open={openPopover}
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
                        <div className={classnames(classes.listItemWrapper, globalClasses.svg)}>
                            <List>
                                {(myProfile?.isPrivateProfile) ? (
                                    <ListItem onClick={onOpenFollowerRequestsModal}>
                                        {FollowerRequestIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Follower requests
                                            <span className={classes.followerRequestsCount}>
                                                {myProfile.followerRequestsSize}
                                            </span>
                                        </Typography>
                                    </ListItem>
                                ) : null}
                                <ListItem>
                                    {NewslettersIcon}
                                    <Typography variant={"body1"} component={"span"}>
                                        Newsletters
                                    </Typography>
                                </ListItem>
                                <a href="https://ads.twitter.com/login" target="_blank">
                                    <ListItem>
                                        {TwitterAdsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Twitter Ads
                                        </Typography>
                                    </ListItem>
                                </a>
                                <a href="https://analytics.twitter.com/about" target="_blank">
                                    <ListItem>
                                        {AnalyticsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Analytics
                                        </Typography>
                                    </ListItem>
                                </a>
                                <Divider/>
                                <Link to={"/settings"}>
                                    <ListItem onClick={handleClosePopup}>
                                        {SettingsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Settings and privacy
                                        </Typography>
                                    </ListItem>
                                </Link>
                                <a href="https://help.twitter.com" target="_blank">
                                    <ListItem>
                                        {HelpCenterIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Help Center
                                        </Typography>
                                    </ListItem>
                                </a>
                                <ListItem onClick={onOpenDisplayModal}>
                                    {DisplayIcon}
                                    <Typography variant={"body1"} component={"span"}>
                                        Display
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    {KeyboardShortcutsIcon}
                                    <Typography variant={"body1"} component={"span"}>
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
                    <AddTweetModal visible={visibleAddTweet} onClose={onCloseAddTweet}/>
                    <FollowerRequestsModal
                        visible={visibleFollowerRequestsModal}
                        onClose={onCloseFollowerRequestsModal}
                    />
                    <DisplayModal
                        visible={visibleDisplayModal}
                        onClose={onCloseDisplayModal}
                        changeBackgroundColor={changeBackgroundColor}
                        changeColorScheme={changeColorScheme}
                    />
                </li>
            </ul>
            <UserSideProfile/>
        </>
    );
};

export default SideMenu;
