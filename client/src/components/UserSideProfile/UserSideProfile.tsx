import React, {FC,} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {colors, Divider, List, ListItem, ListItemAvatar, Menu, MenuItem, Popover} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';

import {selectUserData} from "../../store/ducks/user/selectors";
import {signOut} from "../../store/ducks/user/actionCreators";
import {useUserSideProfileStyles} from "./UserSideProfileStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {CheckIcon} from "../../icons";

const UserSideProfile: FC = () => {
    const classes = useUserSideProfileStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const userData = useSelector(selectUserData);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const handleSignOut = () => {
        window.localStorage.removeItem('token');
        dispatch(signOut());
    };

    if (!userData) {
        return null;
    }

    return (
        <>
            <div aria-describedby={id} onClick={handleOpenPopup} className={classes.container}>
                <Avatar
                    alt={`avatar ${userData?.user.id}`}
                    src={userData?.user.avatar?.src ? userData?.user.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <b>{userData.user.fullName}</b>
                    <Typography style={{color: colors.grey[500]}}>@{userData.user.username}</Typography>
                </div>
                <ArrowBottomIcon />
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
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={`${myProfile?.user.id}`} src={myProfile?.user.avatar?.src}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={myProfile?.user.fullName}
                            secondary={
                                <Typography component="span" variant="body2" color="textSecondary">
                                    @{myProfile?.user.username}
                                </Typography>
                            }
                        />
                        <span>{CheckIcon}</span>
                    </ListItem>
                    <div className={classes.listItemWrapper}>
                        <Divider component="li"/>
                        <ListItem>
                            Add an existing account
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem>
                            Log out @{myProfile?.user.username}
                        </ListItem>
                    </div>
                </List>
            </Popover>
        </>
    );
};

export default UserSideProfile;
