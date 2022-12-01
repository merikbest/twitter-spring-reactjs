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
    TopicIcon,
    TweetIcon,
    TwitterAdsIcon
} from "../../icons";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {
    selectUserDataFollowerRequestsSize,
    selectUserDataId,
    selectUserDataIsPrivateProfile,
    selectUserDataNotificationsCount,
    selectUserDataUnreadMessagesSize
} from "../../store/ducks/user/selectors";
import {useSideMenuStyles} from "./SideMenuStyles";
import AddTweetModal from "../AddTweetModal/AddTweetModal";
import {selectLoadingState} from "../../store/ducks/tweets/selectors";
import DisplayModal from "./DisplayModal/DisplayModal";
import {DisplayProps} from "../../pages/Settings/AccessibilityDisplayLanguages/Display/Display";
import FollowerRequestsModal from "./FollowerRequestsModal/FollowerRequestsModal";
import {useGlobalStyles} from "../../util/globalClasses";
import {resetFollowerRequestsState} from "../../store/ducks/followerRequests/actionCreators";
import {
    BOOKMARKS,
    HOME,
    LISTS,
    MESSAGES,
    NOTIFICATIONS,
    PROFILE,
    SEARCH,
    SETTINGS,
    TOPICS_FOLLOWED
} from "../../util/pathConstants";
import {HELP_TWITTER, TWITTER_ABOUT, TWITTER_LOGIN} from "../../util/url";
import {LoadingStatus} from "../../store/types/common";

const SideMenu: FC<DisplayProps> = ({changeBackgroundColor, changeColorScheme}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useSideMenuStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const myProfileId = useSelector(selectUserDataId);
    const notificationsCount = useSelector(selectUserDataNotificationsCount);
    const unreadMessagesSize = useSelector(selectUserDataUnreadMessagesSize);
    const followerRequestsSize = useSelector(selectUserDataFollowerRequestsSize);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
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
                    <NavLink to={HOME} activeClassName={"selected"}>
                        <div className={classes.logoIcon}>
                            <IconButton color="primary">
                                {TweetIcon}
                            </IconButton>
                        </div>
                    </NavLink>
                </li>
                <li className={classes.itemWrapper}>
                    <NavLink to={HOME} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {visibleHomeNotification &&
                                        <span id={"homeNotification"} className={classes.homeNotification}/>}
                                    {(location.pathname.includes(HOME)) ? (
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
                    <NavLink to={SEARCH} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(SEARCH)) ? (
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
                    <NavLink to={NOTIFICATIONS} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(notificationsCount !== 0) && (
                                        <span id={"notificationsCount"} className={classes.count}>
                                            {notificationsCount}
                                        </span>
                                    )}
                                    {(location.pathname.includes(NOTIFICATIONS)) ? (
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
                    <NavLink to={MESSAGES} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(unreadMessagesSize !== 0) && (
                                        <span className={classes.count}>
                                            {unreadMessagesSize}
                                        </span>
                                    )}
                                    {(location.pathname.includes(MESSAGES)) ? (
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
                    <NavLink to={BOOKMARKS} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(BOOKMARKS)) ? (
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
                    <NavLink to={LISTS} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(LISTS)) ? (
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
                    <NavLink to={`${PROFILE}/${myProfileId}`} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <>
                                    {(location.pathname.includes(`${PROFILE}/${myProfileId}`)) ? (
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
                    <div
                        id={"openPopup"}
                        aria-describedby={popoverId}
                        onClick={handleOpenPopup}
                    >
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
                                {(isPrivateProfile) && (
                                    <ListItem id={"openFollowerRequestsModal"} onClick={onOpenFollowerRequestsModal}>
                                        {FollowerRequestIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Follower requests
                                            <span className={classes.followerRequestsCount}>
                                                {followerRequestsSize}
                                            </span>
                                        </Typography>
                                    </ListItem>
                                )}
                                <Link to={TOPICS_FOLLOWED}>
                                    <ListItem id={"closePopup"} onClick={handleClosePopup}>
                                        {TopicIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Topics
                                        </Typography>
                                    </ListItem>
                                </Link>
                                <ListItem>
                                    {NewslettersIcon}
                                    <Typography variant={"body1"} component={"span"}>
                                        Newsletters
                                    </Typography>
                                </ListItem>
                                <a href={TWITTER_LOGIN} target="_blank">
                                    <ListItem>
                                        {TwitterAdsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Twitter Ads
                                        </Typography>
                                    </ListItem>
                                </a>
                                <a href={TWITTER_ABOUT} target="_blank">
                                    <ListItem>
                                        {AnalyticsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Analytics
                                        </Typography>
                                    </ListItem>
                                </a>
                                <Divider/>
                                <Link to={SETTINGS}>
                                    <ListItem id={"closePopup"} onClick={handleClosePopup}>
                                        {SettingsIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Settings and privacy
                                        </Typography>
                                    </ListItem>
                                </Link>
                                <a href={HELP_TWITTER} target="_blank">
                                    <ListItem>
                                        {HelpCenterIcon}
                                        <Typography variant={"body1"} component={"span"}>
                                            Help Center
                                        </Typography>
                                    </ListItem>
                                </a>
                                <ListItem id={"openDisplayModal"} onClick={onOpenDisplayModal}>
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
