import React, {FC, ReactElement, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import CopyToClipboard from 'react-copy-to-clipboard';

import {useUserPageActionsStyles} from "./UserPageActionsStyles";
import {
    AddListsIcon,
    BlockIcon,
    EditIcon,
    LinkIcon,
    ListsIcon,
    MomentsIcon,
    MuteIcon,
    ReportIcon,
    ShareIcon,
    TopicIcon,
    UnblockIcon,
    UnmuteIcon
} from "../../../icons";
import ListsModal from "../../../components/ListsModal/ListsModal";
import {CLIENT_URL} from "../../../util/url";
import {useGlobalStyles} from "../../../util/globalClasses";
import {UserProfileResponse} from "../../../store/types/user";
import {LISTS_MEMBERSHIPS} from "../../../util/pathConstants";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";

interface UserPageActionsProps {
    user: UserProfileResponse;
    isUserMuted: boolean;
    isUserBlocked: boolean;
    onMuteUser: () => void;
    onOpenBlockUserModal: () => void;
}

const UserPageActions: FC<UserPageActionsProps> = (
    {
        user,
        isUserMuted,
        isUserBlocked,
        onMuteUser,
        onOpenBlockUserModal
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserPageActionsStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const [open, setOpen] = useState<boolean>(false);
    const [visibleListsModal, setVisibleListsModal] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    const onOpenListsModal = (): void => {
        setVisibleListsModal(true);
    };

    const onCloseListsModal = (): void => {
        setVisibleListsModal(false);
    };

    const onCopyLinkToProfile = (): void => {
        dispatch(setOpenSnackBar("Copied to clipboard"));
        setOpen(false);
    };

    const handleMuteUser = (): void => {
        onMuteUser();
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.container}>
                <span className={globalClasses.userPageIconButton}>
                    <ActionIconButton actionText={"More"} onClick={handleClick} icon={EditIcon}/>
                </span>
                {open ? (
                    <div className={classes.dropdown}>
                        <List>
                            {!user.isPrivateProfile && (
                                <>
                                    <ListItem>
                                        <>{TopicIcon}</>
                                        <Typography component={"span"}>
                                            View Topics
                                        </Typography>
                                    </ListItem>
                                    <ListItem id={"openListsModal"} onClick={onOpenListsModal}>
                                        <>{AddListsIcon}</>
                                        <Typography component={"span"}>
                                            Add/remove @{user.username} from Lists
                                        </Typography>
                                    </ListItem>
                                    <Link to={`${LISTS_MEMBERSHIPS}/${user?.id}`} className={classes.routeLink}>
                                        <ListItem>
                                            <>{ListsIcon}</>
                                            <Typography component={"span"}>
                                                View Lists
                                            </Typography>
                                        </ListItem>
                                    </Link>
                                    <ListItem>
                                        <>{MomentsIcon}</>
                                        <Typography component={"span"}>
                                            View Moments
                                        </Typography>
                                    </ListItem>
                                    {!isUserBlocked && (
                                        <>
                                            <ListItem>
                                                <>{ShareIcon}</>
                                                <Typography component={"span"}>
                                                    Share profile via...
                                                </Typography>
                                            </ListItem>
                                            <CopyToClipboard text={CLIENT_URL + location.pathname}>
                                                <ListItem id={"copyLinkToProfile"} onClick={onCopyLinkToProfile}>
                                                    <>{LinkIcon}</>
                                                    <Typography component={"span"}>
                                                        Copy link to profile
                                                    </Typography>
                                                </ListItem>
                                            </CopyToClipboard>
                                        </>
                                    )}
                                </>
                            )}
                            {!isUserBlocked && (
                                <ListItem id={"handleMuteUser"} onClick={handleMuteUser}>
                                    <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
                                    <Typography component={"span"}>
                                        {isUserMuted ? "Unmute" : "Mute"} @{user.username}
                                    </Typography>
                                </ListItem>
                            )}
                            <ListItem id={"openBlockUserModal"} onClick={onOpenBlockUserModal}>
                                <>{isUserBlocked ? UnblockIcon : BlockIcon}</>
                                <Typography component={"span"}>
                                    {isUserBlocked ? "Unblock" : "Block"} @{user.username}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <>{ReportIcon}</>
                                <Typography component={"span"}>
                                    Report @{user.username}
                                </Typography>
                            </ListItem>
                        </List>
                    </div>
                ) : null}
                <ListsModal userId={user.id} visible={visibleListsModal} onClose={onCloseListsModal}/>
            </div>
        </ClickAwayListener>
    );
};

export default UserPageActions;
