import React, {FC,} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {colors, Menu, MenuItem} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';

import {selectUserData} from "../../store/ducks/user/selectors";
import {signOut} from "../../store/ducks/user/actionCreators";
import {useUserSideProfileStyles} from "./UserSideProfileStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";

const UserSideProfile: FC = () => {
    const classes = useUserSideProfileStyles();
    const dispatch = useDispatch();
    const userData = useSelector(selectUserData);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
            <div onClick={handleOpenPopup} className={classes.container}>
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
            <Menu
                classes={{
                    paper: classes.menu,
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClosePopup}
                keepMounted
            >
                <Link to={`/user/${userData.user.id}`}>
                    <MenuItem onClick={handleClosePopup}>My profile</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Log out @{userData.user.fullName}</MenuItem>
            </Menu>
        </>
    );
};

export default UserSideProfile;
