import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Divider, List, ListItem, ListItemAvatar, Popover } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import {
    selectUserDataId,
    selectUserDataIsPrivateProfile,
    selectUserProfileAvatar,
    selectUserProfileFullName,
    selectUserProfileUsername
} from "../../store/ducks/user/selectors";
import { useUserSideProfileStyles } from "./UserSideProfileStyles";
import { CheckIcon, EditIcon } from "../../icons";
import LogoutModal from "./LogoutModal/LogoutModal";
import LockIcon from "../LockIcon/LockIcon";
import { usePopup } from "../../hook/usePopup";

const UserSideProfile: FC = (): ReactElement | null => {
    const classes = useUserSideProfileStyles();
    const myProfileId = useSelector(selectUserDataId);
    const avatar = useSelector(selectUserProfileAvatar);
    const fullName = useSelector(selectUserProfileFullName);
    const username = useSelector(selectUserProfileUsername);
    const isPrivateProfile = useSelector(selectUserDataIsPrivateProfile);
    const { popoverId, anchorEl, openPopover, handleOpenPopup, handleClosePopup } = usePopup();

    if (!myProfileId) {
        return null;
    }

    return (
        <>
            <div aria-describedby={popoverId} onClick={handleOpenPopup} className={classes.container}>
                <Avatar alt={`avatar ${myProfileId}`} src={avatar} />
                <div className={classes.info}>
                    <Typography variant={"h6"}>
                        {fullName}
                        {isPrivateProfile && <LockIcon />}
                    </Typography>
                    <Typography variant={"subtitle1"}>
                        @{username}
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
                classes={{ paper: classes.popover }}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                transformOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={`${myProfileId}`} src={avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant={"h6"} component="div">
                                    {fullName}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="subtitle1" component="div">
                                    @{username}
                                </Typography>
                            }
                        />
                        <span>{CheckIcon}</span>
                    </ListItem>
                    <div className={classes.listItemWrapper}>
                        <Divider component="li" />
                        <ListItem>
                            <Typography variant="body1" component="div">
                                Add an existing account
                            </Typography>
                        </ListItem>
                        <Divider component="li" />
                        <LogoutModal />
                    </div>
                </List>
            </Popover>
        </>
    );
};

export default UserSideProfile;
