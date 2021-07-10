import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, IconButton, Typography, Hidden} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/Search";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import MessageIcon from "@material-ui/icons/MailOutlineOutlined";
import BookmarkIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlineOutlined";
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import classNames from 'classnames';

import {home, search, notifications, messages, bookmarks, lists, profile, more} from "../../icons";
import {useHomeStyles} from "../../pages/Home/HomeStyles";
import ModalBlock from "../ModalBlock/ModalBlock";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useSelector} from "react-redux";

interface SideMenuProps {
    classes: ReturnType<typeof useHomeStyles>
}

const SideMenu: FC<SideMenuProps> = ({classes}: SideMenuProps): ReactElement => {
    const [visibleAddTweet, setSetVisibleAddTweet] = useState<boolean>(false);
    const userData = useSelector(selectUserData);

    const handleClickOpenAddTweet = () => {
        setSetVisibleAddTweet(true);
    };

    const onCloseAddTweet = () => {
        setSetVisibleAddTweet(false);
    };

    return (
        <>
            <ul className={classes.sideMenuList}>
                <li className={classes.sideMenuListItem} style={{marginBottom: 2,}}>
                    <Link to="/home">
                        <IconButton color="primary">
                            <TwitterIcon className={classes.logoIcon}/>
                        </IconButton>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    <Link to="/home">
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                    <span>{home}</span> Home
                                </Typography>
                            </Hidden>
                        </div>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    <Link to="/search">
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                    <span>{search}</span> Explore
                                </Typography>
                            </Hidden>
                        </div>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                <span>{notifications}</span> Notifications
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.sideMenuListItem}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                <span>{messages}</span> Messages
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.sideMenuListItem}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                <span>{bookmarks}</span> Bookmarks
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.sideMenuListItem}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                <span>{lists}</span> Lists
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.sideMenuListItem}>
                    <Link to={`/user/${userData?.user.id}`}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                    <span>{profile}</span> Profile
                                </Typography>
                            </Hidden>
                        </div>
                    </Link>
                </li>
                <li className={classes.sideMenuListItem}>
                    <div>
                        <Hidden smDown>
                            <Typography className={classes.sideMenuListItemLabel} variant="h6">
                                <span>{more}</span> More
                            </Typography>
                        </Hidden>
                    </div>
                </li>
                <li className={classes.sideMenuListItem}>
                    <Button
                        onClick={handleClickOpenAddTweet}
                        className={classes.sideMenuTweetButton}
                        variant="contained"
                        color="primary"
                        fullWidth>
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
                                classes={classes}
                                title={"What's happening?"}
                                buttonName={"Tweet"}/>
                        </div>
                    </ModalBlock>
                </li>
            </ul>
            <UserSideProfile classes={classes}/>
        </>
    );
};

export default SideMenu;
