import React, { FC, memo, ReactElement } from "react";
import { Typography } from "@material-ui/core";

import PopperUserWindow from "../../../../../PopperUserWindow/PopperUserWindow";
import { HoverItemDetail, useHoverItem } from "../../../../../../hook/useHoverItem";
import { useFollowerRequestsItemStyles } from "../FollowerRequestsItemStyles";
import { FollowerUserResponse } from "../../../../../../types/user";
import { fetchUserDetail } from "../../../../../../store/ducks/userDetail/actionCreators";

interface UserRequestsInfoProps {
    user: FollowerUserResponse;
}

const UserRequestsInfo: FC<UserRequestsInfoProps> = memo(({ user }): ReactElement => {
    const classes = useFollowerRequestsItemStyles();
    const { visiblePopperWindow, handleHoverPopper, handleLeavePopper } = useHoverItem(fetchUserDetail);

    return (
        <div className={classes.header}>
            <div id={"handleLeavePopper"} onMouseLeave={handleLeavePopper} className={classes.headerUserInfo}>
                <Typography
                    id={"handleHoverPopper"}
                    variant={"h6"}
                    onMouseEnter={() => handleHoverPopper({ userId: user.id } as HoverItemDetail)}>
                    {user?.fullName}
                </Typography>
                <Typography variant={"subtitle1"}>
                    @{user?.username}
                </Typography>
                <Typography variant={"body1"}>
                    {user?.about}
                </Typography>
                <PopperUserWindow visible={visiblePopperWindow} />
            </div>
        </div>
    );
});

export default UserRequestsInfo;
