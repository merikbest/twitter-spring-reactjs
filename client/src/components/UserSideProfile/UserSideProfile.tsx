import React, {FC,} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {colors, Menu, MenuItem} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ArrowBottomIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {selectUserData} from "../../store/ducks/user/selectors";
import {signOut} from "../../store/ducks/user/actionCreators";

interface UserSideProfileProps {
    classes: ReturnType<typeof useHomeStyles>;
}

const UserSideProfile: FC<UserSideProfileProps> = ({classes}: UserSideProfileProps) => {
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
            <div onClick={handleOpenPopup} className={classes.sideProfile}>
                <Avatar src="https://avatars.githubusercontent.com/u/56604599?v=4" />
                <div className={classes.sideProfileInfo}>
                    <b>{userData.user.fullName}</b>
                    <Typography style={{color: colors.grey[500]}}>@{userData.user.username}</Typography>
                </div>
                <ArrowBottomIcon />
            </div>
            <Menu
                classes={{
                    paper: classes.profileMenu,
                }}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClosePopup}
                keepMounted>
                <Link to={`/user/${userData.user.id}`}>
                    <MenuItem onClick={handleClosePopup}>Мой профиль</MenuItem>
                </Link>
                <MenuItem onClick={handleSignOut}>Выйти</MenuItem>
            </Menu>
        </>
    );
};

export default UserSideProfile;
