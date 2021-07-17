import React, {FC, ReactElement, useState} from 'react';
import {Link} from 'react-router-dom';
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
    ExploreIcon
} from "../../icons";
import ModalBlock from "../ModalBlock/ModalBlock";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import UserSideProfile from "../UserSideProfile/UserSideProfile";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useSelector} from "react-redux";
import {useSideMenuStyles} from "./SideMenuStyles";

const SideMenu: FC = (): ReactElement => {
    const classes2 = useSideMenuStyles();
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
            <ul className={classes2.container}>
                <li className={classes2.itemWrapper} style={{marginBottom: 2,}}>
                    <Link to="/home">
                        <IconButton color="primary">
                            <TwitterIcon className={classes2.logoIcon}/>
                        </IconButton>
                    </Link>
                </li>
                <li className={classes2.itemWrapper}>
                    <Link to="/home">
                        <div>
                            <Hidden smDown>
                                <Typography className={classes2.label} variant="h6">
                                    <span>{HomeIcon}</span> Home
                                </Typography>
                            </Hidden>
                        </div>
                    </Link>
                </li>
                <li className={classes2.itemWrapper}>
                    <Link to="/search">
                        <div>
                            <Hidden smDown>
                                <Typography className={classes2.label} variant="h6">
                                    <span>{ExploreIcon}</span> Explore
                                </Typography>
                            </Hidden>
                        </div>
                    </Link>
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
                    <Link to={`/user/${userData?.user.id}`}>
                        <div>
                            <Hidden smDown>
                                <Typography className={classes2.label} variant="h6">
                                    <span>{ProfileIcon}</span> Profile
                                </Typography>
                            </Hidden>
                        </div>
                    </Link>
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
