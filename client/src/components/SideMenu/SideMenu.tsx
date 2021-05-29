import React, {FC, ReactElement} from 'react';
import {Button, IconButton, Typography, Hidden} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import SearchIcon from "@material-ui/icons/Search";
import NotificationIcon from "@material-ui/icons/NotificationsOutlined";
import MessageIcon from "@material-ui/icons/MailOutlineOutlined";
import BookmarkIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ListIcon from "@material-ui/icons/ListAltOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlineOutlined";
import CreateIcon from '@material-ui/icons/Create';

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import ModalBlock from "../ModalBlock/ModalBlock";
import {AddTweetForm} from "../AddTweetForm/AddTweetForm";
import { Link } from 'react-router-dom';

interface SideMenuProps {
    classes: ReturnType<typeof useHomeStyles>
}

const SideMenu: FC<SideMenuProps> = ({classes}: SideMenuProps): ReactElement => {
    const [visibleAddTweet, setSetVisibleAddTweet] = React.useState<boolean>(false);

    const handleClickOpenAddTweet = () => {
        setSetVisibleAddTweet(true);
    };

    const onCloseAddTweet = () => {
        setSetVisibleAddTweet(false);
    };

    return (
        <ul className={classes.sideMenuList}>
            <li className={classes.sideMenuListItem}>
                <Link to={"/home"}>
                    <IconButton className={classes.logo} color="primary">
                        <TwitterIcon className={classes.logoIcon}/>
                    </IconButton>
                </Link>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <SearchIcon className={classes.sideMenuListItemIcon}/>
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">
                            Поиск
                        </Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <NotificationIcon className={classes.sideMenuListItemIcon}/>
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">
                            Уведомления
                        </Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <MessageIcon className={classes.sideMenuListItemIcon}/>
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">
                            Сообщения
                        </Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <BookmarkIcon className={classes.sideMenuListItemIcon}/>
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">
                            Закладки
                        </Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <ListIcon className={classes.sideMenuListItemIcon}/>
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">
                            Список
                        </Typography>
                    </Hidden>
                </div>
            </li>
            <li className={classes.sideMenuListItem}>
                <div>
                    <PersonIcon className={classes.sideMenuListItemIcon}/>
                    <Hidden smDown>
                        <Typography className={classes.sideMenuListItemLabel} variant="h6">
                            Профиль
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
                        Твитнуть
                    </Hidden>
                    <Hidden mdUp>
                        <CreateIcon/>
                    </Hidden>
                </Button>
                <ModalBlock onClose={onCloseAddTweet} visible={visibleAddTweet}>
                    <div style={{width: 550}}>
                        <AddTweetForm maxRows={15} classes={classes}/>
                    </div>
                </ModalBlock>
            </li>
        </ul>
    );
};

export default SideMenu;
