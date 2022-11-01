import React, {memo, ReactElement, useState} from "react";
import {Link} from "react-router-dom";
import {ClickAwayListener, List} from "@material-ui/core";
import {useSelector} from "react-redux";

import {useUserPageActionsStyles} from "./UserPageActionsStyles";
import {EditIcon, ListsIcon, MomentsIcon, ReportIcon, ShareIcon, TopicIcon} from "../../../icons";
import {useGlobalStyles} from "../../../util/globalClasses";
import {LISTS_MEMBERSHIPS} from "../../../util/pathConstants";
import ActionIconButton from "../../../components/ActionIconButton/ActionIconButton";
import {
    selectUserProfileId,
    selectUserProfileIsPrivateProfile,
    selectUserProfileIsUserBlocked,
    selectUserProfileUsername
} from "../../../store/ducks/userProfile/selectors";
import AddUserToListsButton from "./AddUserToListsButton/AddUserToListsButton";
import CopyProfileLinkButton from "./CopyProfileLinkButton/CopyProfileLinkButton";
import MuteUserButton from "./MuteUserButton/MuteUserButton";
import BlockUserButton from "./BlockUserButton/BlockUserButton";
import UserItemAction from "./UserItemAction/UserItemAction";

const UserPageActions = memo((): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useUserPageActionsStyles();
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const isUserBlocked = useSelector(selectUserProfileIsUserBlocked);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const [open, setOpen] = useState<boolean>(false);

    const handleClick = (): void => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (): void => {
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <div className={classes.container}>
                <span className={globalClasses.userPageIconButton}>
                    <ActionIconButton actionText={"More"} onClick={handleClick} icon={EditIcon}/>
                </span>
                {open && (
                    <div className={classes.dropdown}>
                        <List>
                            {!isPrivateProfile && (
                                <>
                                    <UserItemAction title={"View Topics"} icon={TopicIcon}/>
                                    <AddUserToListsButton/>
                                    <Link to={`${LISTS_MEMBERSHIPS}/${userProfileId}`} className={classes.routeLink}>
                                        <UserItemAction title={"View Lists"} icon={ListsIcon}/>
                                    </Link>
                                    <UserItemAction title={"View Moments"} icon={MomentsIcon}/>
                                    {!isUserBlocked && (
                                        <>
                                            <UserItemAction title={"Share profile via..."} icon={ShareIcon}/>
                                            <CopyProfileLinkButton onCloseUserPageActions={handleClickAway}/>
                                        </>
                                    )}
                                </>
                            )}
                            {!isUserBlocked && (
                                <MuteUserButton onCloseUserPageActions={handleClickAway}/>
                            )}
                            <BlockUserButton/>
                            <UserItemAction title={`Report @${username}`} icon={ReportIcon}/>
                        </List>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );
});

export default UserPageActions;
