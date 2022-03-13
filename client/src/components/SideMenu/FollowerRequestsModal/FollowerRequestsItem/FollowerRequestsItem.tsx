import React, {FC, MouseEvent, ReactElement} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import {Avatar, Button, Paper, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useFollowerRequestsItemStyles} from "./FollowerRequestsItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {HoverUserProps, withHoverUser} from "../../../../hoc/withHoverUser";
import PopperUserWindow from "../../../PopperUserWindow/PopperUserWindow";
import {FollowerUserResponse} from "../../../../store/types/user";
import {acceptFollowRequest, declineFollowRequest} from "../../../../store/ducks/followerRequests/actionCreators";

interface FollowerRequestsItemProps {
    user: FollowerUserResponse,
    onClose: () => void;
}

const FollowerRequestsItem: FC<FollowerRequestsItemProps & HoverUserProps> = (
    {
        user,
        onClose,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const classes = useFollowerRequestsItemStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const onClickUser = () => {
        onClose();
        history.push(`/profile/${user?.id}`);
    };

    const handleDeclineFollowerRequest = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(declineFollowRequest(user.id!));
    };

    const handleAcceptFollowerRequest = (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(acceptFollowRequest(user.id!));
    };

    return (
        <Paper onClick={onClickUser} className={classes.container} variant="outlined">
            <Avatar
                className={classes.listAvatar}
                src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
            />
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <div onMouseLeave={handleLeavePopper} className={classes.headerUserInfo}>
                        <Typography variant={"h6"} onMouseEnter={() => handleHoverPopper!(user.id!)}>
                            {user?.fullName}
                        </Typography>
                        <PopperUserWindow visible={visiblePopperWindow}/>
                        <Typography variant={"subtitle1"}>
                            @{user?.username}
                        </Typography>
                        <Typography variant={"body1"}>
                            {user?.about}
                        </Typography>
                    </div>
                </div>
                <div className={classes.buttonWrapper}>
                    <div className={classNames(classes.buttonItemWrapper, classes.declineButton)}>
                        <Button
                            onClick={(event) => handleDeclineFollowerRequest(event)}
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
                            onClick={(event) => handleAcceptFollowerRequest(event)}
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
