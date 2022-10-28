import React, {FC, memo, ReactElement} from 'react';
import {useSelector} from "react-redux";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Typography} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem/ListItem";

import {selectUserDataId} from "../../store/ducks/user/selectors";
import {useUsersItemStyles} from "./UsersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import {useGlobalStyles} from "../../util/globalClasses";
import {UserResponse} from "../../store/types/user";
import {useHoverUser} from "../../hook/useHoverUser";
import BlockButton from "./BlockButton/BlockButton";
import PendingButton from "./PendingButton/PendingButton";
import FollowButton from "./FollowButton/FollowButton";
import UnfollowButton from "./UnfollowButton/UnfollowButton";
import LockIcon from "../LockIcon/LockIcon";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import {PROFILE} from "../../util/pathConstants";

export interface UsersItemProps {
    user?: UserResponse,
    size?: UserItemSize
}

export enum UserItemSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

const UsersItem: FC<UsersItemProps> = memo(({user, size}): ReactElement => {
    const classes = useUsersItemStyles({size});
    const globalClasses = useGlobalStyles();
    const myProfileId = useSelector(selectUserDataId);
    const {visiblePopperWindow, handleHoverPopper, handleLeavePopper} = useHoverUser();
    const avatar = user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG;

    return (
        <LinkWrapper path={`${PROFILE}/${user?.id}`} visiblePopperWindow={visiblePopperWindow}>
            <ListItem className={classes.container}>
                <ListItemAvatar>
                    <Avatar className={globalClasses.avatar} alt={"avatar"} src={avatar}/>
                </ListItemAvatar>
                <div
                    id={"userInfo"}
                    className={classes.userInfo}
                    onMouseEnter={() => handleHoverPopper(user?.id!)}
                    onMouseLeave={handleLeavePopper}
                >
                    <Typography variant={"h6"} display={"inline"}>
                        {user?.fullName}
                    </Typography>
                    {user?.isPrivateProfile && <LockIcon/>}
                    <Typography variant={"subtitle1"} component={"div"}>
                        @{user?.username}
                    </Typography>
                    {(user?.isMyProfileBlocked) ? null : (
                        (size !== UserItemSize.SMALL) && (
                            <Typography variant={"body1"} display="block">
                                {user?.about}
                            </Typography>
                        )
                    )}
                    <PopperUserWindow visible={visiblePopperWindow}/>
                </div>
                <div className={classes.buttonWrapper}>
                    {(myProfileId === user?.id) ? null : (
                        (user?.isMyProfileBlocked) ? null : (
                            (!user?.isFollower) ? (
                                (user?.isUserBlocked) ? (
                                    <BlockButton user={user}/>
                                ) : (
                                    (user?.isWaitingForApprove) ? (
                                        <PendingButton user={user}/>
                                    ) : (
                                        <FollowButton user={user}/>
                                    )
                                )
                            ) : (
                                <UnfollowButton user={user}/>
                            )
                        )
                    )}
                </div>
            </ListItem>
        </LinkWrapper>
    );
});

export default UsersItem;
