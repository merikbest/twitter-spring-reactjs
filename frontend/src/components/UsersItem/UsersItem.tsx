import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import ListItem from "@material-ui/core/ListItem/ListItem";

import { selectUserDataId } from "../../store/ducks/user/selectors";
import { useUsersItemStyles } from "./UsersItemStyles";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import { UserResponse } from "../../types/user";
import { HoverItemDetail, useHoverItem } from "../../hook/useHoverItem";
import BlockButton from "./BlockButton/BlockButton";
import PendingButton from "./PendingButton/PendingButton";
import FollowButton from "./FollowButton/FollowButton";
import UnfollowButton from "./UnfollowButton/UnfollowButton";
import LinkWrapper from "../LinkWrapper/LinkWrapper";
import { PROFILE } from "../../constants/path-constants";
import UserItemInfo from "./UserItemInfo/UserItemInfo";
import UserItemAvatar from "./UserItemAvatar/UserItemAvatar";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import { fetchUserDetail } from "../../store/ducks/userDetail/actionCreators";

export interface UsersItemProps {
    user?: UserResponse,
    size?: UserItemSize
}

export enum UserItemSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

const UsersItem: FC<UsersItemProps> = memo(({ user, size }): ReactElement => {
    const classes = useUsersItemStyles({ size });
    const myProfileId = useSelector(selectUserDataId);
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);

    return (
        <LinkWrapper path={`${PROFILE}/${user?.id}`} visiblePopperWindow={visiblePopperWindow}>
            <ListItem className={classes.container}>
                <UserItemAvatar avatar={user?.avatar ?? DEFAULT_PROFILE_IMG} />
                <div
                    id={"userInfo"}
                    className={classes.userInfo}
                    onMouseEnter={() => handleHoverPopper({ userId: user?.id} as HoverItemDetail)}
                    onMouseLeave={handleLeavePopper}
                >
                    <UserItemInfo
                        fullName={user?.fullName}
                        username={user?.username}
                        about={user?.about}
                        isPrivateProfile={user?.isPrivateProfile}
                        isMyProfileBlocked={user?.isMyProfileBlocked}
                        size={size}
                    />
                    <PopperUserWindow visible={visiblePopperWindow} />
                </div>
                <div className={classes.buttonWrapper}>
                    {(myProfileId === user?.id) ? null : (
                        (user?.isMyProfileBlocked) ? null : (
                            (!user?.isFollower) ? (
                                (user?.isUserBlocked) ? (
                                    <BlockButton user={user} />
                                ) : (
                                    (user?.isWaitingForApprove) ? (
                                        <PendingButton user={user} />
                                    ) : (
                                        <FollowButton user={user} />
                                    )
                                )
                            ) : (
                                <UnfollowButton user={user} />
                            )
                        )
                    )}
                </div>
            </ListItem>
        </LinkWrapper>
    );
});

export default UsersItem;
