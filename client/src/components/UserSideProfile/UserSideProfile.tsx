import React, {FC, ReactElement, useState,} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Divider, List, ListItem, ListItemAvatar, Popover} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import {selectUserData} from "../../store/ducks/user/selectors";
import {signOut} from "../../store/ducks/user/actionCreators";
import {useUserSideProfileStyles} from "./UserSideProfileStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {CheckIcon, EditIcon} from "../../icons";
import LogoutModal from "./LogoutModal/LogoutModal";

const UserSideProfile: FC = (): ReactElement | null => {
    const classes = useUserSideProfileStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const myProfile = useSelector(selectUserData);
    const [visibleLogoutModal, setVisibleLogoutModal] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    const handleOpenPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const onOpenLogoutModal = (): void => {
        setVisibleLogoutModal(true);
    };

    const onCloseLogoutModal = (): void => {
        setVisibleLogoutModal(false);
    };

    const handleSignOut = (): void => {
        window.localStorage.removeItem('token');
        dispatch(signOut());
        history.push("/account/signin")
    };

    if (!myProfile) {
        return null;
    }

    return (
        <>
            <div aria-describedby={popoverId} onClick={handleOpenPopup} className={classes.container}>
                <Avatar
                    alt={`avatar ${myProfile?.id}`}
                    src={myProfile?.avatar?.src ? myProfile?.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <Typography variant={"h6"}>
                        {myProfile.fullName}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        @{myProfile.username}
                    </Typography>
                </div>
                <div className={classes.icon}>
                    <span>{EditIcon}</span>
                </div>
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
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={`${myProfile?.id}`} src={myProfile?.avatar?.src}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant={"h6"} component="div">
                                    {myProfile?.fullName}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="subtitle1" component="div">
                                    @{myProfile?.username}
                                </Typography>
                            }
                        />
                        <span>{CheckIcon}</span>
                    </ListItem>
                    <div className={classes.listItemWrapper}>
                        <Divider component="li"/>
                        <ListItem>
                            <Typography variant="body1" component="div">
                                Add an existing account
                            </Typography>
                        </ListItem>
                        <Divider component="li"/>
                        <ListItem onClick={onOpenLogoutModal}>
                            <Typography variant="body1" component="div">
                                Log out @{myProfile?.username}
                            </Typography>
                        </ListItem>
                    </div>
                </List>
            </Popover>
            <LogoutModal
                visible={visibleLogoutModal}
                onClose={onCloseLogoutModal}
                handleSignOut={handleSignOut}
            />
        </>
    );
};

export default UserSideProfile;
