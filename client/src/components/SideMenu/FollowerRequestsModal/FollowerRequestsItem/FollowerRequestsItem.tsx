import React, {FC, ReactElement} from 'react';
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useFollowerRequestsItemStyles} from "./FollowerRequestsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {HoverUserProps, withHoverUser} from "../../../../hoc/withHoverUser";
import {User} from "../../../../store/ducks/user/contracts/state";
import PopperUserWindow from "../../../PopperUserWindow/PopperUserWindow";
import {acceptFollowRequest, declineFollowRequest} from "../../../../store/ducks/user/actionCreators";

interface FollowerRequestsItemProps {
    user: User
}

const FollowerRequestsItem: FC<FollowerRequestsItemProps & HoverUserProps> = (
    {
        user,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const classes = useFollowerRequestsItemStyles();
    const dispatch = useDispatch();

    const handleDeclineFollowerRequest = (): void => {
        dispatch(declineFollowRequest(user.id!));
    };

    const handleAcceptFollowerRequest = (): void => {
        dispatch(acceptFollowRequest(user.id!));
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Link to={`/user/${user?.id}`} className={classes.link}>
                <Avatar
                    className={classes.listAvatar}
                    src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <Link to={`/user/${user?.id}`} className={classes.link}>
                        <div onMouseLeave={handleLeavePopper} className={classes.headerUserInfo}>
                            <Typography variant={"h6"} onMouseEnter={handleHoverPopper}>
                                {user?.fullName}
                            </Typography>
                            <PopperUserWindow visible={visiblePopperWindow} user={user!}/>
                            <Typography variant={"subtitle1"}>
                                @{user?.username}
                            </Typography>
                            <Typography variant={"body1"}>
                                {user?.about}
                            </Typography>
                        </div>
                    </Link>
                </div>
                <div className={classes.buttonWrapper}>
                    <div className={classNames(classes.buttonItemWrapper, classes.declineButton)}>
                        <Button
                            onClick={handleDeclineFollowerRequest}
                            color="primary"
                            variant="outlined"
                            size="small"
                            fullWidth
                        >
                            Decline
                        </Button>
                    </div>
                    <div className={classNames(classes.buttonItemWrapper, classes.acceptButton)}>
                        <Button
                            onClick={handleAcceptFollowerRequest}
                            color="primary"
                            variant="outlined"
                            size="small"
                            fullWidth
                        >
                            Accept
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default withHoverUser(FollowerRequestsItem);
