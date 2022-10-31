import React, {memo, ReactElement, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ClickAwayListener, List, ListItem, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import CopyToClipboard from "react-copy-to-clipboard";

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
import {LISTS_MEMBERSHIPS} from "../../../util/pathConstants";
import {setOpenSnackBar} from "../../../store/ducks/actionSnackbar/actionCreators";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import {processUserToBlocklist, processUserToMuteList} from "../../../store/ducks/user/actionCreators";
import BlockUserModal from "../../../components/BlockUserModal/BlockUserModal";
import {selectUserProfile} from "../../../store/ducks/userProfile/selectors";

const UserPageActions = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserPageActionsStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const userProfile = useSelector(selectUserProfile);
    const [open, setOpen] = useState<boolean>(false);
    const [visibleListsModal, setVisibleListsModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);

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

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: userProfile?.id!}));
        setVisibleBlockUserModal(false);
        dispatch(setOpenSnackBar(`@${userProfile?.username} has been ${userProfile?.isUserBlocked ? "unblocked" : "blocked"}.`));
    };

    const onCopyLinkToProfile = (): void => {
        dispatch(setOpenSnackBar("Copied to clipboard"));
        setOpen(false);
    };

    const handleMuteUser = (): void => {
        dispatch(processUserToMuteList({userId: userProfile?.id!}));
        dispatch(setOpenSnackBar(`@${userProfile?.username} has been ${userProfile?.isUserMuted ? "unmuted" : "muted"}.`));
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
                            {!userProfile?.isPrivateProfile && (
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
                                            Add/remove @{userProfile?.username} from Lists
                                        </Typography>
                                    </ListItem>
                                    <Link to={`${LISTS_MEMBERSHIPS}/${userProfile?.id}`} className={classes.routeLink}>
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
                                    {!userProfile?.isUserBlocked && (
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
                            {!userProfile?.isUserBlocked && (
                                <ListItem id={"handleMuteUser"} onClick={handleMuteUser}>
                                    <>{userProfile?.isUserMuted ? UnmuteIcon : MuteIcon}</>
                                    <Typography component={"span"}>
                                        {userProfile?.isUserMuted ? "Unmute" : "Mute"} @{userProfile?.username}
                                    </Typography>
                                </ListItem>
                            )}
                            <ListItem id={"openBlockUserModal"} onClick={onOpenBlockUserModal}>
                                <>{userProfile?.isUserBlocked ? UnblockIcon : BlockIcon}</>
                                <Typography component={"span"}>
                                    {userProfile?.isUserBlocked ? "Unblock" : "Block"} @{userProfile?.username}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <>{ReportIcon}</>
                                <Typography component={"span"}>
                                    Report @{userProfile?.username}
                                </Typography>
                            </ListItem>
                        </List>
                    </div>
                ) : null}
                <ListsModal userId={userProfile?.id!} visible={visibleListsModal} onClose={onCloseListsModal}/>
                <BlockUserModal
                    username={userProfile?.username!}
                    isUserBlocked={userProfile?.isUserBlocked!}
                    visible={visibleBlockUserModal}
                    onClose={onCloseBlockUserModal}
                    onBlockUser={onBlockUser}
                />
            </div>
        </ClickAwayListener>
    );
});

export default UserPageActions;
