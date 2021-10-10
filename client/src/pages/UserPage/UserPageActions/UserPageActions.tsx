import React, {FC, ReactElement, useState} from 'react';
import {ClickAwayListener, IconButton, List, ListItem, Snackbar, Typography} from "@material-ui/core";
import {Link, useLocation} from 'react-router-dom';

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
    TopicIcon
} from "../../../icons";
import {User} from "../../../store/ducks/user/contracts/state";
import ListsModal from "../../../components/ListsModal/ListsModal";
import CopyToClipboard from 'react-copy-to-clipboard';
import {CLIENT_URL} from "../../../util/url";

interface UserPageActionsProps {
    user: User;
}

const UserPageActions: FC<UserPageActionsProps> = ({user}): ReactElement => {
    const classes = useUserPageActionsStyles();
    const location = useLocation();

    const [open, setOpen] = useState<boolean>(false);
    const [openSnackBar, setOpenSnackBar] = useState<boolean>(false);
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
        setOpenSnackBar(true);
        setOpen(false);
    };

    const onCloseSnackBar = (): void => {
        setOpenSnackBar(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.container}>
                <IconButton
                    onClick={handleClick}
                    className={classes.messageButton}
                    color="primary"
                >
                    {EditIcon}
                </IconButton>
                {open ? (
                    <div className={classes.dropdown}>
                        <List>
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
                            <Link to={`/lists/memberships/${user?.id}`} className={classes.link}>
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
                            <ListItem>
                                <>{MuteIcon}</>
                                <Typography component={"span"}>
                                    Mute @{user.username}
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <>{BlockIcon}</>
                                <Typography component={"span"}>
                                    Block @{user.username}
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
                {visibleListsModal && <ListsModal user={user} visible={visibleListsModal} onClose={onCloseListsModal}/>}
                <Snackbar
                    className={classes.snackBar}
                    anchorOrigin={{horizontal: "center", vertical: "bottom"}}
                    open={openSnackBar}
                    message="Copied to clipboard"
                    onClose={onCloseSnackBar}
                    autoHideDuration={3000}
                />
            </div>
        </ClickAwayListener>
    );
};

export default UserPageActions;
