import React, {FC, ReactElement, useState,} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Button, Divider, List, ListItem, ListItemAvatar, Popover} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import TwitterIcon from "@material-ui/icons/Twitter";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import {selectUserData} from "../../store/ducks/user/selectors";
import {signOut} from "../../store/ducks/user/actionCreators";
import {useUserSideProfileStyles} from "./UserSideProfileStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {CheckIcon, EditIcon} from "../../icons";

const UserSideProfile: FC = (): ReactElement | null => {
    const classes = useUserSideProfileStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const myProfile = useSelector(selectUserData);
    const [visibleLogoutModal, setVisibleLogoutModal] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

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
            <div aria-describedby={id} onClick={handleOpenPopup} className={classes.container}>
                <Avatar
                    alt={`avatar ${myProfile?.id}`}
                    src={myProfile?.avatar?.src ? myProfile?.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <b>{myProfile.fullName}</b>
                    <Typography style={{color: "rgb(83, 100, 113)"}}>
                        @{myProfile.username}
                    </Typography>
                </div>
                <div className={classes.icon}>
                    <span>{EditIcon}</span>
                </div>
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
                            <Avatar alt={`${myProfile?.id}`} src={myProfile?.avatar?.src}/>
                        </ListItemAvatar>
                        <ListItemText
                            primary={myProfile?.fullName}
                            secondary={
                                <Typography component="span" variant="body2" color="textSecondary">
                                    @{myProfile?.username}
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
                        <ListItem onClick={onOpenLogoutModal}>
                            Log out @{myProfile?.username}
                        </ListItem>
                    </div>
                </List>
            </Popover>
            <Dialog open={visibleLogoutModal} onClose={onCloseLogoutModal} aria-labelledby="form-dialog-title">
                <DialogContent style={{padding: 0}}>
                    <div className={classes.modalWrapper}>
                        <TwitterIcon />
                        <Typography className={classes.modalFullName}>
                            Log out of Twitter?
                        </Typography>
                        <div className={classes.modalUsername}>
                            You can always log back in at any time. If you just want to switch accounts,
                            you can do that by adding an existing account.
                        </div>
                        <div className={classes.modalButtonWrapper}>
                            <Button
                                className={classes.modalCancelButton}
                                onClick={onCloseLogoutModal}
                                variant="contained"
                            >
                                Cancel
                            </Button>
                            <Button
                                className={classes.modalLogoutButton}
                                onClick={handleSignOut}
                                variant="contained"
                                color="primary"
                            >
                                Log out
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UserSideProfile;
