import React, {FC, ReactElement, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {ClickAwayListener, IconButton, List, ListItem, Typography} from "@material-ui/core";

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
import CopyToClipboard from 'react-copy-to-clipboard';
import {CLIENT_URL} from "../../../util/url";
import ActionSnackbar from "../../../components/ActionSnackbar/ActionSnackbar";
import {SnackbarProps, withSnackbar} from "../../../hoc/withSnackbar";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {HoverActions} from "../../../hoc/withHoverAction";
import {useGlobalStyles} from "../../../util/globalClasses";
import {UserProfileResponse} from "../../../store/types/user";

interface UserPageActionsProps {
    user: UserProfileResponse;
    isUserMuted: boolean;
    isUserBlocked: boolean;
    onMuteUser: () => void;
    onOpenBlockUserModal: () => void;
    visibleMoreAction?: boolean;
    handleHoverAction?: (action: HoverActions) => void;
    handleLeaveAction?: () => void;
}

const UserPageActions: FC<UserPageActionsProps & SnackbarProps> = (
    {
        user,
        isUserMuted,
        isUserBlocked,
        onMuteUser,
        onOpenBlockUserModal,
        visibleMoreAction,
        handleHoverAction,
        handleLeaveAction,
        openSnackBar,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserPageActionsStyles();
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
        setOpenSnackBar!(true);
        setOpen(false);
    };

    const handleMuteUser = () => {
        onMuteUser();
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.container}>
                <IconButton
                    onClick={handleClick}
                    onMouseEnter={() => handleHoverAction?.(HoverActions.MORE)}
                    onMouseLeave={handleLeaveAction}
                    className={globalClasses.userPageIconButton}
                    color="primary"
                >
                    {EditIcon}
                    <HoverAction visible={visibleMoreAction} actionText={"More"}/>
                </IconButton>
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
                                    <ListItem onClick={onOpenListsModal}>
                                        <>{AddListsIcon}</>
                                        <Typography component={"span"}>
                                            Add/remove @{user.username} from Lists
                                        </Typography>
                                    </ListItem>
                                    <Link to={`/lists/memberships/${user?.id}`} className={classes.routeLink}>
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
                                                <ListItem onClick={onCopyLinkToProfile}>
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
                                <ListItem onClick={handleMuteUser}>
                                    <>{isUserMuted ? UnmuteIcon : MuteIcon}</>
                                    <Typography component={"span"}>
                                        {isUserMuted ? "Unmute" : "Mute"} @{user.username}
                                    </Typography>
                                </ListItem>
                            )}
                            <ListItem onClick={onOpenBlockUserModal}>
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
                <ListsModal user={user} visible={visibleListsModal} onClose={onCloseListsModal}/>
                <ActionSnackbar
                    snackBarMessage={"Copied to clipboard"}
                    openSnackBar={openSnackBar!}
                    onCloseSnackBar={onCloseSnackBar!}
                />
            </div>
        </ClickAwayListener>
    );
};

export default withSnackbar(UserPageActions);
