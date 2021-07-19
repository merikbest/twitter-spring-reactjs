import React, {FC, ReactElement, useState} from 'react';
import {useSelector} from "react-redux";
import {NavLink, useLocation} from 'react-router-dom';
import {Button, Hidden, IconButton, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import CreateIcon from '@material-ui/icons/Create';

import {
    BookmarksIcon,
    HomeIcon,
    ListsIcon,
    MessagesIcon,
    MoreIcon,
    NotificationsIcon,
    ProfileIcon,
    ExploreIcon, HomeIconFilled, ExploreIconFilled, ProfileIconFilled
} from "../../icons";
import ModalBlock from "../ModalBlock/ModalBlock";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useSideMenuStyles} from "./SideMenuStyles";

const SideMenu: FC = (): ReactElement => {
    const classes2 = useSideMenuStyles();
    const location = useLocation();
    const myProfile = useSelector(selectUserData);
    const userData = useSelector(selectUserData);
    const [visibleAddTweet, setSetVisibleAddTweet] = useState<boolean>(false);

    const handleClickOpenAddTweet = () => {
        setSetVisibleAddTweet(true);
    };

    const onCloseAddTweet = () => {
        setSetVisibleAddTweet(false);
    };

    return (
        <>
            <ul className={classes2.container}>
                <li className={classes2.itemWrapper} style={{marginBottom: 2,}}>
                    <NavLink to="/home" activeClassName={"selected"}>
                        <IconButton color="primary">
                            <TwitterIcon className={classes2.logoIcon}/>
                        </IconButton>
                    </NavLink>
                </li>
                <li className={classes2.itemWrapper}>
                    <NavLink to="/home" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes2.label} variant="h6">
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
                <li className={classes2.itemWrapper}>
                    <NavLink to="/search" activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes2.label} variant="h6">
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
                <li className={classes2.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes2.label} variant="h6">
                                <span>{NotificationsIcon}</span> Notifications
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes2.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes2.label} variant="h6">
                                <span>{MessagesIcon}</span> Messages
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes2.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes2.label} variant="h6">
                                <span>{BookmarksIcon}</span> Bookmarks
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes2.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes2.label} variant="h6">
                                <span>{ListsIcon}</span> Lists
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes2.itemWrapper}>
                    <NavLink to={`/user/${userData?.user.id}`} activeClassName={"selected"}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes2.label} variant="h6">
                                    {(location.pathname.includes(`/user/${myProfile?.user.id}`)) ? (
                                        <span>{ProfileIconFilled}</span>
                                    ) : (
                                        <span>{ProfileIcon}</span>
                                    )} Profile
                                </Typography>
                            </Hidden>
                        </div>
                    </NavLink>
                </li>
                <li className={classes2.itemWrapper}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes2.label} variant="h6">
                                <span>{MoreIcon}</span> More
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes2.itemWrapper}>
                    <Button
                        onClick={handleClickOpenAddTweet}
                        className={classes2.button}
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
                    <ModalBlock onClose={onCloseAddTweet} visible={visibleAddTweet}>
                        <div style={{width: 550}}>
                            <AddTweetForm
                                maxRows={15}
                                title={"What's happening?"}
                                buttonName={"Tweet"}
                            />
                        </div>
                    </ModalBlock>
                </li>
            </ul>
            <UserSideProfile/>
        </>
    );
};

export default SideMenu;
