import React, { memo, ReactElement } from "react";
import { ClickAwayListener, List } from "@material-ui/core";
import { useSelector } from "react-redux";

import { useUserPageActionsStyles } from "./UserPageActionsStyles";
import { EditIcon, MomentsIcon, ReportIcon, ShareIcon } from "../../../icons";
import { useGlobalStyles } from "../../../util/globalClasses";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import {
    selectUserProfileIsFollower,
    selectUserProfileIsPrivateProfile,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import AddUserToListsButton from "./AddUserToListsButton/AddUserToListsButton";
import CopyProfileLinkButton from "./CopyProfileLinkButton/CopyProfileLinkButton";
import MuteUserButton from "./MuteUserButton/MuteUserButton";
import BlockUserButton from "./BlockUserButton/BlockUserButton";
import UserItemAction from "./UserItemAction/UserItemAction";
import ViewUserListsButton from "./ViewUserListsButton/ViewUserListsButton";
import ViewUserTopicsButton from "./ViewUserTopicsButton/ViewUserTopicsButton";
import { useClickAway } from "../../../hook/useClickAway";

const UserPageActions = memo((): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useUserPageActionsStyles();
    const username = useSelector(selectUserProfileUsername);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isFollower = useSelector(selectUserProfileIsFollower);
    const { open, onClickOpen, onClickClose } = useClickAway();

    return (
        <ClickAwayListener onClickAway={onClickClose}>
            <div className={classes.container}>
                <span className={globalClasses.userPageIconButton}>
                    <ActionIconButton actionText={"More"} onClick={onClickOpen} icon={EditIcon} />
                </span>
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            {(!isPrivateProfile || isFollower) && (
                                <>
                                    <ViewUserTopicsButton />
                                    <AddUserToListsButton />
                                    <ViewUserListsButton />
                                    <UserItemAction title={"View Moments"} icon={MomentsIcon} />
                                    {!isUserBlocked && (
                                        <>
                                            <UserItemAction title={"Share profile via..."} icon={ShareIcon} />
                                            <CopyProfileLinkButton onCloseUserPageActions={onClickClose} />
                                        </>
                                    )}
                                </>
                            )}
                            {!isUserBlocked && (
                                <MuteUserButton onCloseUserPageActions={onClickClose} />
                            )}
                            <BlockUserButton />
                            <UserItemAction title={`Report @${username}`} icon={ReportIcon} />
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
});

export default UserPageActions;
